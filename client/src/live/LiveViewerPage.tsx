import { useEffect, useMemo, useRef, useState } from "react";
import { buildStreamUrl, fetchComments, fetchEvent, postComment } from "./api";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { RoomStatusBanner } from "./RoomStatusBanner";
import { StreamPlayer } from "./StreamPlayer";
import type {
  CommentDto,
  CommentStreamCommentCreated,
  CommentStreamCommentDeleted,
  CommentStreamRoomStateUpdated,
  PublicEventResponse,
} from "./types";
import "./live-viewer.css";

type StreamState = "connecting" | "live" | "reconnecting";

export function LiveViewerPage({ eventId }: { eventId: string }) {
  const [page, setPage] = useState<PublicEventResponse | null>(null);
  const [comments, setComments] = useState<CommentDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);
  const [streamState, setStreamState] = useState<StreamState>("connecting");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const latestSeenAtRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [nextPage, nextComments] = await Promise.all([
          fetchEvent(eventId),
          fetchComments(eventId, 50),
        ]);
        if (cancelled) return;
        setPage(nextPage);
        setComments(nextComments);
        latestSeenAtRef.current = nextComments.at(-1)?.serverReceivedAt ?? null;
        setLoadingError(null);
      } catch (error) {
        if (cancelled) return;
        setLoadingError(error instanceof Error ? error.message : "Failed to load live page");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [eventId]);

  useEffect(() => {
    const stream = new EventSource(buildStreamUrl(eventId));

    setStreamState("connecting");

    stream.onopen = () => {
      setStreamState("live");
    };

    stream.onerror = () => {
      setStreamState("reconnecting");
    };

    stream.addEventListener("comment_created", (event) => {
      const payload = JSON.parse((event as MessageEvent).data) as CommentStreamCommentCreated;
      upsertComment(payload.comment);
    });

    stream.addEventListener("comment_deleted", (event) => {
      const payload = JSON.parse((event as MessageEvent).data) as CommentStreamCommentDeleted;
      setComments((current) =>
        current.map((comment) =>
          comment.commentId === payload.commentId
            ? { ...comment, deletedFlag: true, displayStatus: "HIDDEN" }
            : comment,
        ),
      );
    });

    stream.addEventListener("room_state_updated", (event) => {
      const payload = JSON.parse((event as MessageEvent).data) as CommentStreamRoomStateUpdated;
      setPage((current) => (current ? { ...current, roomState: payload.roomState } : current));
    });

    stream.addEventListener("sync_required", () => {
      void refreshComments();
    });

    return () => {
      stream.close();
    };
  }, [eventId]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      void refreshComments();
    }, 20000);
    return () => window.clearInterval(interval);
  }, [eventId]);

  const visibleComments = useMemo(
    () => comments.filter((comment) => comment.displayStatus === "VISIBLE" && !comment.deletedFlag),
    [comments],
  );

  const roomState = page?.roomState ?? null;
  const canPost = roomState?.mode === "OPEN" && !posting;

  async function refreshComments() {
    const nextComments = await fetchComments(eventId, 50);
    setComments(nextComments);
    latestSeenAtRef.current = nextComments.at(-1)?.serverReceivedAt ?? latestSeenAtRef.current;
  }

  function upsertComment(nextComment: CommentDto) {
    latestSeenAtRef.current = nextComment.serverReceivedAt;
    setComments((current) => {
      const existingIndex = current.findIndex(
        (comment) => comment.commentId === nextComment.commentId,
      );
      if (existingIndex >= 0) {
        const copy = current.slice();
        copy[existingIndex] = nextComment;
        return copy;
      }
      return [...current, nextComment].slice(-100);
    });
  }

  async function handleSubmit(turnstileValue: string) {
    if (!draft.trim()) {
      setSubmitError("Comment text is required.");
      return;
    }

    try {
      setPosting(true);
      setSubmitError(null);
      setSubmitMessage(null);
      const result = await postComment(eventId, {
        commentText: draft.trim(),
        turnstileToken: turnstileValue,
        clientRequestId: crypto.randomUUID(),
      });
      setDraft("");
      setSubmitMessage(
        result.deliveryStatus === "broadcasted"
          ? "Comment sent to the live timeline."
          : "Comment saved. It will appear after the next sync.",
      );
      setTurnstileResetKey((current) => current + 1);
      await refreshComments();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to post comment");
    } finally {
      setPosting(false);
    }
  }

  return (
    <main className="live-page live-shell">
      <section className="live-viewer-hero">
        <div className="live-viewer-copy">
          <p className="live-eyebrow">Lets Play For Peace Live</p>
          <h1>{page?.event.title ?? "Loading live event..."}</h1>
          <p className="live-hero-copy">
            Cloudflare Stream playback and a moderated live comment lane. Video delivery and
            comment delivery stay separate, so the page remains readable even if one side
            degrades.
          </p>
        </div>
        <div className={`live-connection-pill live-connection-${streamState}`}>
          <span className="live-dot" />
          {streamState === "live"
            ? "Realtime connected"
            : streamState === "connecting"
              ? "Connecting..."
              : "Reconnecting..."}
        </div>
      </section>

      <section className="live-viewer-grid">
        <div className="live-viewer-main">
          <div className="live-panel">
            <StreamPlayer
              playbackUid={page?.event.streamPlaybackUid ?? null}
              title={page?.event.title ?? eventId}
            />
          </div>

          <div className="live-panel">
            <RoomStatusBanner roomState={roomState} />
            <CommentForm
              disabled={!canPost}
              draft={draft}
              error={submitError}
              busy={posting}
              onDraftChange={setDraft}
              onSubmit={(token) => void handleSubmit(token)}
              onTokenChange={setTurnstileToken}
              token={turnstileToken}
              resetKey={turnstileResetKey}
            />
            {submitMessage ? <p className="live-success live-compact">{submitMessage}</p> : null}
          </div>
        </div>

        <aside className="live-viewer-side">
          <div className="live-panel live-panel-sticky">
            <div className="live-panel-header">
              <div>
                <p className="live-eyebrow live-small">Live Comments</p>
                <h2>{visibleComments.length} visible</h2>
              </div>
              <small className="live-muted">{page?.event.status ?? "UNKNOWN"}</small>
            </div>
            <CommentList comments={visibleComments} />
          </div>
        </aside>
      </section>

      {loading ? <p className="live-muted">Loading live event...</p> : null}
      {loadingError ? <p className="live-error">{loadingError}</p> : null}
    </main>
  );
}

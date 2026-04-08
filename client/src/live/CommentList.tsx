import type { CommentDto } from "./types";

export function CommentList({ comments }: { comments: CommentDto[] }) {
  if (comments.length === 0) {
    return <p className="live-muted">No visible comments yet.</p>;
  }

  return (
    <div className="live-comment-list">
      {comments.map((comment) => (
        <article className="live-comment-card" key={comment.commentId}>
          <div className="live-comment-meta">
            <span className="live-comment-time">{formatTime(comment.serverReceivedAt)}</span>
            <span className="live-comment-state">{comment.moderationStatus}</span>
          </div>
          <p>{comment.commentText}</p>
        </article>
      ))}
    </div>
  );
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

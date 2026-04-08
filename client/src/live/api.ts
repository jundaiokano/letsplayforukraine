import { z } from "zod";
import {
  COMMENT_MAX_LENGTH,
  DISPLAY_STATUSES,
  MODERATION_STATUSES,
  ROOM_MODES,
  type CommentDto,
  type PostCommentResponse,
  type PublicEventResponse,
} from "./types";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? "https://charity-api.kosuke05816.workers.dev"
).replace(/\/$/, "");

const eventSchema = z.object({
  eventId: z.string().min(1).max(128),
  title: z.string().min(1).max(200),
  streamPlaybackUid: z.string().min(1).max(200).nullable(),
  status: z.string().min(1).max(64),
});

const roomStateSchema = z.object({
  mode: z.enum(ROOM_MODES),
  slowModeIntervalSec: z.number().int().min(0).max(3600),
  updatedAt: z.string().datetime({ offset: true }),
});

const commentSchema = z.object({
  commentId: z.string().min(1).max(128),
  eventId: z.string().min(1).max(128),
  userSessionId: z.string().min(1).max(128),
  commentText: z.string().min(1).max(COMMENT_MAX_LENGTH),
  serverReceivedAt: z.string().datetime({ offset: true }),
  displayStatus: z.enum(DISPLAY_STATUSES),
  moderationStatus: z.enum(MODERATION_STATUSES),
  deletedFlag: z.boolean(),
  moderationReason: z.string().min(1).max(512).nullable(),
});

const publicEventResponseSchema = z.object({
  event: eventSchema,
  roomState: roomStateSchema,
});

const commentsResponseSchema = z.object({
  comments: z.array(commentSchema),
});

const postCommentResponseSchema = z.object({
  commentId: z.string().min(1).max(128),
  serverReceivedAt: z.string().datetime({ offset: true }),
  displayStatus: z.enum(DISPLAY_STATUSES),
  moderationStatus: z.enum(MODERATION_STATUSES),
  deliveryStatus: z.enum(["broadcasted", "delayed"]),
});

const apiErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
  requestId: z.string().optional(),
});

export { COMMENT_MAX_LENGTH };

export async function fetchEvent(eventId: string): Promise<PublicEventResponse> {
  return publicEventResponseSchema.parse(await requestJson(`/api/events/${eventId}`));
}

export async function fetchComments(eventId: string, limit = 50): Promise<CommentDto[]> {
  const payload = commentsResponseSchema.parse(
    await requestJson(`/api/events/${eventId}/comments?limit=${Math.min(limit, 100)}`),
  );
  return payload.comments;
}

export async function postComment(
  eventId: string,
  input: { commentText: string; turnstileToken: string; clientRequestId: string },
): Promise<PostCommentResponse> {
  return postCommentResponseSchema.parse(
    await requestJson(`/api/events/${eventId}/comments`, {
      method: "POST",
      body: JSON.stringify(input),
    }),
  );
}

export function buildStreamUrl(eventId: string) {
  return `${API_BASE_URL}/api/events/${eventId}/live-feed`;
}

export function buildPlaybackUrl(playbackUid: string | null) {
  if (!playbackUid) return null;
  return `https://iframe.videodelivery.net/${playbackUid}`;
}

async function requestJson(path: string, init?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    throw await readError(response);
  }

  return response.json();
}

async function readError(response: Response) {
  try {
    const payload = apiErrorSchema.parse(await response.json());
    const error = new Error(payload.message);
    error.name = payload.error;
    return error;
  } catch {
    return new Error(response.statusText || "Request failed");
  }
}

export const ROOM_MODES = ["OPEN", "SLOW", "CLOSED"] as const;
export type RoomMode = (typeof ROOM_MODES)[number];

export const DISPLAY_STATUSES = ["VISIBLE", "HIDDEN"] as const;
export type DisplayStatus = (typeof DISPLAY_STATUSES)[number];

export const MODERATION_STATUSES = ["NONE", "BLOCKED", "PENDING"] as const;
export type ModerationStatus = (typeof MODERATION_STATUSES)[number];

export const COMMENT_MAX_LENGTH = 200;

export interface EventDto {
  eventId: string;
  title: string;
  streamPlaybackUid: string | null;
  status: string;
}

export interface CommentDto {
  commentId: string;
  eventId: string;
  userSessionId: string;
  commentText: string;
  serverReceivedAt: string;
  displayStatus: DisplayStatus;
  moderationStatus: ModerationStatus;
  deletedFlag: boolean;
  moderationReason: string | null;
}

export interface RoomStateDto {
  mode: RoomMode;
  slowModeIntervalSec: number;
  updatedAt: string;
}

export interface PublicEventResponse {
  event: EventDto;
  roomState: RoomStateDto;
}

export interface PostCommentResponse {
  commentId: string;
  serverReceivedAt: string;
  displayStatus: DisplayStatus;
  moderationStatus: ModerationStatus;
  deliveryStatus: "broadcasted" | "delayed";
}

export interface CommentStreamCommentCreated {
  eventId: string;
  comment: CommentDto;
}

export interface CommentStreamRoomStateUpdated {
  eventId: string;
  roomState: RoomStateDto;
}

export interface CommentStreamCommentDeleted {
  eventId: string;
  commentId: string;
}

export interface CommentStreamSyncRequired {
  eventId: string;
  lastEventId: string;
}

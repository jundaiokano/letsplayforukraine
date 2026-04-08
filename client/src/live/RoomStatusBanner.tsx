import type { RoomStateDto } from "./types";

export function RoomStatusBanner({ roomState }: { roomState: RoomStateDto | null }) {
  if (!roomState) {
    return <div className="live-room-banner live-room-unknown">Room state is loading.</div>;
  }

  if (roomState.mode === "OPEN") {
    return <div className="live-room-banner live-room-open">Comments are open.</div>;
  }

  if (roomState.mode === "SLOW") {
    return (
      <div className="live-room-banner live-room-slow">
        Slow mode is active. Wait {roomState.slowModeIntervalSec} seconds between comments.
      </div>
    );
  }

  return <div className="live-room-banner live-room-closed">Comments are closed right now.</div>;
}

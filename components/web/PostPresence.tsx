"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import usePresence from "@convex-dev/presence/react";
import FacePile from "@convex-dev/presence/facepile";

interface iAppProps {
  roomId: Id<"posts">;
  userId: string;
}

export function PostPresence({ roomId, userId }: iAppProps) {
  const presenceState = usePresence(api.presence, roomId, userId);

  if (!presenceState || presenceState.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 bg-white border rounded-xl px-4 py-3 shadow-sm w-fit">
      <div className="flex flex-col">
        <p className="text-sm font-semibold text-gray-800">
          Viewing now
        </p>

        <span className="text-xs text-gray-500">
          {presenceState.length} active user
          {presenceState.length > 1 ? "s" : ""}
        </span>
      </div>

      <div className="flex items-center text-black">
        <FacePile presenceState={presenceState} />
      </div>
    </div>
  );
}
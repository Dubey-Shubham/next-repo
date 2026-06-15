import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import usePresence from "@convex-dev/presence/react";
import FacePile from "@convex-dev/presence/facepile";

interface iAppProps {
    roomId: Id<"posts">
    userId: string
}

export function PostPresence({roomId, userId}: iAppProps) {
    const presenceState = usePresence(api.presence, roomId, userId);

    if(!presenceState || presenceState.length === 0) {
        return null;
    }

    return (
        <div >
            <p>
                Viewing now
            </p>
            <div>
                <FacePile presenceState={presenceState}/>
            </div>
        </div>
    )

}
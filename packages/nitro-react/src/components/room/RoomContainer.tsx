import { useRoomSelector } from "#base/context"

import { RoomCanvas } from "./RoomCanvas";
import { RoomEventHandler } from "./RoomEventHandler";

export const RoomContainer = () => {
    const room = useRoomSelector();

    if (!room) return null;

    return (
        <>
            <RoomEventHandler />
            <RoomCanvas />
        </>
    );
}
import { useContext } from "react";

import { RoomObjectMenuNameContext } from "./RoomObjectMenuNameContext";

export const useRoomObjectMenuNameContext = () => {
    const ctx = useContext(RoomObjectMenuNameContext);

    if (!ctx) throw new Error("useRoomObjectMenuNameContext must be used within RoomObjectMenuNameBubble");

    return ctx;
}

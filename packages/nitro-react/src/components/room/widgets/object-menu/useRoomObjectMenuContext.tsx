import { useContext } from "react";

import { RoomObjectMenuContext } from "./RoomObjectMenuContext";

export const useRoomObjectMenuContext = () => {
    const ctx = useContext(RoomObjectMenuContext);

    if (!ctx) throw new Error("useRoomObjectMenuContext must be used within RoomObjectMenuWidget");

    return ctx;
}

import { OpenFlatConnectionComposer } from "@nitrodevco/nitro-shared";
import { useEffect } from "react";

import { RoomContextProvider, useWebSocketContext } from "#base/context";

import { RoomCanvas } from "./RoomCanvas";
import { RoomEventHandler } from "./RoomEventHandler";
import { RoomHandlers } from "./RoomHandlers";

export const RoomContainer = () => {
    const { send } = useWebSocketContext();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const roomId = parseInt(params.get('roomId') ?? '-1');

        if (roomId > 0) send(new OpenFlatConnectionComposer({
            roomId,
            password: '',
            unknown1: -1
        }));
    }, []);

    return (
        <RoomContextProvider>
            <RoomHandlers />
            <RoomEventHandler />
            <RoomCanvas />
        </RoomContextProvider>
    );
}
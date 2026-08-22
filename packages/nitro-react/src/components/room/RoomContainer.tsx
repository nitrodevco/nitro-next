import { RoomEngineEvent } from "@nitrodevco/nitro-api";
import { useState } from "react";

import { useRoomIsLandingViewVisible } from "#base/context";
import { useRoomEventDispatcher } from "#base/hooks";

import { RoomCanvas } from "./RoomCanvas";
import { RoomWidgetsPixi } from "./widgets";

export const RoomContainer = () => {
    const [isReady, setIsReady] = useState<boolean>(false);
    const landingViewVisible = useRoomIsLandingViewVisible();

    useRoomEventDispatcher(RoomEngineEvent.INITIALIZED, event => {
        setIsReady(true);
    });

    useRoomEventDispatcher(RoomEngineEvent.DISPOSED, event => {
        setIsReady(false);
    });

    if (!isReady) return null;

    return (
        <>
            <RoomCanvas />
            <RoomWidgetsPixi />
        </>
    );
}
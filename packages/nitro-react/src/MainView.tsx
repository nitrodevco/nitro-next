import { InfoRetrieveComposer } from "@nitrodevco/nitro-shared";
import { useEffect, useState } from "react";

import { InventoryView, NavigatorView, RoomWrapper, ToolbarView } from "./components";
import { useWebSocketContext } from "./context";
import { useNavigatorHandler, useUserInfoHandler } from "./handlers";

export const MainView = () => {
    const [isReady, setIsReady] = useState(false);
    const { setReady, send } = useWebSocketContext();

    useUserInfoHandler();
    useNavigatorHandler();

    useEffect(() => {
        if (!isReady) return;

        send(new InfoRetrieveComposer({}));
    }, [isReady]);

    useEffect(() => {
        if (!isReady) return;

        setReady();
    }, [isReady]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsReady(true);
    }, []);

    if (!isReady) return null;

    return (
        <div className="relative size-full">
            {/* Layer 0: Room canvas — fills the entire viewport, sits behind everything */}
            <RoomWrapper />

            {/* Layer 1: Toolbar — pinned to the bottom */}
            <ToolbarView />

            {/* Draggable windows are portaled into #draggable-windows-container in Nitro.tsx */}
            <NavigatorView />
            <InventoryView />
        </div>
    );
};

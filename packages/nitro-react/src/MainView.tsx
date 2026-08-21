import { InfoRetrieveComposer } from "@nitrodevco/nitro-packets";
import { useEffect, useState } from "react";

import { InventoryComponent, NavigatorWrapper, RoomWrapper, WalletComponent } from "./components";
import { FriendListWrapper } from "./components/messenger";
import { useWebSocketContext } from "./context";
import { useMessengerHandler, useUserInfoHandler, useWalletHandler } from "./handlers";
import { ToolbarView } from "./views/toolbar/ToolbarView";

export const MainView = () => {
    const [isReady, setIsReady] = useState(false);
    const { setReady, send } = useWebSocketContext();

    useUserInfoHandler();
    useMessengerHandler();
    useWalletHandler();

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
        <>
            <RoomWrapper />
            <div
                id="ui-container"
                className="absolute top-0 left-0 z-10 overflow-hidden pointer-events-none size-full">
                {/* PurseView, ActivityPointsView, AvatarEditorView and MessengerView now render
                    through Pixi (see views-pixi/, mounted in Nitro.tsx's PixiApplicationRoot).
                    NotificationCenterView (theme/'s own source always returns null) had nothing
                    to migrate, so it's simply dropped rather than ported as a no-op. */}
                <FriendListWrapper />
                <ToolbarView />
                <NavigatorWrapper />
                <InventoryComponent />
                <WalletComponent />
            </div>
        </>
    );
}
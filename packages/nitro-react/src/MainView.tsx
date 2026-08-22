import { CatalogTypeEnum } from "@nitrodevco/nitro-api";
import { InfoRetrieveComposer } from "@nitrodevco/nitro-packets";
import { useEffect, useState } from "react";

import { AvatarEditorComponent, CatalogWrapper, FriendListWrapper, InventoryComponent, MessengerComponent, NavigatorWrapper, RoomWrapper, WalletComponent } from "./components";
import { useWebSocketContext } from "./context";
import { useMessengerHandler, useUserInfoHandler, useWalletHandler } from "./handlers";
import { ActivityPointsViewPixi } from "./views-pixi/purse/ActivityPointsViewPixi";
import { PurseViewPixi } from "./views-pixi/purse/PurseViewPixi";
import { ToolbarViewPixi } from "./views-pixi/toolbar/ToolbarViewPixi";

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
            <AvatarEditorComponent />
            <CatalogWrapper catalogType={CatalogTypeEnum.Normal} />
            <InventoryComponent />
            <FriendListWrapper />
            <MessengerComponent />
            <NavigatorWrapper />
            <WalletComponent />
            <PurseViewPixi />
            <ActivityPointsViewPixi layout={{ position: 'absolute', top: 71, right: 3, width: 192 }} />
            <ToolbarViewPixi />
        </>
    );
}
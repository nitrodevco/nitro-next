import { CatalogTypeEnum } from "@nitrodevco/nitro-api";
import { InfoRetrieveComposer } from "@nitrodevco/nitro-packets";
import { useEffect, useState } from "react";

import { InventoryComponent, RoomWrapper, WalletComponent } from "./components";
import { CatalogWrapper } from "./components/catalog/CatalogWrapper";
import { FriendListWrapper } from "./components/messenger";
import { useWebSocketContext } from "./context";
import { useMessengerHandler, useNavigatorHandler, useUserInfoHandler, useWalletHandler } from "./handlers";
import { NotificationCenterView } from "./views/notification-center/NotificationCenterView";
import { ActivityPointsView } from "./views/purse/ActivityPointsView";
import { PurseView } from "./views/purse/PurseView";
import { ToolbarView } from "./views/toolbar/ToolbarView";

export const MainView = () => {
    const [isReady, setIsReady] = useState(false);
    const { setReady, send } = useWebSocketContext();

    useUserInfoHandler();
    useNavigatorHandler();
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
                <div className="flex flex-col items-end absolute right-0 -mt-1.5 min-w-57.5 max-w-57.5 mr-0.75">
                    <PurseView />
                    <div className="flex flex-col items-end w-48">
                        <ActivityPointsView />
                        <NotificationCenterView />
                    </div>
                </div>
                <FriendListWrapper />
                <ToolbarView />
                <CatalogWrapper catalogType={CatalogTypeEnum.Normal} />
                <InventoryComponent />
                <WalletComponent />
            </div>
        </>
    );
}
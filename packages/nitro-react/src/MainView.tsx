import { CatalogTypeEnum } from "@nitrodevco/nitro-api";
import { InfoRetrieveComposer } from "@nitrodevco/nitro-packets";
import { useEffect, useState } from "react";

import { AchievementsWrapper } from "./components/achievements/AchievementsWrapper";
import { CatalogWrapper } from "./components/catalog/CatalogWrapper";
import { DialogDebugComponent, NotificationDebugComponent } from "./components/debug";
import { FriendListWrapper } from "./components/messenger";
import { useWebSocketContext } from "./context";
import { useDialogsHandler, useMessengerHandler, useNewFeatureHandler, useNotificationsHandler, useUserInfoHandler, useWalletHandler } from "./handlers";
import { TooltipProvider } from "./theme";
import { NotificationCenterView } from "./views/notification-center/NotificationCenterView";
import { ActivityPointsView } from "./views/purse/ActivityPointsView";
import { PurseView } from "./views/purse/PurseView";
import { ToolbarView } from "./views/toolbar/ToolbarView";
import { RoomWrapper, AvatarEditorComponent, NavigatorWrapper, InventoryComponent, WalletComponent } from "./components";
import { NotificationExtensionsView } from "./views/notification-center/extensions/NotificationExtensionsView";

export const MainView = () => {
    const [isReady, setIsReady] = useState(false);
    const { setReady, send } = useWebSocketContext();

    useUserInfoHandler();
    useMessengerHandler();
    useWalletHandler();
    useDialogsHandler();
    useNotificationsHandler();
    useNewFeatureHandler();

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
        <TooltipProvider>
            <RoomWrapper />
            <div
                id="ui-container"
                className="absolute top-0 left-0 z-10 overflow-hidden pointer-events-none size-full">
                <div className="flex flex-col items-end absolute right-0 -mt-1.5 min-w-57.5 max-w-57.5 mr-0.75">
                    <PurseView />
                    <div className="flex flex-col items-end w-48">
                        <ActivityPointsView />
                        <NotificationExtensionsView />
                        <NotificationCenterView />
                    </div>
                    {/* ExtensionView — the toolbar's docked-panel strip (room event info,
                        group info, quest tracker...) stacks top-right under the purse */}
                    <div className="flex flex-col items-end gap-1 mt-1 pointer-events-none" id="toolbar-extensions" />
                </div>
                <AvatarEditorComponent />
                <FriendListWrapper />
                <ToolbarView />
                <CatalogWrapper catalogType={CatalogTypeEnum.Normal} />
                <NavigatorWrapper />
                <InventoryComponent />
                <AchievementsWrapper />
                <WalletComponent />
            </div>
        </TooltipProvider >
    );
}
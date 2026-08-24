import { CatalogTypeEnum } from '@nitrodevco/nitro-api';
import { InfoRetrieveComposer } from '@nitrodevco/nitro-packets';
import { GetTicker } from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import { AvatarEditorComponent, CatalogWrapper, FriendListWrapper, InventoryComponent, MessengerComponent, NavigatorWrapper, RoomWrapper, WalletComponent } from './components';
import { useConfigValue, useIsLandingViewVisible, useWebSocketContext } from './context';
import { useMessengerHandler, useUserInfoHandler, useWalletHandler } from './handlers';
import { getRenderMode } from './theme-core';
import { HotelView } from './views/hotel-view/HotelView';
import { ActivityPointsView } from './views/purse/ActivityPointsView';
import { PurseView } from './views/purse/PurseView';
import { ToolbarView } from './views/toolbar/ToolbarView';

export const MainView = () => {
    const [ isReady, setIsReady ] = useState(false);
    const { setReady, send } = useWebSocketContext();
    const landingViewVisible = useIsLandingViewVisible();
    const maxFPS = useConfigValue<number>('fps.limit') ?? 60;

    useUserInfoHandler();
    useMessengerHandler();
    useWalletHandler();

    useEffect(() => {
        GetTicker().maxFPS = maxFPS;
    }, [ maxFPS ]);

    useEffect(() => {
        if (!isReady) return;

        send(new InfoRetrieveComposer({}));
    }, [ isReady ]);

    useEffect(() => {
        if (!isReady) return;

        setReady();
    }, [ isReady ]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsReady(true);
    }, []);

    if (!isReady) return null;

    if (getRenderMode() === 'dom') {
        return (
            <>
                <RoomWrapper />
                {landingViewVisible && <HotelView />}
                <div
                    id="ui-container"
                    className="absolute top-0 left-0 z-10 overflow-hidden pointer-events-none size-full"
                >
                    <div className="flex flex-col items-end absolute right-0 -mt-1.5 min-w-57.5 max-w-57.5 mr-0.75">
                        <PurseView />
                        <div className="flex flex-col items-end w-48">
                            <ActivityPointsView />
                        </div>
                    </div>
                    <AvatarEditorComponent />
                    <CatalogWrapper catalogType={CatalogTypeEnum.Normal} />
                    <InventoryComponent />
                    <FriendListWrapper />
                    <MessengerComponent />
                    <NavigatorWrapper />
                    <WalletComponent />
                    <ToolbarView />
                </div>
            </>
        );
    }

    return (
        <>
            <RoomWrapper />
            {landingViewVisible && <HotelView />}
            <AvatarEditorComponent />
            <CatalogWrapper catalogType={CatalogTypeEnum.Normal} />
            <InventoryComponent />
            <FriendListWrapper />
            <MessengerComponent />
            <NavigatorWrapper />
            <WalletComponent />
            <PurseView />
            <ActivityPointsView layout={{ position: 'absolute', top: 71, right: 3, width: 192 }} />
            <ToolbarView />
        </>
    );
};

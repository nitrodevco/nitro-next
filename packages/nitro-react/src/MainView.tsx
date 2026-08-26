import { CatalogTypeEnum } from '@nitrodevco/nitro-api';
import { InfoRetrieveComposer } from '@nitrodevco/nitro-packets';
import { GetTicker } from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import { AvatarEditorComponent, CatalogWrapper, FriendListWrapper, InventoryComponent, MessengerComponent, NavigatorWrapper, RoomWrapper, WalletComponent } from './components';
import { useConfigValue, useIsLandingViewVisible, useWebSocketContext } from './context';
import { useMessengerHandler, useUserInfoHandler, useWalletHandler } from './handlers';
import { Box } from './theme';
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
        setReady();
    }, [ isReady ]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsReady(true);
    }, []);

    if (!isReady) return null;

    return (
        <>
            <RoomWrapper />
            {landingViewVisible && <HotelView />}
            <Box
                sortableChildren={true}
                layout={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                }}
            >
                <Box layout={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    marginRight: 6,
                    width: 230,
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                }}
                >
                    <PurseView />
                    <Box layout={{
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        width: 192,
                    }}
                    >
                        <ActivityPointsView />
                    </Box>
                </Box>
                <AvatarEditorComponent />
                <CatalogWrapper catalogType={CatalogTypeEnum.Normal} />
                <InventoryComponent />
                <FriendListWrapper />
                <MessengerComponent />
                <NavigatorWrapper />
                <WalletComponent />
                <ToolbarView />
            </Box>
        </>
    );
};

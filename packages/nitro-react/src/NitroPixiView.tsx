import { NitroLogger } from '@nitrodevco/nitro-api';
import {
    GetRoomContentLoader,
    GetRoomEngine,
    RoomContentLoader,
    TexturePool,
} from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import { PixiApplicationRoot } from '#base/theme-pixi';

import { useWebSocketContext } from './context';
import { MainView } from './MainView';
import { LoadingScreenView } from './views-pixi/loading-screen/LoadingScreenView';

export const NitroPixiView = () => {
    const [ isRendererReady, setIsRendererReady ] = useState(false);
    const [ isEngineReady, setIsEngineReady ] = useState(false);
    const { isAuthenticated, connect } = useWebSocketContext();

    useEffect(() => {
        if (!isEngineReady) return;

        connect();
    }, [ isEngineReady, connect ]);

    useEffect(() => {
        if (!isRendererReady) return;

        const setup = async () => {
            try {
                TexturePool.startAutoCleanup();

                await GetRoomEngine().init();
                await GetRoomContentLoader().downloadAssetAsync(RoomContentLoader.ROOM_CONTENT);
                await GetRoomContentLoader().downloadAssetAsync(RoomContentLoader.TILE_CURSOR);
                await GetRoomContentLoader().downloadAssetAsync(RoomContentLoader.SELECTION_ARROW);
                await GetRoomContentLoader().downloadAssetAsync(RoomContentLoader.PLACE_HOLDER);
                await GetRoomContentLoader().downloadAssetAsync(RoomContentLoader.PLACE_HOLDER_WALL);
                await GetRoomContentLoader().downloadAssetAsync(RoomContentLoader.PLACE_HOLDER_PET);

                setIsEngineReady(true);
            } catch (err) {
                NitroLogger.error(err);
            }
        };

        void setup();
    }, [ isRendererReady ]);

    const isReady = isEngineReady && isAuthenticated;

    return (
        <>
            <PixiApplicationRoot onReady={() => setIsRendererReady(true)}>
                {isReady && <MainView />}
            </PixiApplicationRoot>
            {!isReady && <LoadingScreenView />}
        </>
    );
};

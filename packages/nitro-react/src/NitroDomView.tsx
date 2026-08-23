import { NitroLogger } from '@nitrodevco/nitro-api';
import {
    GetRoomContentLoader,
    GetRoomEngine,
    PrepareRenderer,
    RoomContentLoader,
    TexturePool,
} from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import { useWebSocketContext } from './context';
import { MainView } from './MainView';
import { GetPixelRatio } from './utils';
import { LoadingScreenView } from './views-pixi/loading-screen/LoadingScreenView';

export const NitroDomView = () => {
    const [ isEngineReady, setIsEngineReady ] = useState(false);
    const { isAuthenticated, connect } = useWebSocketContext();

    useEffect(() => {
        if (!isEngineReady) return;

        connect();
    }, [ isEngineReady, connect ]);

    useEffect(() => {
        const setup = async (width: number, height: number) => {
            try {
                await PrepareRenderer({
                    width,
                    height,
                    autoDensity: false,
                    resolution: GetPixelRatio(),
                    backgroundAlpha: 0,
                    roundPixels: false,
                    preference: 'webgpu',
                    preserveDrawingBuffer: false,
                });

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

        void setup(Math.floor(window.innerWidth), Math.floor(window.innerHeight));
    }, [ ]);

    const isReady = isEngineReady && isAuthenticated;

    if (!isReady) return <LoadingScreenView />;

    return <MainView />;
};

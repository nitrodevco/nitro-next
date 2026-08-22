import { NitroLogger } from '@nitrodevco/nitro-api';
import {
    GetRoomContentLoader,
    GetRoomEngine,
    RoomContentLoader,
    TexturePool
} from '@nitrodevco/nitro-renderer';
import { type FC, useEffect, useState } from 'react';

import { useConfigLoader, useFurnitureDataLoader, useLocalizationLoader, useProductDataLoader } from '#base/hooks';
import { PixiApplicationRoot } from '#base/theme-pixi';

import { useWebSocketContext } from './context';
import { useAvatarLoader } from './hooks/logic';
import { MainView } from './MainView';
import { LoadingScreenView } from './views/loading-screen/LoadingScreenView';

export const Nitro: FC = () => {
    const [isRendererReady, setIsRendererReady] = useState(false);
    const [isEngineReady, setIsEngineReady] = useState(false);

    const { isConfigReady } = useConfigLoader();
    const { isLocalizationReady } = useLocalizationLoader();
    const { isFurnitureDataReady } = useFurnitureDataLoader();
    const { isProductDataReady } = useProductDataLoader();
    const { isAuthenticated, connect } = useWebSocketContext();

    useAvatarLoader();

    useEffect(() => {
        if (!isEngineReady) return;

        connect();
    }, [isEngineReady, connect]);

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
    }, [isRendererReady]);

    const isReady = isEngineReady && isAuthenticated && isLocalizationReady() && isFurnitureDataReady() && isProductDataReady();

    return (
        <>
            <PixiApplicationRoot onReady={() => setIsRendererReady(true)}>
                {isReady && <MainView />}
            </PixiApplicationRoot>
            {!isReady && <LoadingScreenView />}
        </>
    );
};

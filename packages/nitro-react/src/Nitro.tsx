import {
    GetRoomContentLoader,
    GetRoomEngine,
    PrepareRenderer,
    RoomContentLoader
} from '@nitrodevco/nitro-renderer';
import { NitroLogger } from '@nitrodevco/nitro-shared';
import { AnimatePresence, motion } from 'motion/react';
import { type FC, useEffect, useState } from 'react';

import { useConfigLoader, useFurnitureDataLoader, useLocalizationLoader } from '#base/hooks';
import { GetPixelRatio } from '#base/utils';

import { useWebSocketContext } from './context';
import { useAvatarLoader } from './hooks/logic';
import { MainView } from './MainView';
import { LoadingScreenView } from './views/LoadingScreenView';

export const Nitro: FC = () => {
    const [isEngineReady, setIsEngineReady] = useState(false);

    const { isConfigReady } = useConfigLoader();
    const { isLocalizationReady } = useLocalizationLoader();
    const { isFurnitureDataReady } = useFurnitureDataLoader();
    const { isAuthenticated, connect } = useWebSocketContext();

    useAvatarLoader();

    useEffect(() => {
        if (!isEngineReady) return;

        connect();
    }, [isEngineReady, connect]);

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

                try {
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
            } catch (err) {
                NitroLogger.error(err);
            }
        };

        void setup(Math.floor(window.innerWidth), Math.floor(window.innerHeight));
    }, []);

    const isReady = isEngineReady && isAuthenticated && isLocalizationReady() && isFurnitureDataReady();

    return (
        <>
            <AnimatePresence mode="wait">
                {!isReady && (
                    <motion.div
                        key="loading-screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="size-full"
                    >
                        <LoadingScreenView />
                    </motion.div>
                )}
                {isReady && (
                    <motion.div
                        key="main-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="size-full"
                    >
                        <MainView />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

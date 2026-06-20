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
import { MainView } from './MainView';
import { LoadingScreenView } from './views/LoadingScreenView';

export const Nitro: FC = () => {
    const [isEngineReady, setIsEngineReady] = useState(false);

    useConfigLoader();
    const { isLocalizationReady } = useLocalizationLoader();
    const { isFurnitureDataReady } = useFurnitureDataLoader();
    const { isAuthenticated, connect } = useWebSocketContext();

    useEffect(() => {
        if (!isEngineReady) return;

        connect();
    }, [isEngineReady]);

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
                    await GetRoomContentLoader().downloadAsset(RoomContentLoader.ROOM_CONTENT);
                    await GetRoomContentLoader().downloadAsset(RoomContentLoader.TILE_CURSOR);
                    await GetRoomContentLoader().downloadAsset(RoomContentLoader.SELECTION_ARROW);
                    await GetRoomContentLoader().downloadAsset(RoomContentLoader.PLACE_HOLDER);
                    await GetRoomContentLoader().downloadAsset(RoomContentLoader.PLACE_HOLDER_WALL);
                    await GetRoomContentLoader().downloadAsset(RoomContentLoader.PLACE_HOLDER_PET);

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
            <AnimatePresence>
                {!isReady && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <LoadingScreenView />
                    </motion.div>
                )}
            </AnimatePresence>
            {isReady && <MainView />}
            <div
                id="draggable-windows-container"
                className="pointer-events-none absolute left-0 top-0 size-full overflow-hidden"
            />
        </>
    );
};

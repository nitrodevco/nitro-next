import {
    GetRoomContentLoader,
    GetRoomEngine,
    GetStage,
    GetTexturePool,
    GetTicker,
    PrepareRenderer,
    RoomContentLoader,
} from '@nitrodevco/nitro-renderer';
import { NitroLogger } from '@nitrodevco/nitro-shared';
import { AnimatePresence, motion } from 'motion/react';
import { type FC, useEffect, useState } from 'react';

import { RoomContextProvider } from './context';
import { useConfigLoader, useFurnitureDataLoader } from './hooks';
import { RoomView } from './RoomView';
import { GetPixelRatio } from './utils';

export const Nitro: FC = () => {
    const [isReady, setIsReady] = useState(false);

    useConfigLoader();
    //useLocalizationLoader();
    useFurnitureDataLoader();

    useEffect(() => {
        const setup = async (width: number, height: number) => {
            try {
                const renderer = await PrepareRenderer({
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
                    await GetRoomContentLoader().downloadAsset(RoomContentLoader.PLACE_HOLDER);
                    await GetRoomContentLoader().downloadAsset(RoomContentLoader.PLACE_HOLDER_Wall);
                    await GetRoomContentLoader().downloadAsset(RoomContentLoader.PLACE_HOLDER_PET);
                } catch (err) {
                    NitroLogger.error(err);
                }

                GetTicker().add(ticker => {
                    GetRoomEngine().update(ticker);
                    renderer.render(GetStage());
                    GetTexturePool().run();
                });

                setIsReady(true);
            } catch (err) {
                NitroLogger.error(err);
            }
        };

        void setup(Math.floor(window.innerWidth), Math.floor(window.innerHeight));
    }, []);

    return (
        <>
            <AnimatePresence>
                {!isReady && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    ></motion.div>
                )}
            </AnimatePresence>
            {isReady && (
                <RoomContextProvider roomId={1}>
                    <RoomView />
                </RoomContextProvider>
            )}
            <div
                id="draggable-windows-container"
                className="pointer-events-none absolute left-0 top-0 size-full overflow-hidden"
            />
        </>
    );
};

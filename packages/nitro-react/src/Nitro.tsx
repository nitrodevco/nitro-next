import {
    GetRoomContentLoader,
    GetStage,
    GetTexturePool,
    GetTicker,
    PrepareRenderer,
    RoomContentLoader,
} from '@nitrodevco/nitro-renderer';
import { NitroLogger } from '@nitrodevco/nitro-shared';
import { AnimatePresence, motion } from 'motion/react';
import { type FC, useEffect, useState } from 'react';

import { GetRoomEngine } from '../../nitro-renderer/src/room/GetRoomEngine';
import { RoomContextProvider } from './context/RoomContextProvider';
import { useConfigLoader } from './hooks/logic/useConfigLoader';
import { useFurnitureDataLoader } from './hooks/logic/useFurnitureDataLoader';
import { RoomView } from './RoomView';

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
                    resolution: devicePixelRatio,
                    backgroundAlpha: 0,
                    roundPixels: false,
                    preference: 'webgpu',
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

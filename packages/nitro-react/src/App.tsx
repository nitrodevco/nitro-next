import { GetStage, GetTexturePool, GetTicker, PrepareRenderer } from '@nitrodevco/nitro-renderer';
import { NitroLogger } from '@nitrodevco/nitro-shared';
import { AnimatePresence, motion } from 'motion/react';
import { type FC, useEffect, useState } from 'react';

import { GetRoomEngine } from '../../nitro-renderer/src/room/GetRoomEngine';
import { useConfigLoader } from './hooks/logic/useConfigLoader';
import { useFurnitureDataLoader } from './hooks/logic/useFurnitureDataLoader';
import { RoomView } from './RoomView';

export const App: FC = () => {
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
                    autoDensity: true,
                    backgroundAlpha: 0,
                    roundPixels: true,
                    preference: 'webgpu',
                });

                await GetRoomEngine().init();

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

        void setup(window.innerWidth, window.innerHeight);
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
            {isReady && <RoomView roomId={1} />}
            <div
                id="draggable-windows-container"
                className="pointer-events-none absolute left-0 top-0 size-full overflow-hidden"
            />
        </>
    );
};

import { NitroLogger } from '@nitrodevco/nitro-api';
import {
    GetRenderer,
    GetRoomContentLoader,
    GetRoomEngine,
    PrepareRenderer,
    RoomContentLoader,
    TexturePool,
} from '@nitrodevco/nitro-renderer';
import { useEffect, useRef, useState } from 'react';

import { useWebSocketContext } from './context';
import { MainView } from './MainView';
import { GetPixelRatio } from './utils';
import { LoadingScreenView } from './views-pixi/loading-screen/LoadingScreenView';

export const NitroDomView = () => {
    const [ isEngineReady, setIsEngineReady ] = useState(false);
    const { isAuthenticated, connect } = useWebSocketContext();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isReady = isEngineReady && isAuthenticated;

    useEffect(() => {
        if (!isEngineReady) return;

        connect();
    }, [ isEngineReady, connect ]);

    useEffect(() => {
        const resize = (event: UIEvent) => GetRenderer().resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', resize);

        const setup = async (width: number, height: number) => {
            const canvas = canvasRef.current;

            if (!canvas) return;

            try {
                await PrepareRenderer({
                    canvas,
                    width,
                    height,
                    autoDensity: true,
                    resolution: GetPixelRatio(),
                    backgroundAlpha: 0,
                    roundPixels: false,
                    preference: 'webgpu',
                    preserveDrawingBuffer: false,
                    eventMode: 'static',
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

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [ ]);

    return (
        <div className="">
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-0 size-full"
            />
            { !isReady && <LoadingScreenView /> }
            { isReady && <MainView /> }
        </div>
    );
};

import { NitroLogger } from '@nitrodevco/nitro-api';
import {
    GetRenderer,
    GetRoomEngine,
    PrepareRenderer,
    TexturePool,
} from '@nitrodevco/nitro-renderer';
import { useEffect, useRef, useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';

import { MainView } from './MainView';
import { preloadFlashFonts, preloadThemeAssets } from './theme';
import { GetPixelRatio, preloadAssetBundles } from './utils';
import { LoadingScreenView } from './views/loading-screen/LoadingScreenView';

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
        const resize = (event: UIEvent) => GetRenderer().resize(window.innerWidth, window.innerHeight, GetPixelRatio());

        window.addEventListener('resize', resize);

        const setup = async (width: number, height: number) => {
            const canvas = canvasRef.current;

            if (!canvas) return;

            try {
                await PrepareRenderer({
                    canvas,
                    width,
                    height,
                    resolution: GetPixelRatio(),
                    autoDensity: true,
                    backgroundAlpha: 0,
                    roundPixels: false,
                    preference: 'webgpu',
                    preserveDrawingBuffer: false,
                    eventMode: 'static',
                }, { destroyEvents: false });

                await Promise.all([
                    // Every bundle the config's preload list names. The two below each wait on
                    // the one bundle they read from, which this has already started.
                    preloadAssetBundles(),
                    preloadFlashFonts(),
                    preloadThemeAssets(),
                    GetRoomEngine().init(),
                ]);

                TexturePool.startAutoCleanup();

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
        <div style={{
            pointerEvents: 'none',
        }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 0,
                    imageRendering: 'pixelated',
                    pointerEvents: 'auto',
                }}
            />
            { !isReady && <LoadingScreenView /> }
            { isReady && <MainView /> }
        </div>
    );
};

import { NitroLogger } from '@nitrodevco/nitro-api';
import {
    GetRoomEngine,
    TexturePool,
} from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import { preloadChatStyles } from '#base/chat';
import { useWebSocketContext } from '#base/context/communication';
import { PixiApplicationRoot, preloadFlashFonts, preloadThemeAssets } from '#base/theme';
import { preloadAssetBundles } from '#base/utils';

import { MainView } from './MainView';
import { LoadingScreenView } from './views/loading-screen/LoadingScreenView';

export const NitroView = () => {
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
                await Promise.all([
                    // Every bundle the config's preload list names. The three below each wait on
                    // the one bundle they read from, which this has already started.
                    preloadAssetBundles(),
                    preloadFlashFonts(),
                    preloadThemeAssets(),
                    preloadChatStyles(),
                    GetRoomEngine().init(),
                ]);

                TexturePool.startAutoCleanup();

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

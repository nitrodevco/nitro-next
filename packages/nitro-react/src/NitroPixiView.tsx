import { NitroLogger } from '@nitrodevco/nitro-api';
import {
    GetRoomEngine,
    TexturePool,
} from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import { preloadChatStyles } from '#base/chat';
import { useWebSocketContext } from '#base/context/communication';
import { PixiApplicationRoot, preloadNitroTruffle, preloadThemeAssets, WIRED_HABBO_KEYS } from '#base/theme';

import { MainView } from './MainView';
import { LoadingScreenView } from './views/loading-screen/LoadingScreenView';

export const NitroPixiView = () => {
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
                    preloadNitroTruffle(WIRED_HABBO_KEYS),
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

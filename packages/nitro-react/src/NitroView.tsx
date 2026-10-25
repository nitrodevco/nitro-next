/**
 * The renderer, and what it shows while the client loads - `HabboAir`'s part in the Flash client.
 *
 * As soon as the renderer is up, the loading screen's art (`loading-screen`, the frame and the
 * photos it picks from) and the fonts its texts are set in come first, and `HabboLoadingScreen`
 * goes up. Then the preloaded bundles, the fonts, the theme, the chat styles and the room engine
 * load together, and once they and the gamedata are in, the connection opens. The client replaces
 * the screen when the connection is authenticated, as `HabboAir.unk_f3c5a3` disposes it when the
 * core runs - and the screen's bundle is unloaded with it, its textures freed on the GPU.
 *
 * The percentage is `HabboAir.updateProgressBar`'s: it starts at 60% - what the AIR shell had
 * already loaded - and the rest is shared out over the steps done, here the config, the three
 * gamedata files, the five loads above and the connection. A load that throws shows its message on
 * the screen (`showError`), worded by the category its message suggests (`unk_1329f9`).
 *
 * The preview host (`previewHost`) loads the same, but never connects: once it is all in,
 * `PreviewHostView` replaces the screen instead of the client.
 */
import { GetConfigValue, NitroLogger } from '@nitrodevco/nitro-api';
import {
    GetRoomEngine,
    TexturePool,
} from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import { preloadChatStyles } from '#base/chat';
import { rebootAfterGpuLoss } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { ModalLayer, PixiApplicationRoot, preloadFlashFonts, preloadThemeAssets, setFontFaceOverrides, setTextStyleOverrides, WindowLayer } from '#base/theme';
import { loadTemplatePatchFiles } from '#base/theme/templatePatches';
import { isPreviewHost, loadAssetBundle, preloadAssetBundles, unloadAssetBundle } from '#base/utils';

import { MainView } from './MainView';
import { LOADING_SCREEN_KEY, LoadingScreenStyle, parseLoadingScreenStyle } from './views/loading-screen/loadingScreenStyle';
import { LoadingScreenView } from './views/loading-screen/LoadingScreenView';
import { PreviewHostView } from './views/preview/PreviewHostView';
import { SystemDialogsView } from './views/system/SystemDialogsView';

/** `HabboAir.unk_cabede`: where the percentage starts. */
const INITIAL_PROGRESS = 0.6;

/** The loads `setup` counts: the bundles, the fonts, the theme, the chat styles and the room engine. */
const SETUP_STEPS = 5;

/** `PhotoSplashScreen.unk_63be04`: how many photos it picks from. */
const SPLASH_PHOTOS = 30;

/** `unk_1329f9`'s cut-off for the error's details. */
const ERROR_DETAILS_LENGTH = 220;

/** `HabboAir.unk_1329f9`: the startup error, worded by what its message is about. */
const startupErrorMessage = (error: unknown): string => {
    const details = ((error instanceof Error) ? error.message : String(error)).replace(/\s+/g, ' ').trim();
    const lowerCase = details.toLowerCase();
    let message = 'Client startup failed.\nPlease restart the client.';

    if (lowerCase.includes('gamedata') || lowerCase.includes('product data') || lowerCase.includes('localization')) message = 'Failed to download required game data.\nPlease check your connection and restart the client.';
    else if (lowerCase.includes('download')) message = 'Failed to download required client libraries.\nPlease check your connection and restart the client.';

    if (details !== '') message += `\n\nDetails: ${(details.length > ERROR_DETAILS_LENGTH) ? `${details.slice(0, ERROR_DETAILS_LENGTH)}...` : details}`;

    return message;
};

export interface NitroViewProps {
    /** How many of the gamedata files are in, and how many there are. */
    dataLoaded: number;
    dataTotal: number;
}

export const NitroView = ({ dataLoaded, dataTotal }: NitroViewProps) => {
    const [ isRendererReady, setIsRendererReady ] = useState(false);
    const [ isEngineReady, setIsEngineReady ] = useState(false);
    const [ setupDone, setSetupDone ] = useState(0);
    const [ splash, setSplash ] = useState<{ photo: number; seed: number } | null>(null);
    const [ loadingLook, setLoadingLook ] = useState<LoadingScreenStyle | undefined>(undefined);
    const [ error, setError ] = useState<string | undefined>(undefined);
    const [ hasShownClient, setHasShownClient ] = useState(false);
    const { isAuthenticated, isDisconnected, connect } = useWebSocketContext();
    const isDataReady = dataLoaded === dataTotal;

    useEffect(() => {
        if (!isEngineReady || !isDataReady || isPreviewHost()) return;

        connect();
    }, [ isEngineReady, isDataReady, connect ]);

    useEffect(() => {
        if (!isRendererReady) return;

        const step = async (promise: Promise<unknown>) => {
            await promise;

            setSetupDone(done => done + 1);
        };

        const setup = async () => {
            try {
                // The hotel's text style and face overrides, before the first text is drawn (the theme's own come with its bundle).
                setTextStyleOverrides('hotel', GetConfigValue('text.styles.overrides'));
                setFontFaceOverrides('hotel', GetConfigValue('text.faces.overrides'));
                // The hotel's look for the screen itself, before it goes up: no client module has loaded to draw one.
                setLoadingLook(parseLoadingScreenStyle(GetConfigValue(LOADING_SCREEN_KEY)));
                // The plugins' declarative window patches; a window drawn before one arrives is redrawn with it.
                void loadTemplatePatchFiles(GetConfigValue('templates.patches'), GetConfigValue('templates.styles'));

                await Promise.all([ loadAssetBundle('loading-screen'), preloadFlashFonts() ]);

                setSplash({ photo: 1 + Math.floor(Math.random() * SPLASH_PHOTOS), seed: Math.random() });

                await Promise.all([
                    // Every bundle the config's preload list names. The three below each wait on
                    // the one bundle they read from, which this has already started.
                    step(preloadAssetBundles()),
                    step(preloadFlashFonts()),
                    step(preloadThemeAssets()),
                    step(preloadChatStyles()),
                    step(GetRoomEngine().init()),
                ]);

                TexturePool.startAutoCleanup();

                setIsEngineReady(true);
            } catch (err) {
                NitroLogger.error(err);

                setSplash(current => current ?? { photo: 1 + Math.floor(Math.random() * SPLASH_PHOTOS), seed: Math.random() });
                setError(startupErrorMessage(err));
            }
        };

        void setup();
    }, [ isRendererReady ]);

    // The preview host is up once everything is loaded: it has no connection to wait for.
    const isReady = isEngineReady && isDataReady && (isAuthenticated || isPreviewHost());

    // `HabboCommunicationDemo.disconnected` opens an alert over the existing desktop.
    // Keep its mounted scene after logout; authentication still ends in the socket provider.
    if (isReady && !hasShownClient) setHasShownClient(true);

    const showClient = isReady || hasShownClient;

    // The screen never comes back once the client is up, so nothing draws its art any more.
    useEffect(() => {
        if (showClient) unloadAssetBundle('loading-screen');
    }, [ showClient ]);
    const stepsDone = 1 + dataLoaded + setupDone + (isAuthenticated ? 1 : 0);
    const stepsTotal = 1 + dataTotal + SETUP_STEPS + (isPreviewHost() ? 0 : 1);
    const progress = Math.min(1, INITIAL_PROGRESS + ((stepsDone / stepsTotal) * (1 - INITIAL_PROGRESS)));

    return (
        <PixiApplicationRoot
            onReady={() => setIsRendererReady(true)}
            onGpuLost={rebootAfterGpuLoss}
        >
            {showClient && (isPreviewHost() ? <PreviewHostView /> : <MainView />)}
            {!showClient && !isDisconnected && splash && (
                <LoadingScreenView
                    progress={progress}
                    error={error}
                    photo={splash.photo}
                    seed={splash.seed}
                    look={loadingLook}
                />
            )}
            {!showClient && isDisconnected && (
                <WindowLayer>
                    <SystemDialogsView />
                    <ModalLayer />
                </WindowLayer>
            )}
        </PixiApplicationRoot>
    );
};

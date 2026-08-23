import { NitroLogger } from '@nitrodevco/nitro-api';
import {
    GetRoomContentLoader,
    GetRoomEngine,
    RoomContentLoader,
    TexturePool,
} from '@nitrodevco/nitro-renderer';
import {  FC, useEffect, useState } from 'react';

import { useConfigLoader, useFurnitureDataLoader, useLocalizationLoader, useProductDataLoader } from '#base/hooks';
import { getRenderMode } from '#base/theme-core';
import { PixiApplicationRoot } from '#base/theme-pixi';

import { useWebSocketContext } from './context';
import { useAvatarLoader } from './hooks/logic';
import { MainView } from './MainView';
import { LoadingScreenView } from './views-pixi/loading-screen/LoadingScreenView';

export const Nitro: FC = () => {
    const [ isRendererReady, setIsRendererReady ] = useState(false);
    const [ isEngineReady, setIsEngineReady ] = useState(false);

    const { isConfigReady } = useConfigLoader();
    const { isLocalizationReady } = useLocalizationLoader();
    const { isFurnitureDataReady } = useFurnitureDataLoader();
    const { isProductDataReady } = useProductDataLoader();
    const { isAuthenticated, connect } = useWebSocketContext();

    useAvatarLoader();

    useEffect(() => {
        if (!isEngineReady) return;

        connect();
    }, [ isEngineReady, connect ]);

    useEffect(() => {
        if (!isRendererReady) return;

        const setup = async () => {
            try {
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

        void setup();
    }, [ isRendererReady ]);

    const isReady = isEngineReady && isAuthenticated && isLocalizationReady() && isFurnitureDataReady() && isProductDataReady();

    // MainView (the Room, and everything built on `useApplication()`) is inherently Pixi/WebGL -
    // there is no DOM equivalent for it, so DOM mode never mounts `PixiApplicationRoot` at all.
    // `@pixi/react`'s reconciler throws on any host tag it doesn't recognize (confirmed by
    // reading createInstance in its own source), so a DOM-rendering theme-pixi component could
    // never validly appear inside it anyway - the UI-chrome components this session made
    // dual-target render through a separate DOM-only mount point instead, once one exists.
    // (isRendererReady/isEngineReady/isReady all simply never flip in DOM mode today, since
    // nothing calls PixiApplicationRoot's onReady - this is a placeholder boundary, not a
    // finished DOM-mode app boot.)
    if (getRenderMode() === 'dom') {
        return <LoadingScreenView />;
    }

    return (
        <>
            <PixiApplicationRoot onReady={() => setIsRendererReady(true)}>
                {isReady && <MainView />}
            </PixiApplicationRoot>
            {!isReady && <LoadingScreenView />}
        </>
    );
};

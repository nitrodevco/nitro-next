import { CatalogTypeEnum, NitroLogger } from '@nitrodevco/nitro-api';
import {
    GetRoomContentLoader,
    GetRoomEngine,
    RoomContentLoader,
    TexturePool
} from '@nitrodevco/nitro-renderer';
import { AnimatePresence, motion } from 'motion/react';
import { type FC, useEffect, useState } from 'react';

import { useConfigLoader, useFurnitureDataLoader, useLocalizationLoader, useProductDataLoader } from '#base/hooks';
import { PixiApplicationRoot } from '#base/theme-pixi';

import { AvatarEditorComponent, CatalogWrapper, InventoryComponent, MessengerComponent } from './components';
import { useWebSocketContext } from './context';
import { useAvatarLoader } from './hooks/logic';
import { MainView } from './MainView';
import { LoadingScreenView } from './views/loading-screen/LoadingScreenView';
import { ActivityPointsViewPixi } from './views-pixi/purse/ActivityPointsViewPixi';
import { PurseViewPixi } from './views-pixi/purse/PurseViewPixi';
import { ToolbarViewPixi } from './views-pixi/toolbar/ToolbarViewPixi';

export const Nitro: FC = () => {
    const [isRendererReady, setIsRendererReady] = useState(false);
    const [isEngineReady, setIsEngineReady] = useState(false);

    const { isConfigReady } = useConfigLoader();
    const { isLocalizationReady } = useLocalizationLoader();
    const { isFurnitureDataReady } = useFurnitureDataLoader();
    const { isProductDataReady } = useProductDataLoader();
    const { isAuthenticated, connect } = useWebSocketContext();

    useAvatarLoader();

    useEffect(() => {
        if (!isEngineReady) return;

        connect();
    }, [isEngineReady, connect]);

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
    }, [isRendererReady]);

    const isReady = isEngineReady && isAuthenticated && isLocalizationReady() && isFurnitureDataReady() && isProductDataReady();

    return (
        <>
            {/* The single Pixi Application/renderer for both the room and the Pixi-rendered UI
                (see theme-pixi/PixiApplicationRoot.tsx) - mounts unconditionally, since the room
                engine's own init below waits on its onReady callback. */}
            <PixiApplicationRoot onReady={() => setIsRendererReady(true)}>
                {isReady && <>
                    <PurseViewPixi />
                    <ActivityPointsViewPixi layout={{ position: 'absolute', top: 71, right: 3, width: 192 }} />
                    <AvatarEditorComponent />
                    <MessengerComponent />
                    <ToolbarViewPixi />
                    <InventoryComponent />
                    <CatalogWrapper catalogType={CatalogTypeEnum.Normal} />
                </>}
            </PixiApplicationRoot>
            <AnimatePresence mode="wait">
                {!isReady && (
                    <motion.div
                        key="loading-screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="size-full"
                    >
                        <LoadingScreenView />
                    </motion.div>
                )}
                {isReady && (
                    <motion.div
                        key="main-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="size-full"
                    >
                        <MainView />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

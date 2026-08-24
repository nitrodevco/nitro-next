import { FC } from 'react';

import { useConfigLoader, useFurnitureDataLoader, useLocalizationLoader, useProductDataLoader } from '#base/hooks';
import { getRenderMode } from '#base/theme-core';

import { useAvatarLoader } from './hooks/logic';
import { NitroDomView } from './NitroDomView';
import { NitroPixiView } from './NitroPixiView';
import { LoadingScreenView } from './views/loading-screen/LoadingScreenView';

export const Nitro: FC = () => {
    const { isConfigReady } = useConfigLoader();
    const { isLocalizationReady } = useLocalizationLoader();
    const { isFurnitureDataReady } = useFurnitureDataLoader();
    const { isProductDataReady } = useProductDataLoader();

    useAvatarLoader();

    const isReady = isLocalizationReady() && isFurnitureDataReady() && isProductDataReady();

    if (!isReady) return <LoadingScreenView />;

    if (getRenderMode() === 'dom') return <NitroDomView />;

    return <NitroPixiView />;
};

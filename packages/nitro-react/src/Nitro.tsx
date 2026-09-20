import { FC } from 'react';

import { useAvatarLoader, useConfigLoader, useFurnitureDataLoader, useLocalizationLoader, useProductDataLoader } from '#base/hooks';

import { NitroView } from './NitroView';
import { LoadingScreenView } from './views/loading-screen/LoadingScreenView';

export const Nitro: FC = () => {
    useConfigLoader();
    const { isLocalizationReady } = useLocalizationLoader();
    const { isFurnitureDataReady } = useFurnitureDataLoader();
    const { isProductDataReady } = useProductDataLoader();

    useAvatarLoader();

    const isReady = isLocalizationReady() && isFurnitureDataReady() && isProductDataReady();

    if (!isReady) return <LoadingScreenView />;

    return <NitroView />;
};

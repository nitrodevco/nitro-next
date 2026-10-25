/**
 * The client's boot. The config comes first - it names every file and bundle that follows - and
 * nothing is drawn until it is in. Then the renderer starts and `NitroView` shows
 * `HabboLoadingScreen` while the gamedata (texts, furni and product data, avatar data) loads beside
 * the renderer's own bundles, handing over to the client once all of it is in and the connection is
 * authenticated.
 */
import { FC } from 'react';

import { useAvatarLoader, useConfigLoader, useFurnitureDataLoader, useLocalizationLoader, useProductDataLoader } from '#base/hooks';

import { NitroView } from './NitroView';

export const Nitro: FC = () => {
    const { isConfigReady } = useConfigLoader();
    const { isLocalizationReady } = useLocalizationLoader();
    const { isFurnitureDataReady } = useFurnitureDataLoader();
    const { isProductDataReady } = useProductDataLoader();

    useAvatarLoader();

    if (!isConfigReady()) return null;

    const dataSteps = [ isLocalizationReady(), isFurnitureDataReady(), isProductDataReady() ];

    return (
        <NitroView
            dataLoaded={dataSteps.filter(Boolean).length}
            dataTotal={dataSteps.length}
        />
    );
};

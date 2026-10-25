/**
 * What the theme (`@nitrodevco/nitro-theme`) needs of the client, given to it before anything is
 * drawn: the client's asset bundles (`utils/assetBundles`), its config, and its window manager's
 * stacking. Imported by the theme's barrel, so every import of `#base/theme` has it configured.
 */
import { configureThemeHost } from '@nitrodevco/nitro-theme';

import { systemStore, useConfigValue, useWindowZIndex } from '#base/context/system';
import { lazyBundleForAsset, loadAssetBundle } from '#base/utils';

configureThemeHost({
    loadAssetBundle,
    lazyBundleForAsset,
    useConfigValue,
    useWindowZIndex,
    bringWindowToFront: id => systemStore.getState().bringWindowToFront(id),
    releaseWindow: id => systemStore.getState().releaseWindow(id),
});

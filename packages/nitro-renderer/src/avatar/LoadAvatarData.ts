import { IAvatarRenderData } from '@nitrodevco/nitro-api';

import { GetAssetManager } from '../assets/GetAssetManager';

/** The client library the tables come from, whose bundle - named after it - carries them, and the avatar additions. */
const BUNDLE_NAME = 'habbo-avatar-render-lib';

/** The bundle's tables, by their file (`geometry.json` ...) and what they are in `IAvatarRenderData`. */
const FILES: Record<keyof IAvatarRenderData, string> = {
    geometry: 'geometry',
    partSets: 'part-sets',
    figureData: 'figure-data',
    builtInAnimations: 'built-in-animations',
    actionOffsets: 'action-offsets',
    actions: 'actions',
    animations: 'animations',
};

const REQUIRED: (keyof IAvatarRenderData)[] = [ 'geometry', 'partSets', 'figureData', 'builtInAnimations', 'actionOffsets' ];

/**
 * The avatar render library's bundle (`habbo-avatar-render-lib`, from `templatesUrl` - the hotel's
 * `asset.bundles.templates`, `%libname%` the library): what the avatar render manager starts from - the tables
 * the Flash client carried in its render library, and the hotel's actions and animations - read out of
 * the bundle and let go of again. The avatar additions in it stay, as textures. Nitro Studio builds it;
 * a new release changes it without the renderer changing.
 */
export const LoadAvatarData = async (templatesUrl: string): Promise<IAvatarRenderData> => {
    if (!templatesUrl) throw new Error('asset.bundles.templates is not set: the avatars have nothing to be drawn from');

    const url = templatesUrl.replace('%libname%', BUNDLE_NAME);

    const assetManager = GetAssetManager();

    if (!await assetManager.downloadAssetBundle(BUNDLE_NAME, url)) throw new Error(`avatar data bundle request failed: ${url}`);

    const data = Object.fromEntries(Object.entries(FILES).map(([ key, file ]) => [ key, assetManager.getBundleFile(BUNDLE_NAME, file) ])) as unknown as IAvatarRenderData;

    assetManager.releaseBundleData(BUNDLE_NAME);

    const missing = REQUIRED.filter(key => !data[key]);

    if (missing.length) throw new Error(`avatar data bundle lacks ${missing.map(key => FILES[key]).join(', ')}: ${url}`);

    return data;
};

import { GetConfigValue, GetHotelTemplateBundleUrl, GetTemplateBundleUrl, IGraphicAssetCollection, NitroLogger } from '@nitrodevco/nitro-api';

import { GetAssetManager } from './GetAssetManager';

/** The theme pack urls that did not load, by library: every later load goes to the hotel's own. */
const failedOverrides = new Map<string, string>();

/**
 * Fetches a Flash library's template bundle under the library's name (`GetTemplateBundleUrl`), or
 * joins the fetch already in flight for it. When a theme pack names a url for the library
 * (`asset.bundles.templates.overrides`) and that url does not load - the pack's files no longer
 * served, a 404, something that is no bundle - the hotel's own library is loaded in its place and the
 * failure is logged once, so a broken pack costs the hotel its look, never its window chrome. The
 * pack's url is not tried again until the page is reloaded.
 *
 * `templatesUrl` stands in for the config's pattern where the caller holds its own (the imager).
 * `undefined` when neither url loads, or the config names none.
 */
export const DownloadTemplateBundle = async (library: string, templatesUrl: string | undefined = GetConfigValue<string>('asset.bundles.templates')): Promise<IGraphicAssetCollection | undefined> => {
    const assetManager = GetAssetManager();
    const hotelUrl = GetHotelTemplateBundleUrl(library, templatesUrl);
    const url = GetTemplateBundleUrl(library, templatesUrl);

    if (!url) return undefined;

    if ((url === hotelUrl) || (failedOverrides.get(library) === url)) return hotelUrl ? assetManager.downloadAssetBundle(library, hotelUrl) : undefined;

    const collection = await assetManager.downloadAssetBundle(library, url);

    if (collection || !hotelUrl) return collection;

    // A caller that joined the failed fetch lands here too: only the first logs it.
    if (failedOverrides.get(library) !== url) {
        failedOverrides.set(library, url);

        NitroLogger.error(`Theme pack bundle for ${library} did not load from ${url}: the hotel's own is used.`);
    }

    return assetManager.downloadAssetBundle(library, hotelUrl);
};

/**
 * A bundled bitmap as a URL, for the DOM render target.
 *
 * Pixi draws a `Texture` and never needs this. `<img src>`, `background-image` and
 * `mask-image` need a URL, and what the `AssetManager` holds for a bundled asset is a decoded
 * `ImageBitmap` - not addressable from CSS. The two kinds of bundle resolve differently:
 *
 * - a loose bundle's asset is its own PNG entry, so the archive's own bytes become a `blob:`
 *   URL (`NitroBundle.getObjectUrl`) - no re-encode, byte-identical to the file that was packed;
 * - a packed sheet's asset is a rect inside one image, so it is cut onto a canvas and encoded
 *   once, the same slicing `themeSprites.ts` does for the theme's chrome.
 *
 * Either way it happens once per asset and is kept for the session.
 */
import { GetAssetManager } from '@nitrodevco/nitro-renderer';

import { renderSliceEffect } from './themeSprites';

const urls = new Map<string, string>();

export const getAssetImageUrl = (name: string | undefined): string | undefined => {
    if (!name) return undefined;

    const cached = urls.get(name);

    if (cached) return cached;

    const assetManager = GetAssetManager();
    let url = assetManager.findBundleImageUrl(name);

    if (!url) {
        const texture = assetManager.getTexture(name);
        const resource = texture?.source.resource as CanvasImageSource | undefined;

        if (texture && resource && (typeof resource === 'object')) {
            const { x, y, width, height } = texture.frame;

            url = renderSliceEffect(resource, x, y, width, height, { kind: 'plain' })?.toDataURL();
        }
    }

    // A miss is never cached: the asset's bundle may simply not have landed yet.
    if (url) urls.set(name, url);

    return url;
};

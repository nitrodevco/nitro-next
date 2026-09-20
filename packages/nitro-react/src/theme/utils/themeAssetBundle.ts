import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { SpritesheetData } from 'pixi.js';

import { loadAssetBundle } from '#base/utils';

import { registerThemeTexture } from '../hooks/usePixiTexture';
import { THEME_ASSETS } from './themeAssets';
import { registerThemeAtlas } from './themeSprites';

/**
 * Loads the `theme` asset bundle and hands its contents to the two registries the chrome reads,
 * once at boot, on both render targets.
 *
 * The bundle (`scripts/build-asset-bundles.ts`) carries every PNG `THEME_ASSETS` names packed
 * into one sheet plus a Pixi `SpritesheetData` manifest, so `AssetManager` has already made it
 * one GPU upload and cut a `Texture` per asset out of it by the time this runs. What is left is
 * naming them the way the theme does:
 *
 * - Pixi: each sprite's `Texture` goes into `usePixiTexture`'s cache under its theme key, so a
 *   lookup during render is a synchronous `Map` read and no component ever builds a texture.
 * - DOM: `themeSprites.ts` gets the decoded sheet, its rects and a `blob:` URL of its bytes.
 *   Chrome then references that one URL (`background-position`/`-size` picks the rect), and the
 *   few places needing a standalone image (`border-image`, `background-repeat`, a tinted copy)
 *   slice it out of the decoded sheet on demand, once per key.
 *
 * There is no per-file fallback behind this any more: the loose PNGs under `public/assets/theme`
 * are the builder's input and are not served. If the bundle fails, the chrome is missing and the
 * error is on the console - which is the intent, an asset silently taking the slow path is how a
 * regression hides.
 */
const BUNDLE_NAME = 'theme';

export const preloadThemeAssets = async (): Promise<void> => {
    if (!await loadAssetBundle(BUNDLE_NAME)) return;

    const assetManager = GetAssetManager();
    const manifest = assetManager.getBundleFile<SpritesheetData>(BUNDLE_NAME, `${BUNDLE_NAME}_spritesheet`);
    // `processNitroBundle` registers the sheet itself under the manifest's own name.
    const sheet = assetManager.getTexture(`${BUNDLE_NAME}_spritesheet`);

    if (!manifest?.frames || !sheet) return;

    for (const [ key, asset ] of Object.entries(THEME_ASSETS)) {
        const texture = assetManager.getTexture(asset);

        if (texture) registerThemeTexture(key, texture);
    }

    // The `ImageBitmap` the bundle decoded to: a `CanvasImageSource`, which is all a slice needs.
    const image: CanvasImageSource | undefined = sheet.source.resource;

    if (!image) return;

    registerThemeAtlas({ image, width: sheet.source.width, height: sheet.source.height }, manifest.frames);

    // The rects are in `themeSprites` now; the manifest they were read out of is not needed again.
    assetManager.releaseBundleData(BUNDLE_NAME);
};

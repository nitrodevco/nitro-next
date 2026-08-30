import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { Spritesheet, SpritesheetData, Texture } from 'pixi.js';

import { registerThemeTexture } from '../hooks/usePixiTexture';
import { getRenderMode } from './renderMode';
import { registerThemeAtlas } from './themeSprites';
import { THEME_URLS } from './themeUrls';

/**
 * Loads the combined theme-chrome atlas (`scripts/build-theme-atlas.ts` packs every PNG
 * `THEME_URLS` points at into `public/assets/theme-atlas/{atlas.png,manifest.json}`) once at
 * boot, on both render targets:
 *
 * - The decoded atlas image and every sprite's rect go into `themeSprites.ts`'s registry. DOM
 *   chrome then references the ONE atlas image (`background-position`/`-size` picks the rect),
 *   and the few places that need a standalone image (`border-image`, `background-repeat`, a
 *   tinted copy) slice it out of that image on demand, once per key.
 * - For Pixi the atlas becomes ONE base texture (a single GPU upload) that a Pixi `Spritesheet`
 *   cuts into per-asset `Texture`s sharing it - the same mechanism `AssetManager` uses for
 *   `.nitro` bundles. Those are registered with `usePixiTexture`'s cache (synchronous lookups,
 *   no per-component texture creation) and with `AssetManager` under the asset's URL, so
 *   anything still resolving by URL finds the same texture.
 *
 * Nothing here is load-bearing: if the manifest or image fails, every lazy path (per-file
 * `THEME_URLS` URLs through `useTextureFromUrl`, plain CSS `url(...)`) still works as before.
 */

const ATLAS_BASE = '/assets/theme-atlas';

const fetchManifest = async (): Promise<SpritesheetData | undefined> => {
    try {
        const response = await fetch(`${ATLAS_BASE}/manifest.json`);

        if (!response.ok) return undefined;

        return await response.json() as SpritesheetData;
    } catch {
        return undefined;
    }
};

const loadImageElement = (src: string): Promise<HTMLImageElement> => new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
});

const preloadForPixi = async (image: HTMLImageElement, manifest: SpritesheetData): Promise<void> => {
    const base = Texture.from(image);

    // `GetRenderer.ts` sets `TextureSource.defaultOptions.scaleMode = 'nearest'` when the
    // renderer is created - this runs at boot, before that, so set it explicitly.
    base.source.scaleMode = 'nearest';
    base.label = 'theme-atlas';

    const sheet = new Spritesheet(base, manifest);

    await sheet.parse();

    const assetManager = GetAssetManager();

    for (const [ key, url ] of Object.entries(THEME_URLS)) {
        const texture = sheet.textures[url.replace(/^\.\//, '')];

        if (!texture) continue;

        registerThemeTexture(key, texture);
        assetManager.setTexture(url, texture);
    }
};

export const preloadThemeAssets = async (): Promise<void> => {
    const manifest = await fetchManifest();

    if (!manifest) return;

    try {
        const url = `${ATLAS_BASE}/${manifest.meta.image ?? 'atlas.png'}`;
        const image = await loadImageElement(url);

        registerThemeAtlas(image, url, manifest.frames);

        if (getRenderMode() !== 'dom') await preloadForPixi(image, manifest);
    } catch {
        // Leave whatever didn't resolve on the normal lazy-load path - see module docblock.
    }
};

import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { Assets, Spritesheet, SpritesheetData, Texture } from 'pixi.js';

import { getRenderMode } from './renderMode';
import { THEME_URLS } from './themeUrls';

/**
 * Preloads the combined theme-chrome atlas (`scripts/build-theme-atlas.ts` packs every PNG
 * `THEME_URLS` points at into `public/assets/theme-atlas/{atlas.png,manifest.json}`) once at
 * boot, so no themed component's first render is the thing that triggers its own asset fetch.
 *
 * Before this, every border/button/scrollbar graphic loaded lazily and independently: the
 * first `usePixiTexture`/`useTextureFromUrl` call for a given key (Pixi) or the first CSS
 * `url(...)` reference to it (DOM) is what kicked off that ONE asset's own network fetch -
 * fine once everything's warm, but the very first time a given window/component type opened,
 * every chrome graphic it needed had to round-trip individually before it could render fully,
 * which is exactly the "flash of missing chrome, or a visible delay" this replaces. ~250 tiny
 * files (many under a filesystem block in size) also cost far more in per-request/per-file
 * overhead than actual bytes - the packed atlas is under a tenth the combined size of the
 * individual PNGs it replaces.
 *
 * A failure anywhere in here (fetch, decode, a stale manifest missing a newer asset) leaves
 * `THEME_URLS`/`AssetManager` untouched for whatever wasn't resolved - every existing lazy-load
 * path (`useTextureFromUrl`'s own retry loop, the browser's native `<img>`/CSS loading) still
 * works exactly as it did before this existed, just without the boot-time head start. Nothing
 * downstream needs to know or care whether this ran.
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

/** `THEME_URLS`'s own values keep the `./` prefix the original per-file paths always had;
 *  the manifest's frame keys (built straight from `public/`-relative disk paths) never had one. */
const stripPrefix = (url: string): string => url.replace(/^\.\//, '');

/**
 * Parses the manifest via Pixi's own `Spritesheet` (the same class `AssetManager.
 * processNitroBundle` already uses for room/furniture `.nitro` bundles) rather than
 * hand-building `Texture` objects - `NineSliceSprite` (every bordered chrome piece) needs the
 * `sourceSize`/`spriteSourceSize` metadata `Spritesheet.parse()` fills in to size its 9-slice
 * geometry correctly; a raw `new Texture({source, frame})` per asset renders every nine-sliced
 * border as a single stretched, un-sliced solid-color blob instead (confirmed directly - this
 * was the first approach tried). `Spritesheet.textures[name]` gives back properly-built
 * textures keyed by the manifest's own frame names (the `THEME_URLS` path strings), which then
 * just get re-keyed into `AssetManager` under the URL `usePixiTexture` actually looks up by.
 */
const preloadForPixi = async (manifest: SpritesheetData): Promise<void> => {
    const baseTexture = await Assets.load<Texture>(`${ATLAS_BASE}/atlas.png`);

    // `GetRenderer.ts` sets `TextureSource.defaultOptions.scaleMode = 'nearest'` (pixel-art
    // crispness, matching every other themed texture) the first time the Pixi renderer itself
    // is created - but this preload runs at boot, before that renderer exists, so the atlas'
    // own source is still built under Pixi's stock 'linear' default. Set it explicitly rather
    // than relying on load order.
    baseTexture.source.scaleMode = 'nearest';

    const sheet = new Spritesheet(baseTexture, manifest);

    await sheet.parse();

    const assetManager = GetAssetManager();

    for (const url of new Set(Object.values(THEME_URLS))) {
        const texture = sheet.textures[stripPrefix(url)];

        if (texture) assetManager.setTexture(url, texture);
    }
};

const loadImageElement = (src: string): Promise<HTMLImageElement> => new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
});

/**
 * DOM has no shared texture cache to seed - `BackgroundLayerDom.tsx` and friends read
 * `THEME_URLS`'s values directly as real `url(...)` sources. So instead this slices each
 * asset's rect out of the decoded atlas image into its own small canvas and overwrites
 * `THEME_URLS`'s value with the resulting `data:` URL, in place - every existing DOM call
 * site keeps reading `THEME_URLS[key]` exactly as it always has, now getting an
 * already-decoded, boot-resident image instead of a URL that still needs its own fetch.
 */
const preloadForDom = async (manifest: SpritesheetData): Promise<void> => {
    const image = await loadImageElement(`${ATLAS_BASE}/atlas.png`);
    const resolved = new Map<string, string>();

    for (const key of Object.keys(THEME_URLS)) {
        const url = THEME_URLS[key];
        const path = stripPrefix(url);
        const rect = manifest.frames[path]?.frame;

        if (!rect) continue;

        let dataUrl = resolved.get(path);

        if (!dataUrl) {
            const canvas = document.createElement('canvas');

            canvas.width = rect.w;
            canvas.height = rect.h;

            const ctx = canvas.getContext('2d');

            if (!ctx) continue;

            ctx.drawImage(image, rect.x, rect.y, rect.w, rect.h, 0, 0, rect.w, rect.h);
            dataUrl = canvas.toDataURL('image/png');
            resolved.set(path, dataUrl);
        }

        THEME_URLS[key] = dataUrl;
    }
};

export const preloadThemeAssets = async (): Promise<void> => {
    const manifest = await fetchManifest();

    if (!manifest) return;

    try {
        if (getRenderMode() === 'dom') await preloadForDom(manifest);
        else await preloadForPixi(manifest);
    } catch {
        // Leave whatever didn't resolve on the normal lazy-load path - see module docblock.
    }
};

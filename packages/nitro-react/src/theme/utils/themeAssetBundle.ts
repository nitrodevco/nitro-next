import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { SpritesheetData, Texture } from 'pixi.js';

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

const loadImageElement = (src: string): Promise<HTMLImageElement> => new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
});

/**
 * Slices each asset's rect out of the decoded atlas image into its own standalone `Texture`,
 * rather than cropping a shared view out of one atlas-wide `Texture` (the first approach tried,
 * via Pixi's own `Spritesheet` class - the same one `AssetManager.processNitroBundle` uses for
 * room/furniture `.nitro` bundles). That shared-crop approach renders correctly for plain
 * sprites and nine-slices, but Pixi's `TilingSprite` (`Header`'s tiled background/shine, any
 * repeat-mode nine-slice's stretched middle piece) silently collapses every tile-kind texture
 * whose `frame` is smaller than its shared source into one flat, untiled sample instead of
 * repeating the pattern - confirmed directly against a lazily-loaded, standalone-per-file bake
 * (`TilingSpritePipe._updateCanBatch`'s `texture.textureMatrix.isSimple` check is false for any
 * such crop, routing it through a shader path that doesn't reproduce the pattern here). A
 * standalone per-asset texture (`frame === its own full size`, `isSimple` true) sidesteps that,
 * exactly like the individually-loaded PNG it replaces.
 */
const preloadForPixi = async (manifest: SpritesheetData): Promise<void> => {
    const image = await loadImageElement(`${ATLAS_BASE}/atlas.png`);
    const assetManager = GetAssetManager();
    const resolved = new Map<string, Texture>();

    for (const url of new Set(Object.values(THEME_URLS))) {
        const path = stripPrefix(url);
        const rect = manifest.frames[path]?.frame;

        if (!rect) continue;

        let texture = resolved.get(path);

        if (!texture) {
            const canvas = document.createElement('canvas');

            canvas.width = rect.w;
            canvas.height = rect.h;

            const ctx = canvas.getContext('2d');

            if (!ctx) continue;

            ctx.drawImage(image, rect.x, rect.y, rect.w, rect.h, 0, 0, rect.w, rect.h);
            texture = Texture.from(canvas);
            // `GetRenderer.ts` sets `TextureSource.defaultOptions.scaleMode = 'nearest'`
            // (pixel-art crispness, matching every other themed texture) the first time the
            // Pixi renderer itself is created - but this preload runs at boot, before that
            // renderer exists, so a texture built here would otherwise pick up Pixi's stock
            // 'linear' default. Set it explicitly rather than relying on load order.
            texture.source.scaleMode = 'nearest';
            resolved.set(path, texture);
        }

        assetManager.setTexture(url, texture);
    }
};

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

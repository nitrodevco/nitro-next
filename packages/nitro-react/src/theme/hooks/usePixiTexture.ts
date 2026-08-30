import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { Rectangle, Texture } from 'pixi.js';
import { useEffect, useState } from 'react';

import { SpriteFrame } from '../utils/spriteFrame';
import { getThemeSliceCanvas } from '../utils/themeSprites';
import { THEME_URLS } from '../utils/themeUrls';

// ---------------------------------------------------------------------------------------------
// Theme textures - every chrome sprite the atlas holds, as a `Texture` sharing the one atlas
// base texture (see utils/themeAssetBundle.ts). Filled once at boot; every lookup after that
// is a synchronous Map read, so no component ever creates a texture of its own for chrome.
// ---------------------------------------------------------------------------------------------

const themeTextures = new Map<string, Texture>();
const standaloneTextures = new Map<string, Texture>();
const croppedTextures = new Map<string, Texture>();

export const registerThemeTexture = (key: string, texture: Texture): void => {
    themeTextures.set(key, texture);
};

/** The atlas-backed texture of a theme key, if the atlas has loaded. */
export const getThemeTexture = (key: string | undefined): Texture | undefined => (key ? themeTextures.get(key) : undefined);

/**
 * A theme sprite as its own texture (its own source, `frame` = its full size) rather than a
 * region of the atlas. Only `TilingSprite` needs this: it can't repeat a sub-rect of a larger
 * source (`TilingSpritePipe` treats any texture whose frame is smaller than its source as
 * "not simple" and samples it flat instead of wrapping). Cut out of the decoded atlas image
 * once per key and kept.
 */
export const getStandaloneThemeTexture = (key: string | undefined): Texture | undefined => {
    if (!key) return undefined;

    const cached = standaloneTextures.get(key);

    if (cached) return cached;

    const canvas = getThemeSliceCanvas(key);

    if (!canvas) return undefined;

    const texture = Texture.from(canvas);

    texture.source.scaleMode = 'nearest';
    texture.label = `${key} (standalone)`;
    standaloneTextures.set(key, texture);

    return texture;
};

/**
 * A sub-frame of a texture (an icon out of the icon sheet, a slice of a nine-slice for tiling),
 * sharing its source. Cached per source + rect so repeated mounts of the same icon reuse one
 * `Texture` object instead of allocating a new one each time.
 */
export const getCroppedTexture = (base: Texture, frame: SpriteFrame): Texture => {
    const x = base.frame.x + frame.x;
    const y = base.frame.y + frame.y;
    const cacheKey = `${base.uid}|${x},${y},${frame.width},${frame.height}`;
    const cached = croppedTextures.get(cacheKey);

    if (cached) return cached;

    const texture = new Texture({ source: base.source, frame: new Rectangle(x, y, frame.width, frame.height) });

    croppedTextures.set(cacheKey, texture);

    return texture;
};

// ---------------------------------------------------------------------------------------------
// Arbitrary URLs (avatar images, room thumbnails, a layout's bitmaps) - loaded through the
// shared AssetManager and cached there.
// ---------------------------------------------------------------------------------------------

const textureCache = new Map<string, Promise<Texture | undefined>>();
const RETRY_DELAYS_MS = [ 500, 1500, 4000 ];

/**
 * `AssetManager.downloadAsset` swallows its own fetch/decode errors internally (try/catch,
 * returns `false`) rather than rejecting - so a transient failure for a single asset URL never
 * throws here either, it just resolves `undefined`. Evicting that entry lets the next call for
 * the same URL retry instead of reusing the cached `undefined` forever.
 */
const loadTexture = (url: string): Promise<Texture | undefined> => {
    const cached = textureCache.get(url);

    if (cached) return cached;

    const promise = (async () => {
        let texture = GetAssetManager().getTexture(url);

        if (!texture) {
            await GetAssetManager().downloadAsset(url);

            texture = GetAssetManager().getTexture(url);

            if (!texture) textureCache.delete(url);
        }

        return texture;
    })();

    textureCache.set(url, promise);

    return promise;
};

/**
 * Resolves an arbitrary asset URL to a Pixi Texture, downloading it through the shared
 * GetAssetManager() if it isn't already cached. Since the UI and the room share one
 * renderer/context (see theme/PixiApplicationRoot), a texture used by both is fetched,
 * decoded, and GPU-uploaded exactly once. Retries a few times (with backoff) on failure rather
 * than leaving an already-mounted component stuck blank forever.
 */
export const useTextureFromUrl = (url: string | undefined): Texture | undefined => {
    const [ texture, setTexture ] = useState<Texture | undefined>(() => (url ? GetAssetManager().getTexture(url) : undefined));

    useEffect(() => {
        if (!url) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTexture(undefined);

            return;
        }

        // Already resolved (at mount, or downloaded elsewhere since) - no async attempt needed,
        // and no blank frame when `url` changes to an already-cached one.
        const cachedTexture = GetAssetManager().getTexture(url);

        if (cachedTexture) {
            setTexture(cachedTexture);

            return;
        }

        let cancelled = false;
        let timeoutId: ReturnType<typeof setTimeout>;

        const attempt = (retriesLeft: number) => {
            void loadTexture(url).then((result) => {
                if (cancelled) return;

                if (result) {
                    setTexture(result);
                } else if (retriesLeft > 0) {
                    const delay = RETRY_DELAYS_MS[RETRY_DELAYS_MS.length - retriesLeft];

                    timeoutId = setTimeout(() => attempt(retriesLeft - 1), delay);
                }
            });
        };

        attempt(RETRY_DELAYS_MS.length);

        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
        };
    }, [ url ]);

    return texture;
};

export interface PixiTextureOptions {
    /** A texture with its own source (for `TilingSprite`) - see `getStandaloneThemeTexture`. */
    standalone?: boolean;
}

/**
 * Resolves a theme asset key (`'border-9-default-src'`) to its Pixi Texture: the atlas-backed
 * one registered at boot (synchronously, no state), else the per-file URL through
 * `useTextureFromUrl` (the atlas failed to load, or the key isn't packed).
 */
export const usePixiTexture = (themeKey: string | undefined, options?: PixiTextureOptions): Texture | undefined => {
    const atlasTexture = options?.standalone ? getStandaloneThemeTexture(themeKey) : getThemeTexture(themeKey);
    const fallback = useTextureFromUrl(atlasTexture ? undefined : (themeKey ? THEME_URLS[themeKey] : undefined));

    return atlasTexture ?? fallback;
};

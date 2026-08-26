import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';
import { useEffect, useState } from 'react';

import { THEME_URLS } from '../utils';

const textureCache = new Map<string, Promise<Texture | undefined>>();
const RETRY_DELAYS_MS = [ 500, 1500, 4000 ];

/**
 * `AssetManager.downloadAsset` swallows its own fetch/decode errors internally (try/catch,
 * returns `false`) rather than rejecting - so a transient failure (one dropped request, a
 * proxy hiccup) for a single asset URL never throws here either, it just resolves `undefined`.
 * Without evicting that entry, the *next* call for the same URL - from this component
 * re-rendering, or an entirely different one requesting the same texture key - would reuse the
 * cached `undefined` forever instead of retrying, permanently blanking that one texture for the
 * rest of the session while every other asset keeps working normally.
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
 * renderer/context (see theme/PixiApplicationRoot), a texture used by both is
 * fetched, decoded, and GPU-uploaded exactly once.
 *
 * Retries a few times (with backoff) on failure rather than leaving an already-mounted
 * component stuck blank forever - `loadTexture`'s own cache eviction on failure means each of
 * these retries is a genuine fresh attempt, not a replay of the same cached `undefined`.
 */
export const useTextureFromUrl = (url: string | undefined): Texture | undefined => {
    const [ texture, setTexture ] = useState<Texture | undefined>(() => (url ? GetAssetManager().getTexture(url) : undefined));

    useEffect(() => {
        if (!url) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTexture(undefined);

            return;
        }

        // Already resolved (either the synchronous initializer above found it at mount, or it was
        // downloaded elsewhere since) - skip scheduling a redundant async attempt/promise entirely.
        // Also covers `url` changing to an already-cached key: without this, that case would
        // otherwise fall through to the async path below and flash blank for a frame while its
        // promise resolves, even though the texture is already available synchronously.
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

/**
 * Resolves a theme asset key (e.g. 'border-9-default-src'), looked up via THEME_URLS -
 * the shared asset registry theme-core exposes (used by both render targets) - to a Pixi Texture.
 */
export const usePixiTexture = (themeKey: string | undefined): Texture | undefined => useTextureFromUrl(themeKey ? THEME_URLS[themeKey] : undefined);

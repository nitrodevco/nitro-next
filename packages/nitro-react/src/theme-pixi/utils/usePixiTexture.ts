import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import type { Texture } from 'pixi.js';
import { useEffect, useState } from 'react';

import { THEME_URLS } from '../../theme/utils/themeUrls';

const textureCache = new Map<string, Promise<Texture | undefined>>();

const loadTexture = (url: string): Promise<Texture | undefined> => {
    const cached = textureCache.get(url);

    if (cached) return cached;

    const promise = (async () => {
        let texture = GetAssetManager().getTexture(url);

        if (!texture) {
            await GetAssetManager().downloadAsset(url);

            texture = GetAssetManager().getTexture(url);
        }

        return texture;
    })();

    textureCache.set(url, promise);

    return promise;
};

/**
 * Resolves an arbitrary asset URL to a Pixi Texture, downloading it through the shared
 * GetAssetManager() if it isn't already cached. Since the UI and the room share one
 * renderer/context (see theme-pixi/PixiApplicationRoot), a texture used by both is
 * fetched, decoded, and GPU-uploaded exactly once.
 */
export const useTextureFromUrl = (url: string | undefined): Texture | undefined => {
    const [texture, setTexture] = useState<Texture | undefined>(() => (url ? GetAssetManager().getTexture(url) : undefined));

    useEffect(() => {
        if (!url) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTexture(undefined);

            return;
        }

        let cancelled = false;

        void loadTexture(url).then(result => {
            if (!cancelled) setTexture(result);
        });

        return () => {
            cancelled = true;
        };
    }, [url]);

    return texture;
};

/**
 * Resolves a theme asset key (e.g. 'border-9-default-src'), looked up via THEME_URLS -
 * the same asset registry the DOM theme package uses - to a Pixi Texture.
 */
export const usePixiTexture = (themeKey: string | undefined): Texture | undefined => useTextureFromUrl(themeKey ? THEME_URLS[themeKey] : undefined);

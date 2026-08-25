import { Texture } from 'pixi.js';
import { useEffect, useState } from 'react';

import { THEME_URLS } from '../utils';

const silhouetteCache = new Map<string, Promise<Texture | undefined>>();

/**
 * Loads `url`'s image and recolors it to a solid `color` silhouette that keeps the source's
 * own alpha shape (`source-in`: paint `color` everywhere the source has any alpha, at that
 * alpha), producing a fresh `Texture` - the Pixi-side twin of `useSilhouetteImageUrl` (which
 * does the identical canvas pass for DOM's `border-image`-based blend overlay). Loaded via a
 * plain `Image`/canvas rather than reusing the already-decoded Pixi `Texture` for this URL,
 * since extracting pixel data back out of an uploaded GPU texture is far more involved than
 * just re-fetching the (already browser-cached) image.
 */
const buildSilhouetteTexture = (url: string, color: string): Promise<Texture | undefined> => new Promise((resolve) => {
    const image = new Image();

    image.onload = () => {
        const canvas = document.createElement('canvas');

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        const ctx = canvas.getContext('2d');

        if (!ctx) {
            resolve(undefined);

            return;
        }

        ctx.drawImage(image, 0, 0);
        ctx.globalCompositeOperation = 'source-in';
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const texture = Texture.from(canvas);

        texture.source.scaleMode = 'nearest';

        resolve(texture);
    };
    image.onerror = () => resolve(undefined);
    image.src = url;
});

const getSilhouetteTexture = (url: string, color: string): Promise<Texture | undefined> => {
    const key = `${url} ${color}`;
    const cached = silhouetteCache.get(key);

    if (cached) return cached;

    const promise = buildSilhouetteTexture(url, color);

    silhouetteCache.set(key, promise);

    return promise;
};

/**
 * Resolves a theme asset key to a solid-`color` silhouette `Texture` (see
 * `buildSilhouetteTexture` above), or `undefined` while it's still loading/on failure.
 */
export const usePixiSilhouetteTexture = (textureKey: string | undefined, color: string | undefined): Texture | undefined => {
    const [ texture, setTexture ] = useState<Texture | undefined>(undefined);

    useEffect(() => {
        const url = textureKey ? THEME_URLS[textureKey] : undefined;

        if (!url || !color) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTexture(undefined);

            return;
        }

        let cancelled = false;

        void getSilhouetteTexture(url, color).then((result) => {
            if (!cancelled) setTexture(result);
        });

        return () => {
            cancelled = true;
        };
    }, [ textureKey, color ]);

    return texture;
};

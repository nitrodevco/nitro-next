import { Texture } from 'pixi.js';
import { useEffect, useState } from 'react';

import { getThemeSliceCanvas } from '../utils/themeSprites';
import { THEME_URLS } from '../utils/themeUrls';

const silhouetteTextures = new Map<string, Texture>();
const silhouetteLoads = new Map<string, Promise<Texture | undefined>>();

const textureFromCanvas = (canvas: HTMLCanvasElement, label: string): Texture => {
    const texture = Texture.from(canvas);

    texture.source.scaleMode = 'nearest';
    texture.label = label;

    return texture;
};

/**
 * A solid-colour silhouette of a theme sprite (the same alpha shape, every opaque pixel
 * `color`) - the `blend` highlight a nine-slice draws over itself. Cut out of the atlas
 * synchronously when it has loaded; otherwise built from the per-file URL once it decodes.
 * One texture per key + colour for the session.
 */
const getSilhouetteTexture = (key: string, color: string): Texture | undefined => {
    const cacheKey = `${key}|${color}`;
    const cached = silhouetteTextures.get(cacheKey);

    if (cached) return cached;

    const canvas = getThemeSliceCanvas(key, { kind: 'silhouette', color });

    if (!canvas) return undefined;

    const texture = textureFromCanvas(canvas, `${key} (silhouette ${color})`);

    silhouetteTextures.set(cacheKey, texture);

    return texture;
};

const loadSilhouetteTexture = (key: string, color: string): Promise<Texture | undefined> => {
    const cacheKey = `${key}|${color}`;
    const pending = silhouetteLoads.get(cacheKey);

    if (pending) return pending;

    const url = THEME_URLS[key];
    const promise = new Promise<Texture | undefined>((resolve) => {
        if (!url) {
            resolve(undefined);

            return;
        }

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

            const texture = textureFromCanvas(canvas, `${key} (silhouette ${color})`);

            silhouetteTextures.set(cacheKey, texture);
            resolve(texture);
        };
        image.onerror = () => {
            silhouetteLoads.delete(cacheKey);
            resolve(undefined);
        };
        image.src = url;
    });

    silhouetteLoads.set(cacheKey, promise);

    return promise;
};

export const usePixiSilhouetteTexture = (textureKey: string | undefined, color: string | undefined): Texture | undefined => {
    const immediate = textureKey && color ? getSilhouetteTexture(textureKey, color) : undefined;
    const [ loaded, setLoaded ] = useState<Texture | undefined>(undefined);

    useEffect(() => {
        if (!textureKey || !color || immediate) return;

        let cancelled = false;

        void loadSilhouetteTexture(textureKey, color).then((result) => {
            if (!cancelled) setLoaded(result);
        });

        return () => {
            cancelled = true;
        };
    }, [ textureKey, color, immediate ]);

    return immediate ?? loaded;
};

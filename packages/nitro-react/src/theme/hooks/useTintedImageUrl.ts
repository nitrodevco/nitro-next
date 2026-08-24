import { useEffect, useState } from 'react';

const tintCache = new Map<string, Promise<string>>();

/**
 * Recolors `url`'s image via the standard canvas technique: draw it, multiply-blend a solid
 * fill of `tintColor` over it (this is what actually tints the RGB channels), then clip back
 * down to the source's own alpha shape with a `destination-in` pass of the original image (a
 * plain multiply fill alone would also opacify whatever was transparent, since the fill itself
 * is fully opaque). Mirrors Pixi's own per-pixel RGB-multiply `tint` closely enough for this
 * theme's flat sprite art.
 */
const tintImage = (url: string, tintColor: string): Promise<string> => new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
        const canvas = document.createElement('canvas');

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        const ctx = canvas.getContext('2d');

        if (!ctx) {
            reject(new Error('2d canvas context unavailable'));

            return;
        }

        ctx.drawImage(image, 0, 0);
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = tintColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(image, 0, 0);

        resolve(canvas.toDataURL());
    };
    image.onerror = () => reject(new Error(`Failed to load image for tinting: ${url}`));
    image.src = url;
});

const getTintedImage = (url: string, tintColor: string): Promise<string> => {
    const key = `${url} ${tintColor}`;
    const cached = tintCache.get(key);

    if (cached) return cached;

    const promise = tintImage(url, tintColor);

    tintCache.set(key, promise);

    return promise;
};

/**
 * Tints `url`'s image and returns the resulting data URL, so a caller can use the tinted
 * result directly as a `background-image`/`border-image-source` instead of layering a separate
 * mask+`mix-blend-mode` overlay div on top of the untinted art.
 *
 * Returns `undefined` (never the untinted `url`) while the tint is still resolving or if it
 * fails, or whenever `url`/`tintColor` aren't both provided - callers are expected to fall back
 * to the plain `url` themselves (`tintedUrl ?? url`) so the untinted art shows immediately
 * rather than nothing, and swaps in seamlessly once the tinted version is ready.
 */
export const useTintedImageUrl = (url: string | undefined, tintColor: string | undefined): string | undefined => {
    const [ tintedUrl, setTintedUrl ] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!url || !tintColor) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTintedUrl(undefined);

            return;
        }

        let cancelled = false;

        void getTintedImage(url, tintColor).then((result) => {
            if (!cancelled) setTintedUrl(result);
        }).catch(() => {
            if (!cancelled) setTintedUrl(undefined);
        });

        return () => {
            cancelled = true;
        };
    }, [ url, tintColor ]);

    return tintedUrl;
};

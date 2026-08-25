import { useEffect, useState } from 'react';

const silhouetteCache = new Map<string, Promise<string>>();

/**
 * Recolors `url`'s image to a flat, solid `color` silhouette that keeps the source's own alpha
 * shape - via `source-in` (paint `color` everywhere the source has any alpha, at that alpha).
 * Deliberately NOT `useTintedImageUrl`'s multiply-based recolor: multiplying by white is a
 * no-op on the RGB channels (white is the identity element for multiply), so that hook can
 * never actually produce a white silhouette - only ever the source's own original colors. This
 * is what `Border.tsx`'s DOM blend overlay needs (a translucent white wash shaped like the
 * border art, mirroring Pixi's own mask-and-fill `NineSliceBlendOverlay`).
 */
const silhouetteImage = (url: string, color: string): Promise<string> => new Promise((resolve, reject) => {
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
        ctx.globalCompositeOperation = 'source-in';
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL());
    };
    image.onerror = () => reject(new Error(`Failed to load image for silhouette: ${url}`));
    image.src = url;
});

const getSilhouetteImage = (url: string, color: string): Promise<string> => {
    const key = `${url} ${color}`;
    const cached = silhouetteCache.get(key);

    if (cached) return cached;

    const promise = silhouetteImage(url, color);

    silhouetteCache.set(key, promise);

    return promise;
};

/**
 * Returns `url`'s image recolored to a solid `color` silhouette (see `silhouetteImage` above),
 * or `undefined` while it's still resolving, on failure, or whenever `url`/`color` aren't both
 * provided - same "caller falls back to nothing rendering yet" contract as `useTintedImageUrl`.
 */
export const useSilhouetteImageUrl = (url: string | undefined, color: string | undefined): string | undefined => {
    const [ silhouetteUrl, setSilhouetteUrl ] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!url || !color) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSilhouetteUrl(undefined);

            return;
        }

        let cancelled = false;

        void getSilhouetteImage(url, color).then((result) => {
            if (!cancelled) setSilhouetteUrl(result);
        }).catch(() => {
            if (!cancelled) setSilhouetteUrl(undefined);
        });

        return () => {
            cancelled = true;
        };
    }, [ url, color ]);

    return silhouetteUrl;
};

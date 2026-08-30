import { useEffect, useState } from 'react';

import { getThemeSliceUrl, ThemeSliceEffect } from '../utils/themeSprites';
import { THEME_URLS } from '../utils/themeUrls';

const effectId = (effect: ThemeSliceEffect): string => (effect.kind === 'plain' ? 'plain' : `${effect.kind}:${effect.color}`);

const fallbackUrls = new Map<string, Promise<string | undefined>>();

/**
 * The pre-atlas path: fetch the per-file PNG and recolour it on a canvas. Only reached when
 * the atlas failed to load; cached per key + effect like the atlas slices are.
 */
const loadFallbackUrl = (key: string, effect: ThemeSliceEffect): Promise<string | undefined> => {
    const cacheKey = `${key}|${effectId(effect)}`;
    const pending = fallbackUrls.get(cacheKey);

    if (pending) return pending;

    const url = THEME_URLS[key];
    const promise = new Promise<string | undefined>((resolve) => {
        if (!url) {
            resolve(undefined);

            return;
        }

        if (effect.kind === 'plain') {
            resolve(url);

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

            if (effect.kind === 'tint') {
                ctx.globalCompositeOperation = 'multiply';
                ctx.fillStyle = effect.color;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = 'destination-in';
                ctx.drawImage(image, 0, 0);
            } else {
                ctx.globalCompositeOperation = 'source-in';
                ctx.fillStyle = effect.color;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            resolve(canvas.toDataURL());
        };
        image.onerror = () => {
            fallbackUrls.delete(cacheKey);
            resolve(undefined);
        };
        image.src = url;
    });

    fallbackUrls.set(cacheKey, promise);

    return promise;
};

/**
 * A theme sprite as a standalone image URL for CSS - plain, tinted (`multiply` + alpha clip,
 * the DOM stand-in for a sprite `tint`) or as a solid-colour silhouette (the `blend`
 * highlight). Sliced out of the decoded atlas synchronously (so the first render already has
 * it) and cached once per key + effect; falls back to the per-file URL when the atlas isn't
 * available. For untinted sprites that fill or size to a box, prefer drawing straight from the
 * atlas with `themeSpriteFillStyle`/`themeSpriteNativeStyle` - no standalone copy at all.
 */
export const useThemeImageUrl = (textureKey: string | undefined, effect: ThemeSliceEffect = { kind: 'plain' }): string | undefined => {
    const immediate = textureKey ? getThemeSliceUrl(textureKey, effect) : undefined;
    const effectKey = effectId(effect);
    const [ fallback, setFallback ] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!textureKey || immediate) return;

        let cancelled = false;
        const parsed: ThemeSliceEffect = effectKey === 'plain' ? { kind: 'plain' } : { kind: effectKey.split(':')[0] as 'tint' | 'silhouette', color: effectKey.slice(effectKey.indexOf(':') + 1) };

        void loadFallbackUrl(textureKey, parsed).then((result) => {
            if (!cancelled) setFallback(result);
        });

        return () => {
            cancelled = true;
        };
    }, [ textureKey, effectKey, immediate ]);

    return immediate ?? fallback;
};

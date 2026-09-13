import { useEffect, useRef, useState } from 'react';

import { getThemeSliceUrl, renderSliceEffect, ThemeSliceEffect, themeSliceEffectId } from '../utils/themeSprites';
import { THEME_URLS } from '../utils/themeUrls';

const fallbackUrls = new Map<string, Promise<string | undefined>>();

/**
 * The pre-atlas path: fetch the per-file PNG and recolour it on a canvas. Only reached when
 * the atlas failed to load; cached per key + effect like the atlas slices are.
 */
const loadFallbackUrl = (key: string, effect: ThemeSliceEffect): Promise<string | undefined> => {
    const cacheKey = `${key}|${themeSliceEffectId(effect)}`;
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
            resolve(renderSliceEffect(image, 0, 0, image.naturalWidth, image.naturalHeight, effect)?.toDataURL());
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
 * the DOM stand-in for a sprite `tint`), as a solid-colour silhouette (the sprite's alpha
 * shape in one colour) or as its drop shadow. Sliced out of the decoded atlas synchronously
 * (so the first render already has it) and cached once per key + effect; falls back to the
 * per-file URL when the atlas isn't available. For untinted sprites that fill or size to a
 * box, prefer drawing straight from the atlas with `themeSpriteFillStyle`/
 * `themeSpriteNativeStyle` - no standalone copy at all.
 */
export const useThemeImageUrl = (textureKey: string | undefined, effect: ThemeSliceEffect = { kind: 'plain' }): string | undefined => {
    const immediate = textureKey ? getThemeSliceUrl(textureKey, effect) : undefined;
    const effectKey = themeSliceEffectId(effect);
    const effectRef = useRef(effect);
    const [ fallback, setFallback ] = useState<string | undefined>(undefined);

    useEffect(() => {
        effectRef.current = effect;
    });

    useEffect(() => {
        if (!textureKey || immediate) return;

        let cancelled = false;

        void loadFallbackUrl(textureKey, effectRef.current).then((result) => {
            if (!cancelled) setFallback(result);
        });

        return () => {
            cancelled = true;
        };
    }, [ textureKey, effectKey, immediate ]);

    return immediate ?? fallback;
};

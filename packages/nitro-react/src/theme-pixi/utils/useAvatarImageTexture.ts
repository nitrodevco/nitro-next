import type { AvatarGenderType } from '@nitrodevco/nitro-api';
import { AvatarScaleType, AvatarSetType } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

export interface AvatarImageTexture {
    texture: Texture | undefined;
    width: number;
    height: number;
}

const EMPTY: AvatarImageTexture = { texture: undefined, width: 0, height: 0 };

/**
 * Pixi port of components/AvatarImage.tsx - same `GetAvatarRenderManager().createAvatarImage()`
 * engine call (not DOM-specific), same `resetFigure`/`resetEffect` callback wiring to force a
 * re-render, same `disposed` guard against a stale async resolve setting state after unmount/
 * figure-change. Diverges only in the last step: DOM round-trips the rendered avatar through
 * `getCroppedImageAsync` (which itself renders to a Pixi RenderTexture internally, then
 * converts THAT to an `HTMLImageElement` via `TextureUtils.generateImage` purely so a `<div>`
 * can show it as a `background-image`) and paints the resulting image element's `.src` as a
 * CSS background. This skips the CSS step and wraps that same already-decoded image element
 * directly in a Pixi `Texture.from()` instead - one texture per resolved image, `skipCache:
 * true` since these are ephemeral per-figure renders that would otherwise pile up in Pixi's
 * global texture cache forever, explicitly destroyed (source included) whenever a new one
 * replaces it or the hook unmounts.
 */
export const useAvatarImageTexture = (
    figure: string | undefined,
    gender: AvatarGenderType,
    { headOnly = false, direction = 0 }: { headOnly?: boolean; direction?: number } = {},
): AvatarImageTexture => {
    const [ result, setResult ] = useState<AvatarImageTexture>(EMPTY);
    const [ randomValue, setRandomValue ] = useState(-1);
    const disposed = useRef(false);
    const textureRef = useRef<Texture | undefined>(undefined);

    useEffect(() => {
        if (!figure) return;

        const avatarImage = GetAvatarRenderManager().createAvatarImage(
            figure,
            AvatarScaleType.Large,
            gender,
            { resetFigure: () => { if (!disposed.current) setRandomValue(Math.random()); } },
            { resetEffect: () => { if (!disposed.current) setRandomValue(Math.random()); } },
        );

        if (!avatarImage) return;

        const setType = headOnly ? AvatarSetType.Head : AvatarSetType.Full;

        avatarImage.setDirection(setType, direction);

        let cancelled = false;

        const load = async () => {
            const image = await avatarImage.getCroppedImageAsync(setType, false, 1);

            if (!image || cancelled) return;

            const texture = Texture.from(image, true);

            textureRef.current?.destroy(true);
            textureRef.current = texture;

            setResult({ texture, width: image.width, height: image.height });
        };

        void load();

        return () => {
            cancelled = true;
        };
    }, [ figure, gender, headOnly, direction, randomValue ]);

    useEffect(() => () => {
        disposed.current = true;
        textureRef.current?.destroy(true);
    }, []);

    return result;
};

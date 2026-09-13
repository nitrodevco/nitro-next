import { AvatarGenderType, AvatarScaleType, AvatarSetType } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager, TexturePool, TextureUtils } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

export interface AvatarImageTexture {
    texture: Texture | undefined;
    width: number;
    height: number;
}

const EMPTY: AvatarImageTexture = { texture: undefined, width: 0, height: 0 };

/**
 * Renders a figure through the avatar render manager and hands back the render texture it
 * draws into - `IAvatarImage.getImage()` - directly. The previous path (`getCroppedImageAsync`)
 * read that texture back off the GPU as a base64 PNG, decoded it into an `<img>` and uploaded
 * it a second time with `Texture.from`; here the one texture the avatar was rendered into is
 * the one the sprite shows.
 *
 * The `AvatarImage` instance owns that texture (plus a cache of body-part textures), so it is
 * disposed whenever the figure changes or the component unmounts - before this, every figure
 * change created a new instance and never released the old one, which is what made the avatar
 * editor's memory climb with every part clicked.
 *
 * A `scale` other than 1 hands back a reduced copy instead (`TextureUtils.createReducedTexture`:
 * smoothed and sharpened the way the Flash client shrank its renders) - stretching the sprite
 * would drop pixel rows of the pixel art and look squashed. That copy is owned here too.
 */
export const useAvatarImageTexture = (
    figure: string | undefined,
    gender: AvatarGenderType,
    { headOnly = false, direction = 0, scale = 1 }: { headOnly?: boolean; direction?: number; scale?: number } = {},
): AvatarImageTexture => {
    const [ result, setResult ] = useState<AvatarImageTexture>(EMPTY);
    const [ randomValue, setRandomValue ] = useState(-1);
    const disposed = useRef(false);

    useEffect(() => {
        if (!figure) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setResult(EMPTY);

            return;
        }

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

        const full = avatarImage.getImage(setType, false, 1);
        const reduced = (full && scale !== 1) ? TextureUtils.createReducedTexture(full, scale) : undefined;
        const texture = (scale !== 1) ? reduced : full;

        setResult(texture ? { texture, width: texture.width, height: texture.height } : EMPTY);

        return () => {
            if (reduced) TexturePool.releaseTexture(reduced);

            avatarImage.dispose();
        };
    }, [ figure, gender, headOnly, direction, scale, randomValue ]);

    useEffect(() => () => {
        disposed.current = true;
    }, []);

    return result;
};

import { AvatarGenderType, AvatarScaleType, AvatarSetType } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager } from '@nitrodevco/nitro-renderer';
import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, useEffect, useRef, useState } from 'react';

import { Box, getRenderMode, ThemeImage, useAvatarImageTexture } from '#base/theme';

type AvatarImageProps = {
    figure: string;
    gender: AvatarGenderType;
    headOnly?: boolean;
    direction?: number;
    scale?: number;
};

/** Pixi: the avatar's own render texture, straight from the render manager (see `useAvatarImageTexture`). */
const AvatarImagePixi = forwardRef<PixiContainer, AvatarImageProps>(({ figure, gender, headOnly = false, direction = 0 }, ref) => {
    const { texture, width, height } = useAvatarImageTexture(figure, gender, { headOnly, direction });

    if (!texture) return null;

    return (
        <Box
            ref={ref}
            layout={{ width, height }}
        >
            <pixiSprite
                texture={texture}
                eventMode="none"
                layout={{ width, height }}
            />
        </Box>
    );
});

AvatarImagePixi.displayName = 'AvatarImagePixi';

/**
 * DOM: an `<img>` needs a URL, so this is the one place the render is read back off the GPU
 * (`getCroppedImageAsync`). The `AvatarImage` instance is disposed as soon as the read-back
 * completes - it isn't needed once the URL exists - and again on figure change/unmount.
 */
const AvatarImageDom = forwardRef<PixiContainer, AvatarImageProps>(({ figure, gender, headOnly = false, direction = 0 }, ref) => {
    const [ randomValue, setRandomValue ] = useState<number>(-1);
    const [ imageData, setImageData ] = useState<{ width: number; height: number; url: string }>({ width: 0, height: 0, url: '' });
    const disposed = useRef<boolean>(false);

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
        let cancelled = false;

        avatarImage.setDirection(setType, direction);

        void avatarImage.getCroppedImageAsync(setType, false, 1).then((image) => {
            avatarImage.dispose();

            if (!image || cancelled) return;

            setImageData({ width: image.width, height: image.height, url: image.src });
        });

        return () => {
            cancelled = true;
        };
    }, [ figure, gender, headOnly, direction, randomValue ]);

    useEffect(() => () => {
        disposed.current = true;
    }, []);

    return (
        <ThemeImage
            ref={ref}
            src={imageData.url || undefined}
            width={imageData.width}
            height={imageData.height}
        />
    );
});

AvatarImageDom.displayName = 'AvatarImageDom';

export const AvatarImage = forwardRef<PixiContainer, AvatarImageProps>((props, ref) => (getRenderMode() === 'dom'
    ? (
            <AvatarImageDom
                ref={ref}
                {...props}
            />
        )
    : (
            <AvatarImagePixi
                ref={ref}
                {...props}
            />
        )));

AvatarImage.displayName = 'AvatarImage';

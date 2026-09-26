/** Renders a Flash `AvatarImageWidget` figure as a Pixi sprite with its size and crop from the avatar renderer. */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { Container as PixiContainer } from 'pixi.js';
import { forwardRef } from 'react';

import { Box, BoxLayout, useAvatarImageTexture } from '#base/theme';

type AvatarImageProps = {
    figure: string;
    gender: AvatarGenderType;
    headOnly?: boolean;
    cropped?: boolean;
    direction?: number;
    scale?: number;
    /** Positions the image box; its size is always the render's own size (never shrunk by a flex parent - crop with the parent's `overflow` instead). */
    layout?: BoxLayout;
};

/** Pixi: the avatar's own render texture, straight from the render manager (see `useAvatarImageTexture`). A `scale` other than 1 is rendered as a smoothed, sharpened copy at that size rather than by stretching the sprite, which would mangle the pixel art. */
export const AvatarImage = forwardRef<PixiContainer, AvatarImageProps>(({ figure, gender, headOnly = false, cropped = false, direction = 0, scale = 1, layout }, ref) => {
    const { texture, width, height } = useAvatarImageTexture(figure, gender, { headOnly, cropped, direction, scale });

    if (!texture) return null;

    return (
        <Box
            ref={ref}
            layout={{ ...layout, width, height, flexShrink: 0 }}
        >
            <pixiSprite
                texture={texture}
                eventMode="none"
                layout={{ width, height }}
            />
        </Box>
    );
});

AvatarImage.displayName = 'AvatarImage';

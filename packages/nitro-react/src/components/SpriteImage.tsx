import { forwardRef, type HTMLAttributes } from 'react';

import type { ImageState } from '#base/hooks';

interface SpriteImageProps extends HTMLAttributes<HTMLDivElement> {
    image: ImageState;
    backgroundPosition?: string;
}

export const SpriteImage = forwardRef<HTMLDivElement, SpriteImageProps>(
    ({ image, backgroundPosition = 'center', style, ...props }, ref) => (
        <div
            ref={ref}
            style={{
                width: image.width,
                height: image.height,
                backgroundImage: image.url ? `url(${image.url})` : undefined,
                backgroundPosition,
                backgroundRepeat: 'no-repeat',
                ...style
            }}
            {...props}
        />
    )
);

SpriteImage.displayName = 'SpriteImage';

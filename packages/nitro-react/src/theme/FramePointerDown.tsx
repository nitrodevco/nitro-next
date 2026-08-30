import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, Stretch } from './layer';
import { ThemeProps, ThemeVariant, ThemeVariants } from './utils';

export type FramePointerDownVariant = ThemeVariant;

const FRAME_POINTER_DOWN_VARIANTS: ThemeVariants<FramePointerDownVariant> = {
    7: { layer: Stretch('framepointerdown-src'), layout: { width: 16, height: 12 } },
};

export type FramePointerDownProps = ThemeProps<FramePointerDownVariant>;

export const FramePointerDown: ForwardRefExoticComponent<FramePointerDownProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, FramePointerDownProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { config, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant({
            cascadeKey: 'framePointerDown', variants: FRAME_POINTER_DOWN_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
                layout={{ ...config.layout, ...layout }}
                {...handlers}
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
            </Box>
        );
    },
);

FramePointerDown.displayName = 'FramePointerDown';

import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { ThemeImage } from './ThemeImage';
import { expandSides, ThemeProps, ThemeVariant } from './utils';

export type FramePointerDownVariant = ThemeVariant;

export type FramePointerDownProps = ThemeProps<FramePointerDownVariant>;

/** The `frame_pointer_down` skin (`habbo_skin_frame_pointer_down`): a frame's downward pointer, sized by its art. */
export const FramePointerDown: ForwardRefExoticComponent<FramePointerDownProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, FramePointerDownProps>(
    ({ variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { config, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant<FramePointerDownVariant>({
            cascadeKey: 'framePointerDown', variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        // A plain sprite skin with nothing layered over it is the sprite itself - one node, no Box.
        if (resolvedLayer?.kind === 'sprite' && !resolvedOverlay) {
            return (
                <ThemeImage
                    ref={ref}
                    textureKey={resolvedLayer.textureKey}
                    frame={resolvedLayer.frame}
                    tint={resolvedTint}
                    stretch
                    {...handlers}
                    layout={{ ...expandSides(config.layout), ...expandSides(layout) }}
                />
            );
        }

        return (
            <Box
                ref={ref}
                layout={{ ...expandSides(config.layout), ...expandSides(layout) }}
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

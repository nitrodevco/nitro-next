import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { ThemeImage } from './ThemeImage';
import { expandSides, ThemeProps, ThemeVariant } from './utils';

type Direction = 'left' | 'right' | 'up' | 'down';

type BubblePointerVariant = ThemeVariant;

/**
 * Each direction's cascade key - the theme's `bubblePointer<Direction>`: the client's
 * `bubble_pointer_<direction>` rows (styles 0 and 7) and their skins, pulled over the bubble's edge
 * by a negative margin where `BubbleController.pointerOffset` puts it.
 */
const CASCADE_KEYS: Record<Direction, string> = {
    left: 'bubblePointerLeft',
    right: 'bubblePointerRight',
    up: 'bubblePointerUp',
    down: 'bubblePointerDown',
};

export interface BubblePointerProps extends ThemeProps<BubblePointerVariant> {
    direction: Direction;
}

/**
 * A `bubble_pointer_<direction>` (`BubbleController`'s pointer): the skin for its direction, sized by
 * its art, which `Bubble` places on its edge.
 */
export const BubblePointer: ForwardRefExoticComponent<BubblePointerProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, BubblePointerProps>(
    ({ variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, direction, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { config, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant<BubblePointerVariant>({
            cascadeKey: CASCADE_KEYS[direction], variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
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

BubblePointer.displayName = 'BubblePointer';

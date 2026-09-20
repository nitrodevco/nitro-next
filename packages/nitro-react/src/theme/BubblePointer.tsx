import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, Stretch } from './layer';
import { ThemeImage } from './ThemeImage';
import { ThemeProps, ThemeVariant, ThemeVariants } from './utils';

type Direction = 'left' | 'right' | 'up' | 'down';

type BubblePointerVariant = ThemeVariant;

interface DirectionConfig {
    cascadeKey: string;
    variants?: ThemeVariants<BubblePointerVariant>;
}

const DIRECTION_CONFIG: Record<Direction, DirectionConfig> = {
    left: {
        cascadeKey: 'bubblePointerLeft',
        variants: {
            0: {
                layer: Stretch('bubblepointerleft-0-default-src'),
                layout: { marginRight: -2 },
            },
            // `bubble_7_xml` puts every pointer 2px outside the window, over the skin's 6px transparent margin.
            7: {
                layer: Stretch('bubblepointerleft-7-default-src'),
                layout: { marginRight: -9 },
            },
        },
    },
    right: {
        cascadeKey: 'bubblePointerRight',
        variants: {
            0: {
                layer: Stretch('bubblepointerright-0-default-src'),
                layout: { marginLeft: -2 },
            },
            7: {
                layer: Stretch('bubblepointerright-7-default-src'),
                layout: { marginLeft: -9 },
            },
        },
    },
    up: {
        cascadeKey: 'bubblePointerUp',
        variants: {
            0: {
                layer: Stretch('bubblepointerup-0-default-src'),
                layout: { marginBottom: -3 },
            },
            7: {
                layer: Stretch('bubblepointerup-7-default-src'),
                layout: { marginBottom: -8 },
            },
        },
    },
    down: {
        cascadeKey: 'bubblePointerDown',
        variants: {
            0: {
                layer: Stretch('bubblepointerdown-0-default-src'),
                layout: { marginTop: -3 },
            },
            7: {
                layer: Stretch('bubblepointerdown-7-default-src'),
                layout: { marginTop: -9 },
            },
        },
    },
};

export interface BubblePointerProps extends ThemeProps<BubblePointerVariant> {
    direction: Direction;
}

export const BubblePointer: ForwardRefExoticComponent<BubblePointerProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, BubblePointerProps>(
    ({ variant, defaultVariant, tooltip, layout, tintColor, textStyle, textColor, direction, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { cascadeKey, variants = {} } = DIRECTION_CONFIG[direction];
        const { config, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant({
            cascadeKey, variants, variant, defaultVariant, tooltip, tintColor, textStyle, textColor, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
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
                    layout={{ ...config.layout, ...layout }}
                />
            );
        }

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

BubblePointer.displayName = 'BubblePointer';

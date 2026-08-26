import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, Stretch } from './layer';
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
                layer: Stretch('bubblepointerleft-src', { x: 11, y: 0, width: 8, height: 13 }),
                layout: { marginRight: -2 },
            },
            7: {
                layer: Stretch('bubblepointerleft-src', { x: 0, y: 0, width: 11, height: 18 }),
                layout: { marginRight: -2 },
            },
        },
    },
    right: {
        cascadeKey: 'bubblePointerRight',
        variants: {
            0: {
                layer: Stretch('bubblepointerright-src', { x: 11, y: 0, width: 8, height: 13 }),
                layout: { marginLeft: -2 },
            },
            7: {
                layer: Stretch('bubblepointerright-src', { x: 0, y: 0, width: 11, height: 18 }),
                layout: { marginLeft: -2 },
            },
        },
    },
    up: {
        cascadeKey: 'bubblePointerUp',
        variants: {
            0: {
                layer: Stretch('bubblepointerup-src', { x: 16, y: 0, width: 13, height: 9 }),
                layout: { marginBottom: -3 },
            },
            7: {
                layer: Stretch('bubblepointerup-src', { x: 0, y: 0, width: 16, height: 10 }),
                layout: { marginBottom: -3 },
            },
        },
    },
    down: {
        cascadeKey: 'bubblePointerDown',
        variants: {
            0: {
                layer: Stretch('bubblepointerdown-src', { x: 16, y: 0, width: 13, height: 9 }),
                layout: { marginTop: -3 },
            },
            7: {
                layer: Stretch('bubblepointerdown-src', { x: 0, y: 0, width: 16, height: 11 }),
                layout: { marginTop: -3 },
            },
        },
    },
};

export interface BubblePointerProps extends ThemeProps<BubblePointerVariant> {
    direction: Direction;
}

export const BubblePointer: ForwardRefExoticComponent<BubblePointerProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, BubblePointerProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, direction, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { cascadeKey, variants = {} } = DIRECTION_CONFIG[direction];
        const { config, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant({
            cascadeKey, variants, variant, defaultVariant, tintColor, textStyle, textColor, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
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

BubblePointer.displayName = 'BubblePointer';

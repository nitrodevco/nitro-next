import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { BubblePointer } from './BubblePointer';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, NineSlice, Stretch } from './layer';
import { ThemeProps, ThemeVariant, ThemeVariants, wrapTextChildren } from './utils';

export type PointerDirection = 'up' | 'down' | 'left' | 'right';

export type BubbleVariant = ThemeVariant;

const POINTER_FLEX_DIRECTION: Record<PointerDirection, 'row' | 'row-reverse' | 'column' | 'column-reverse'> = {
    down: 'column',
    up: 'column-reverse',
    left: 'row-reverse',
    right: 'row',
};

const BUBBLE_VARIANTS: ThemeVariants<BubbleVariant> = {
    0: { layer: NineSlice('bubble-0-default-src', 5, 5, 5, 6), layout: { minWidth: 21, minHeight: 21 } },
    // ubuntu/habbo-style: plain stretch sprite, no nine-slice, no overlay.
    7: { layer: Stretch('bubble-7-default-src'), layout: { minWidth: 27, minHeight: 38 } },
};

export interface BubbleProps extends ThemeProps<BubbleVariant> {
    usePointer?: boolean;
    pointer?: PointerDirection;
    children?: ReactNode;
}

export const Bubble: ForwardRefExoticComponent<BubbleProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, BubbleProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, visible, usePointer = true, pointer = 'down', children, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant<BubbleVariant>({
            cascadeKey: 'bubble', variants: BUBBLE_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                layout={{ flexDirection: POINTER_FLEX_DIRECTION[pointer], alignItems: 'center' }}
                {...handlers}
            >
                <Box
                    ref={ref}
                    visible={visible}
                    layout={{ ...config.layout, ...layout }}
                >
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                    <VariantCascadeProvider map={ownCascade}>
                        {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                    </VariantCascadeProvider>
                </Box>
                <VariantCascadeProvider map={ownCascade}>
                    {usePointer && (
                        <BubblePointer
                            direction={pointer}
                            tintColor={resolvedTint}
                        />
                    )}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

Bubble.displayName = 'Bubble';

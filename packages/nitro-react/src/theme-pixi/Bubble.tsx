import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box } from './Box';
import { BubblePointer } from './BubblePointer';
import { BackgroundLayer, NineSlice, Stretch } from './layer';
import { useThemeVariant } from './utils/useThemeVariant';
import { wrapTextChildren } from './utils/wrapTextChildren';
import { ThemeProps, ThemeVariant, ThemeVariants } from './variant';

type PointerDirection = 'up' | 'down' | 'left' | 'right';

type BubbleVariant = ThemeVariant;

const BUBBLE_VARIANTS: ThemeVariants<BubbleVariant> = {
    '0': { layer: NineSlice('bubble-0-default-src', 5, 5, 5, 6), layout: { minWidth: 21, minHeight: 21 } },
    // ubuntu/habbo-style: plain stretch sprite, no nine-slice, no overlay.
    '7': { layer: Stretch('bubble-7-default-src'), layout: { minWidth: 27, minHeight: 38 } },
};

const POINTER_FLEX_DIRECTION: Record<PointerDirection, 'row' | 'row-reverse' | 'column' | 'column-reverse'> = {
    down: 'column',
    up: 'column-reverse',
    left: 'row-reverse',
    right: 'row',
};

export interface BubbleProps extends ThemeProps<BubbleVariant> {
    usePointer?: boolean;
    pointer?: PointerDirection;
    children?: ReactNode;
}

export const Bubble: ForwardRefExoticComponent<BubbleProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, BubbleProps>(
    ({ variant, defaultVariant, tintColor, usePointer = true, pointer = 'down', layout, children }, ref) => {
        const { ownCascade, config, resolvedLayer, resolvedTint } = useThemeVariant({
            cascadeKey: 'bubble', variants: BUBBLE_VARIANTS, variant, defaultVariant, tintColor,
        });

        return (
            <Box layout={{ flexDirection: POINTER_FLEX_DIRECTION[pointer], alignItems: 'center', ...config.layout, ...layout }}>
                <Box ref={ref}>
                    <BackgroundLayer layer={resolvedLayer} tintColor={resolvedTint} />
                    <VariantCascadeProvider map={ownCascade}>{wrapTextChildren(children)}</VariantCascadeProvider>
                </Box>
                <VariantCascadeProvider map={ownCascade}>
                    {usePointer && <BubblePointer direction={pointer} tintColor={resolvedTint} />}
                </VariantCascadeProvider>
            </Box>
        );
    }
);

Bubble.displayName = 'Bubble';

import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { BubblePointer } from './BubblePointer';
import { BackgroundLayer, BackgroundLayerConfig, NineSlice, Stretch } from './layer';
import { useResolvedVariant } from './utils/useResolvedVariant';
import { wrapTextChildren } from './utils/wrapTextChildren';

type PointerDirection = 'up' | 'down' | 'left' | 'right';

interface BubbleVariant {
    layer?: BackgroundLayerConfig;
    minWidth: number;
    minHeight: number;
    tintColor?: string;
}

const BUBBLE_VARIANTS: Record<string, BubbleVariant> = {
    '0': { layer: NineSlice('bubble-0-default-src', 5, 5, 5, 6), minWidth: 21, minHeight: 21 },
    // ubuntu/habbo-style: plain stretch sprite, no nine-slice, no overlay.
    '7': { layer: Stretch('bubble-7-default-src'), minWidth: 27, minHeight: 38 },
};

const POINTER_FLEX_DIRECTION: Record<PointerDirection, 'row' | 'row-reverse' | 'column' | 'column-reverse'> = {
    down: 'column',
    up: 'column-reverse',
    left: 'row-reverse',
    right: 'row',
};

export interface BubbleProps {
    variant?: string;
    defaultVariant?: string;
    tintColor?: string;
    usePointer?: boolean;
    pointer?: PointerDirection;
    layout?: BoxLayout;
    children?: ReactNode;
}

export const Bubble: ForwardRefExoticComponent<BubbleProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, BubbleProps>(
    ({ variant, defaultVariant, tintColor, usePointer = true, pointer = 'down', layout, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('bubble', variant, defaultVariant);
        const config = BUBBLE_VARIANTS[resolvedVariant] ?? BUBBLE_VARIANTS['0'];
        const resolvedTint = tintColor || config.tintColor;

        return (
            <Box layout={{ flexDirection: POINTER_FLEX_DIRECTION[pointer], alignItems: 'center', ...layout }}>
                <Box ref={ref} layout={{ minWidth: config.minWidth, minHeight: config.minHeight }}>
                    <BackgroundLayer layer={config.layer} tintColor={resolvedTint} />
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

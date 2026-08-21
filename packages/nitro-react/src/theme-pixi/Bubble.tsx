import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { useCascadedVariant, VARIANT_CASCADE_CONFIG, VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { BubblePointer } from './BubblePointer';
import { NineSliceLayer, SpriteLayer } from './utils/Layer';
import { wrapTextChildren } from './utils/wrapTextChildren';

type PointerDirection = 'up' | 'down' | 'left' | 'right';

type BubbleLayerConfig =
    | { kind: 'nineSlice', textureKey: string, leftWidth: number, topHeight: number, rightWidth: number, bottomHeight: number }
    | { kind: 'sprite', textureKey: string };

interface BubbleVariant {
    layer: BubbleLayerConfig;
    minWidth: number;
    minHeight: number;
}

/**
 * Full port of theme/Bubble.tsx's 2-variant table. DOM variant '0' also layers a documented
 * 1x1px transparent "spacer" overlay as a browser border-image rendering-glitch-avoidance
 * hack - it has no purpose in Pixi's renderer (NineSliceSprite has no such glitch) and is
 * intentionally dropped rather than ported.
 */
const BUBBLE_VARIANTS: Record<string, BubbleVariant> = {
    // default: nine-slice border, bottom edge (6px) thicker than the rest (5px) for the
    // pointer-notch area.
    '0': { layer: { kind: 'nineSlice', textureKey: 'bubble-0-default-src', leftWidth: 5, topHeight: 5, rightWidth: 5, bottomHeight: 6 }, minWidth: 21, minHeight: 21 },
    // ubuntu/habbo-style: plain stretch sprite, no nine-slice, no overlay.
    '7': { layer: { kind: 'sprite', textureKey: 'bubble-7-default-src' }, minWidth: 27, minHeight: 38 },
};

/** flex-col (normal order: body then pointer) for 'down'; flex-col-reverse for 'up'; flex-
 *  row-reverse for 'left'; flex-row (default, no reverse) for 'right' - theme/Bubble.tsx's
 *  wrapper-div className logic (`flex items-center` plus a direction-dependent reversal),
 *  reproduced with @pixi/layout's flexDirection instead of Tailwind's flex-direction classes. */
const POINTER_FLEX_DIRECTION: Record<PointerDirection, 'row' | 'row-reverse' | 'column' | 'column-reverse'> = {
    down: 'column',
    up: 'column-reverse',
    left: 'row-reverse',
    right: 'row',
};

const renderLayer = (layer: BubbleLayerConfig, tint: string | undefined) => {
    if (layer.kind === 'sprite') return <SpriteLayer textureKey={layer.textureKey} tint={tint} />;

    return <NineSliceLayer textureKey={layer.textureKey} leftWidth={layer.leftWidth} topHeight={layer.topHeight} rightWidth={layer.rightWidth} bottomHeight={layer.bottomHeight} tint={tint} />;
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
        const cascadedVariant = useCascadedVariant('bubble');
        const resolvedVariant = variant ?? cascadedVariant ?? defaultVariant ?? '0';
        const ownCascade = VARIANT_CASCADE_CONFIG['bubble']?.[resolvedVariant];
        // theme/Bubble.tsx's bubbleTintColors table is empty - no variant has a default tint,
        // but the tintColor prop still passes straight through, including down into the
        // pointer child so its color always matches the bubble's.
        const resolvedTint = tintColor;
        const config = BUBBLE_VARIANTS[resolvedVariant] ?? BUBBLE_VARIANTS['0'];

        return (
            <Box layout={{ flexDirection: POINTER_FLEX_DIRECTION[pointer], alignItems: 'center', ...layout }}>
                <Box ref={ref} layout={{ minWidth: config.minWidth, minHeight: config.minHeight }}>
                    {renderLayer(config.layer, resolvedTint)}
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

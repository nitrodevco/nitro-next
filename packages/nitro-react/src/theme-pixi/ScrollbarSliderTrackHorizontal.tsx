import './utils/pixiElements';

import type { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { Box, type BoxLayout } from './Box';
import { NineSliceLayer, SpriteLayer } from './utils/Layer';
import { useResolvedVariant } from './utils/useResolvedVariant';

type TrackLayer =
    | { kind: 'sprite', textureKey: string, disabledTextureKey?: string }
    | { kind: 'nineSlice', textureKey: string, leftWidth: number, topHeight: number, rightWidth: number, bottomHeight: number };

interface ScrollbarSliderTrackHorizontalVariant {
    layer: TrackLayer;
    minWidth?: number;
    minHeight?: number;
}

/**
 * Full port of theme/ScrollbarSliderTrackHorizontal.tsx's 5-variant table. Variants '0'/'1'
 * render the same static texture regardless of DOM's `active:`/`aria-disabled:` modifiers (both
 * point at the identical `-default-src` asset), so they're modeled as a single always-on
 * sprite; only variant '3' actually swaps to a distinct `-disabled-src` art when `!scrollable`.
 * Variants '100'/'200' both slice a 2px left/right border (unlike
 * ScrollbarSliderTrackVertical.tsx, whose '200' slices 3px, not 2px - confirmed from the exact
 * `border-image-width` values, not assumed symmetric with the vertical track).
 */
const SCROLLBAR_SLIDER_TRACK_HORIZONTAL_VARIANTS: Record<string, ScrollbarSliderTrackHorizontalVariant> = {
    '0': { layer: { kind: 'sprite', textureKey: 'scrollbarslidertrackhorizontal-0-default-src' }, minWidth: 1, minHeight: 17 },
    '1': { layer: { kind: 'sprite', textureKey: 'scrollbarslidertrackhorizontal-1-default-src' }, minWidth: 1, minHeight: 17 },
    '3': { layer: { kind: 'sprite', textureKey: 'scrollbarslidertrackhorizontal-3-default-src', disabledTextureKey: 'scrollbarslidertrackhorizontal-3-disabled-src' }, minWidth: 2, minHeight: 17 },
    '100': { layer: { kind: 'nineSlice', textureKey: 'scrollbarslidertrackhorizontal-100-default-src', leftWidth: 2, topHeight: 0, rightWidth: 2, bottomHeight: 0 } },
    '200': { layer: { kind: 'nineSlice', textureKey: 'scrollbarslidertrackhorizontal-200-default-src', leftWidth: 2, topHeight: 0, rightWidth: 2, bottomHeight: 0 } },
};

export interface ScrollbarSliderTrackHorizontalProps {
    variant?: string;
    defaultVariant?: string;
    disabled?: boolean;
    layout?: BoxLayout;
    onPointerDown?: (event: FederatedPointerEvent) => void;
    children?: ReactNode;
}

/** Pixi port of theme/ScrollbarSliderTrackHorizontal.tsx - the clickable track behind the thumb. */
export const ScrollbarSliderTrackHorizontal: ForwardRefExoticComponent<ScrollbarSliderTrackHorizontalProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderTrackHorizontalProps>(
    ({ variant, defaultVariant, disabled, layout, onPointerDown, children }, ref) => {
        const { resolvedVariant } = useResolvedVariant('scrollbarSliderTrackHorizontal', variant, defaultVariant);
        const config = SCROLLBAR_SLIDER_TRACK_HORIZONTAL_VARIANTS[resolvedVariant] ?? SCROLLBAR_SLIDER_TRACK_HORIZONTAL_VARIANTS['0'];
        const { layer } = config;

        return (
            <Box
                ref={ref}
                eventMode={disabled ? 'none' : 'static'}
                cursor={disabled ? undefined : 'pointer'}
                onPointerDown={disabled ? undefined : onPointerDown}
                layout={{ flex: 1, minWidth: config.minWidth, minHeight: config.minHeight, ...layout }}
            >
                {layer.kind === 'sprite'
                    ? <SpriteLayer textureKey={disabled && layer.disabledTextureKey ? layer.disabledTextureKey : layer.textureKey} />
                    : <NineSliceLayer textureKey={layer.textureKey} leftWidth={layer.leftWidth} topHeight={layer.topHeight} rightWidth={layer.rightWidth} bottomHeight={layer.bottomHeight} />}
                {children}
            </Box>
        );
    }
);

ScrollbarSliderTrackHorizontal.displayName = 'ScrollbarSliderTrackHorizontal';

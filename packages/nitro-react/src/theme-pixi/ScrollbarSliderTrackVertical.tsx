import type { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { Box, type BoxLayout } from './Box';
import { NineSliceLayer, SpriteLayer } from './layer';
import { useResolvedVariant } from './utils/useResolvedVariant';

type TrackLayer
    = | { kind: 'sprite'; textureKey: string; disabledTextureKey?: string }
        | { kind: 'nineSlice'; textureKey: string; leftWidth: number; topHeight: number; rightWidth: number; bottomHeight: number };

interface ScrollbarSliderTrackVerticalVariant {
    layer: TrackLayer;
    minWidth?: number;
    minHeight?: number;
}

/**
 * Full port of theme/ScrollbarSliderTrackVertical.tsx's 5-variant table. Variants '0'/'1'
 * render the same static texture regardless of DOM's `active:`/`aria-disabled:` modifiers (both
 * point at the identical `-default-src` asset, i.e. no real state art), so they're modeled as a
 * single always-on sprite; only variant '3' actually swaps to a distinct `-disabled-src` art
 * when `!scrollable`.
 *
 * Variants '100'/'200' are a genuine DOM asset-reuse quirk, confirmed directly from
 * theme/ScrollbarSliderTrackVertical.tsx's source rather than assumed: their
 * `border-image-source` vars are `--scrollbarslidertrackhorizontal-100/200-default-src` - the
 * *horizontal* track's own texture keys, not a `scrollbarslidertrackvertical-100/200-*` asset
 * set of their own. Preserved verbatim rather than "fixed".
 */
const SCROLLBAR_SLIDER_TRACK_VERTICAL_VARIANTS: Record<string, ScrollbarSliderTrackVerticalVariant> = {
    0: { layer: { kind: 'sprite', textureKey: 'scrollbarslidertrackvertical-0-default-src' }, minWidth: 17, minHeight: 1 },
    1: { layer: { kind: 'sprite', textureKey: 'scrollbarslidertrackvertical-1-default-src' }, minWidth: 17, minHeight: 1 },
    3: { layer: { kind: 'sprite', textureKey: 'scrollbarslidertrackvertical-3-default-src', disabledTextureKey: 'scrollbarslidertrackvertical-3-disabled-src' }, minWidth: 17, minHeight: 2 },
    100: { layer: { kind: 'nineSlice', textureKey: 'scrollbarslidertrackhorizontal-100-default-src', leftWidth: 0, topHeight: 2, rightWidth: 0, bottomHeight: 2 }, minWidth: 10, minHeight: 1 },
    200: { layer: { kind: 'nineSlice', textureKey: 'scrollbarslidertrackhorizontal-200-default-src', leftWidth: 0, topHeight: 3, rightWidth: 0, bottomHeight: 3 }, minWidth: 8, minHeight: 1 },
};

export interface ScrollbarSliderTrackVerticalProps {
    variant?: string;
    defaultVariant?: string;
    /** Pixi equivalent of DOM's `aria-disabled={!controller.scrollable}` - also disables
     *  pointer interaction (`aria-disabled:pointer-events-none`), matching the click-to-page
     *  behavior being unavailable while there's nothing to scroll. */
    disabled?: boolean;
    layout?: BoxLayout;
    onPointerDown?: (event: FederatedPointerEvent) => void;
    children?: ReactNode;
}

/** Pixi port of theme/ScrollbarSliderTrackVertical.tsx - the clickable track behind the thumb. */
export const ScrollbarSliderTrackVertical: ForwardRefExoticComponent<ScrollbarSliderTrackVerticalProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderTrackVerticalProps>(
    ({ variant, defaultVariant, disabled, layout, onPointerDown, children }, ref) => {
        const { resolvedVariant } = useResolvedVariant('scrollbarSliderTrackVertical', variant, defaultVariant);
        const config = SCROLLBAR_SLIDER_TRACK_VERTICAL_VARIANTS[resolvedVariant] ?? SCROLLBAR_SLIDER_TRACK_VERTICAL_VARIANTS['0'];
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
                    : (
                            <NineSliceLayer
                                textureKey={layer.textureKey}
                                leftWidth={layer.leftWidth}
                                topHeight={layer.topHeight}
                                rightWidth={layer.rightWidth}
                                bottomHeight={layer.bottomHeight}
                            />
                        )}
                {children}
            </Box>
        );
    },
);

ScrollbarSliderTrackVertical.displayName = 'ScrollbarSliderTrackVertical';

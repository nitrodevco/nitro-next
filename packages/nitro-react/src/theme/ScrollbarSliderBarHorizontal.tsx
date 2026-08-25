import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box, BoxLayout } from './Box';
import { useInteractionState, useResolvedVariant } from './hooks';
import { NineSliceLayer, NineSliceRepeatAxis, SpriteLayer, TileLayer } from './layer';

interface BarBorder {
    textureKey: string;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
    repeat?: NineSliceRepeatAxis;
}

interface ScrollbarSliderBarHorizontalVariant {
    default: BarBorder;
    hovering: BarBorder;
    pressed: BarBorder;
}

const border = (textureKey: string, leftWidth: number, rightWidth: number, repeat?: NineSliceRepeatAxis): BarBorder => ({ textureKey, leftWidth, topHeight: 0, rightWidth, bottomHeight: 0, repeat });

/**
 * Full port of theme/ScrollbarSliderBarHorizontal.tsx's 5-variant border half: a nine-slice
 * border-image sliced left/right only (mirrors ScrollbarSliderBarVertical.tsx's top/bottom
 * slice, rotated). '0' has a distinct `-pressed-src` art; '1' ("black") reuses its
 * `-default-src` for the `active:` state too (no visual press feedback, same DOM quirk as the
 * vertical bar's '1'); '3' has a distinct hover art plus `pixel-art`/
 * `border-image-repeat: repeat_stretch` (fill tiles horizontally rather than stretching - see
 * `NineSliceRepeatAxis`'s docblock); '100'/'200' reuse one texture for all three states.
 */
const SCROLLBAR_SLIDER_BAR_HORIZONTAL_VARIANTS: Record<string, ScrollbarSliderBarHorizontalVariant> = {
    0: {
        default: border('scrollbarsliderbarhorizontal-0-default-src', 2, 2),
        hovering: border('scrollbarsliderbarhorizontal-0-default-src', 2, 2),
        pressed: border('scrollbarsliderbarhorizontal-0-pressed-src', 2, 2),
    },
    1: {
        default: border('scrollbarsliderbarhorizontal-1-default-src', 2, 2),
        hovering: border('scrollbarsliderbarhorizontal-1-default-src', 2, 2),
        pressed: border('scrollbarsliderbarhorizontal-1-default-src', 2, 2),
    },
    3: {
        default: border('scrollbarsliderbarhorizontal-3-default-src', 5, 5, 'x'),
        hovering: border('scrollbarsliderbarhorizontal-3-hovering-src', 5, 5, 'x'),
        pressed: border('scrollbarsliderbarhorizontal-3-pressed-src', 5, 5, 'x'),
    },
    100: {
        default: border('scrollbarsliderbarhorizontal-100-default-src', 4, 4),
        hovering: border('scrollbarsliderbarhorizontal-100-default-src', 4, 4),
        pressed: border('scrollbarsliderbarhorizontal-100-default-src', 4, 4),
    },
    200: {
        default: border('scrollbarsliderbarhorizontal-200-default-src', 4, 4),
        hovering: border('scrollbarsliderbarhorizontal-200-default-src', 4, 4),
        pressed: border('scrollbarsliderbarhorizontal-200-default-src', 4, 4),
    },
};

interface BarOverlay {
    defaultTextureKey: string;
    pressedTextureKey: string;
    insetLeft: number;
    insetRight: number;
}

/**
 * Overlay gradient half - only '0'/'1' have one. Unlike ScrollbarSliderBarVertical.tsx's
 * overlay (which tiles in BOTH its default and pressed states), DOM's horizontal overlay is a
 * single static 10x7 sprite (`bg-no-repeat`) at `bg-position-[left_0px_top_5px]` while default,
 * and only switches to a horizontally-repeating tile (`background-repeat: repeat_no-repeat`)
 * while pressed - a genuine default-vs-pressed asymmetry confirmed from the exact DOM class
 * strings, not assumed symmetric with the vertical bar. The inset wrapper is also asymmetric:
 * only '0' insets left/right by `left-0.5 right-0.5` (2px); '1' has no entry in DOM's
 * `scrollbarSliderBarHorizontalOverlayInsetConfig` and falls back to its `inset-0` default
 * (full fill, no inset) - preserved as-is rather than "fixed" to match '0'.
 */
const SCROLLBAR_SLIDER_BAR_HORIZONTAL_OVERLAY: Partial<Record<string, BarOverlay>> = {
    0: { defaultTextureKey: 'scrollbarsliderbarhorizontal-0-default-grd-src', pressedTextureKey: 'scrollbarsliderbarhorizontal-0-pressed-grd-src', insetLeft: 2, insetRight: 2 },
    1: { defaultTextureKey: 'scrollbarsliderbarhorizontal-1-default-grd-src', pressedTextureKey: 'scrollbarsliderbarhorizontal-1-default-grd-src', insetLeft: 0, insetRight: 0 },
};

export interface ScrollbarSliderBarHorizontalProps {
    variant?: string;
    defaultVariant?: string;
    tintColor?: string;
    layout?: BoxLayout;
    onPointerDown?: (event: FederatedPointerEvent) => void;
}

/** Pixi port of theme/ScrollbarSliderBarHorizontal.tsx - the draggable scroll thumb. */
export const ScrollbarSliderBarHorizontal: ForwardRefExoticComponent<ScrollbarSliderBarHorizontalProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderBarHorizontalProps>(
    ({ variant, defaultVariant, tintColor, layout, onPointerDown }, ref) => {
        const { resolvedVariant } = useResolvedVariant('scrollbarSliderBarHorizontal', variant, defaultVariant);
        const config = SCROLLBAR_SLIDER_BAR_HORIZONTAL_VARIANTS[resolvedVariant] ?? SCROLLBAR_SLIDER_BAR_HORIZONTAL_VARIANTS['0'];
        const overlay = SCROLLBAR_SLIDER_BAR_HORIZONTAL_OVERLAY[resolvedVariant];
        const { state, handlers } = useInteractionState();
        const isPressed = state === 'pressed';
        const layer = isPressed ? config.pressed : state === 'hovering' ? config.hovering : config.default;

        const handlePointerDown = (event: FederatedPointerEvent) => {
            handlers.onPointerDown?.();
            onPointerDown?.(event);
        };

        // A variant with a grip overlay ('0'/'1') is a fixed 7px-thick bar centered in the
        // wider (17px) track - matching insetLeft/insetRight's own `5px`-from-edge asset math
        // (5 + 7 + 5 = 17) - same as ScrollbarSliderBarVertical.tsx's identical fix, rotated.
        // A variant with no overlay ('3'/'100'/'200') keeps filling the track's full thickness,
        // its previous (and still correct, for those) behavior.
        const crossAxisLayout: BoxLayout = overlay ? { top: 5, height: 7 } : { top: 0, height: '100%' };
        const mergedLayout = { position: 'absolute' as const, ...crossAxisLayout, ...layout };

        // The pressed overlay positions itself from `left`/`right` (no `width`) - same
        // Yoga-defaults-a-leaf's-unspecified-axis-to-its-texture's-own-intrinsic-size trap
        // `BackgroundLayer.tsx`'s `containerHeight` docblock explains for the vertical bar's
        // `top`/`bottom`-only overlay, just rotated onto the width axis here. Computed from the
        // real bar width (`mergedLayout.width`, the one thing that knows it) instead of trusting
        // Yoga to infer it from the insets.
        const overlayWidth = overlay && typeof mergedLayout.width === 'number'
            ? mergedLayout.width - overlay.insetLeft - overlay.insetRight
            : undefined;

        return (
            <Box
                ref={ref}
                eventMode="static"
                layout={mergedLayout}
                onPointerOver={handlers.onPointerOver}
                onPointerOut={handlers.onPointerOut}
                onPointerDown={handlePointerDown}
                onPointerUp={handlers.onPointerUp}
                onPointerUpOutside={handlers.onPointerUpOutside}
            >
                <NineSliceLayer
                    textureKey={layer.textureKey}
                    leftWidth={layer.leftWidth}
                    topHeight={layer.topHeight}
                    rightWidth={layer.rightWidth}
                    bottomHeight={layer.bottomHeight}
                    tintColor={tintColor}
                    repeat={layer.repeat}
                />
                {overlay && (
                    isPressed
                        ? (
                                <TileLayer
                                    textureKey={overlay.pressedTextureKey}
                                    tintColor={tintColor}
                                    layout={overlayWidth !== undefined
                                        ? { position: 'absolute', left: overlay.insetLeft, top: 0, width: overlayWidth, height: 7 }
                                        : { position: 'absolute', left: overlay.insetLeft, right: overlay.insetRight, top: 0, height: 7 }}
                                />
                            )
                        : (
                                <SpriteLayer
                                    textureKey={overlay.defaultTextureKey}
                                    tintColor={tintColor}
                                    layout={{ position: 'absolute', left: overlay.insetLeft, top: 0, width: 10, height: 7 }}
                                />
                            )
                )}
            </Box>
        );
    },
);

ScrollbarSliderBarHorizontal.displayName = 'ScrollbarSliderBarHorizontal';

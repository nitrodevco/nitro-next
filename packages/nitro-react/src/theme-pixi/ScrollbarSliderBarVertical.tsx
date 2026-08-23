import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react';

import { Box, type BoxLayout } from './Box';
import { NineSliceLayer, TileLayer } from './layer';
import { useInteractionState } from './utils/useInteractionState';
import { useResolvedVariant } from './utils/useResolvedVariant';

interface BarBorder {
    textureKey: string;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
}

interface ScrollbarSliderBarVerticalVariant {
    default: BarBorder;
    hovering: BarBorder;
    pressed: BarBorder;
}

const border = (textureKey: string, topHeight: number, bottomHeight: number): BarBorder => ({ textureKey, leftWidth: 0, topHeight, rightWidth: 0, bottomHeight });

/**
 * Full port of theme/ScrollbarSliderBarVertical.tsx's 5-variant border half: a nine-slice
 * border-image sliced top/bottom only (`leftWidth`/`rightWidth` always 0). '0' has a distinct
 * `-pressed-src` art; '1' ("black") points its `active:` state at the same `-default-src`
 * texture as its default state (a real DOM no-visual-feedback-on-press quirk, preserved as-is,
 * not "fixed" into reusing '0's pressed art); '3' is the only variant with a distinct hover
 * art AND `pixel-art`/`border-image-repeat: stretch_repeat` (edges repeat-tile rather than
 * stretch) - PixiJS's NineSliceSprite has no tiling-edges mode (only stretch, same limitation
 * flagged for Border.tsx's variant '100'), so this degrades to a stretched border, and nearest-
 * neighbor sampling isn't wired up anywhere in theme-pixi yet - both flagged here rather than
 * silently dropped. '100'/'200' have no hover/press art of their own (all three states reuse
 * the same texture).
 */
const SCROLLBAR_SLIDER_BAR_VERTICAL_VARIANTS: Record<string, ScrollbarSliderBarVerticalVariant> = {
    0: {
        default: border('scrollbarsliderbarvertical-0-default-src', 2, 2),
        hovering: border('scrollbarsliderbarvertical-0-default-src', 2, 2),
        pressed: border('scrollbarsliderbarvertical-0-pressed-src', 2, 2),
    },
    1: {
        default: border('scrollbarsliderbarvertical-1-default-src', 2, 2),
        hovering: border('scrollbarsliderbarvertical-1-default-src', 2, 2),
        pressed: border('scrollbarsliderbarvertical-1-default-src', 2, 2),
    },
    3: {
        default: border('scrollbarsliderbarvertical-3-default-src', 5, 5),
        hovering: border('scrollbarsliderbarvertical-3-hovering-src', 5, 5),
        pressed: border('scrollbarsliderbarvertical-3-pressed-src', 5, 5),
    },
    100: {
        default: border('scrollbarsliderbarvertical-100-default-src', 4, 4),
        hovering: border('scrollbarsliderbarvertical-100-default-src', 4, 4),
        pressed: border('scrollbarsliderbarvertical-100-default-src', 4, 4),
    },
    200: {
        default: border('scrollbarsliderbarvertical-200-default-src', 4, 4),
        hovering: border('scrollbarsliderbarvertical-200-default-src', 4, 4),
        pressed: border('scrollbarsliderbarvertical-200-default-src', 4, 4),
    },
};

interface BarOverlay {
    defaultTextureKey: string;
    pressedTextureKey: string;
    insetTop: number;
    insetBottom: number;
}

/**
 * Overlay gradient half - only '0'/'1' have one (`3`/`100`/`200` have an empty overlay
 * classname in DOM, i.e. no overlay at all). DOM positions it via
 * `bg-position-[left_5px_top_0px] bg-size-[7px_10px] bg-repeat-y`, tiling vertically inside a
 * wrapper inset by `top-1 bottom-1` (4px, not 1px - this project's Tailwind spacing unit is
 * 4px, confirmed from `min-w-4.25` elsewhere in the same source resolving to 17px). Both the
 * default AND pressed states tile vertically (DOM's `active:` rule never overrides
 * `background-repeat`, so it inherits the base `bg-repeat-y`) - unlike
 * ScrollbarSliderBarHorizontal.tsx, whose default state is a single static (non-repeating)
 * sprite and only the pressed state tiles, a genuine asymmetry preserved from DOM.
 */
const SCROLLBAR_SLIDER_BAR_VERTICAL_OVERLAY: Partial<Record<string, BarOverlay>> = {
    0: { defaultTextureKey: 'scrollbarsliderbarvertical-0-default-grd-src', pressedTextureKey: 'scrollbarsliderbarvertical-0-pressed-grd-src', insetTop: 4, insetBottom: 4 },
    1: { defaultTextureKey: 'scrollbarsliderbarvertical-1-default-grd-src', pressedTextureKey: 'scrollbarsliderbarvertical-1-default-grd-src', insetTop: 4, insetBottom: 4 },
};

export interface ScrollbarSliderBarVerticalProps {
    variant?: string;
    defaultVariant?: string;
    tintColor?: string;
    layout?: BoxLayout;
    onPointerDown?: (event: FederatedPointerEvent) => void;
}

/** Pixi port of theme/ScrollbarSliderBarVertical.tsx - the draggable scroll thumb. */
export const ScrollbarSliderBarVertical: ForwardRefExoticComponent<ScrollbarSliderBarVerticalProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderBarVerticalProps>(
    ({ variant, defaultVariant, tintColor, layout, onPointerDown }, ref) => {
        const { resolvedVariant } = useResolvedVariant('scrollbarSliderBarVertical', variant, defaultVariant);
        const config = SCROLLBAR_SLIDER_BAR_VERTICAL_VARIANTS[resolvedVariant] ?? SCROLLBAR_SLIDER_BAR_VERTICAL_VARIANTS['0'];
        const overlay = SCROLLBAR_SLIDER_BAR_VERTICAL_OVERLAY[resolvedVariant];
        const { state, handlers } = useInteractionState();
        const isPressed = state === 'pressed';
        const layer = isPressed ? config.pressed : state === 'hovering' ? config.hovering : config.default;

        const handlePointerDown = (event: FederatedPointerEvent) => {
            handlers.onPointerDown?.();
            onPointerDown?.(event);
        };

        return (
            <Box
                ref={ref}
                eventMode="static"
                cursor={isPressed ? 'grabbing' : 'grab'}
                layout={{ position: 'absolute', ...layout }}
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
                />
                {overlay && (
                    <TileLayer
                        textureKey={isPressed ? overlay.pressedTextureKey : overlay.defaultTextureKey}
                        tintColor={tintColor}
                        layout={{ position: 'absolute', left: 5, top: overlay.insetTop, bottom: overlay.insetBottom, width: 7 }}
                    />
                )}
            </Box>
        );
    },
);

ScrollbarSliderBarVertical.displayName = 'ScrollbarSliderBarVertical';

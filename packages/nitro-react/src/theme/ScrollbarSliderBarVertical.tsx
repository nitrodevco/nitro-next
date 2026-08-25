import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, NineSlice, Tiled } from './layer';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant } from './utils';

type ScrollbarSliderBarVerticalVariant = ThemeWithStatesVariant;

const SCROLLBAR_SLIDER_BAR_VERTICAL_VARIANTS: ThemeVariants<ScrollbarSliderBarVerticalVariant> = {
    0: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-0-default-src', 0, 2, 0, 2),
            hovering: NineSlice('scrollbarsliderbarvertical-0-default-src', 0, 2, 0, 2),
            pressed: NineSlice('scrollbarsliderbarvertical-0-pressed-src', 0, 2, 0, 2),
        },
        // The old CSS reference positions the grip overlay `5px` from the left edge at a fixed
        // `7px` width (never stretched) - i.e. the whole draggable bar is a `7px`-wide strip
        // sitting inside the wider (`17px`) track, not a bar that fills the track's full width.
        // `left: 5` centers that 7px strip in the 17px track the base NineSlice asset and
        // buttons are authored for (5 + 7 + 5 = 17); the overlay's own inset is now relative to
        // this already-correctly-sized/positioned container, so it starts at `left: 0`.
        overlays: {
            default: Tiled('scrollbarsliderbarvertical-0-default-grd-src', 0, 4, 4, 7),
            pressed: Tiled('scrollbarsliderbarvertical-0-pressed-grd-src', 0, 4, 4, 7),
        },
        layout: { left: 5, width: 7 },
    },
    1: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-1-default-src', 0, 2, 0, 2),
            hovering: NineSlice('scrollbarsliderbarvertical-1-default-src', 0, 2, 0, 2),
            pressed: NineSlice('scrollbarsliderbarvertical-1-default-src', 0, 2, 0, 2),
        },
        overlays: {
            default: Tiled('scrollbarsliderbarvertical-1-default-grd-src', 0, 4, 4, 7),
            pressed: Tiled('scrollbarsliderbarvertical-1-pressed-grd-src', 0, 4, 4, 7),
        },
        layout: { left: 5, width: 7 },
    },
    3: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-3-default-src', 0, 5, 0, 5, undefined, 'y'),
            hovering: NineSlice('scrollbarsliderbarvertical-3-hovering-src', 0, 5, 0, 5, undefined, 'y'),
            pressed: NineSlice('scrollbarsliderbarvertical-3-pressed-src', 0, 5, 0, 5, undefined, 'y'),
        },
        layout: { left: 0, width: '100%' },
    },
    100: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-100-default-src', 0, 4, 0, 4),
            hovering: NineSlice('scrollbarsliderbarvertical-100-default-src', 0, 4, 0, 4),
            pressed: NineSlice('scrollbarsliderbarvertical-100-default-src', 0, 4, 0, 4),
        },
        layout: { left: 0, width: '100%' },
    },
    200: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-200-default-src', 0, 4, 0, 4),
            hovering: NineSlice('scrollbarsliderbarvertical-200-default-src', 0, 4, 0, 4),
            pressed: NineSlice('scrollbarsliderbarvertical-200-default-src', 0, 4, 0, 4),
        },
        layout: { left: 0, width: '100%' },
    },
};

export interface ScrollbarSliderBarVerticalProps extends ThemeProps<ScrollbarSliderBarVerticalVariant> {
    onPointerDown?: (event: FederatedPointerEvent) => void;
}

export const ScrollbarSliderBarVertical: ForwardRefExoticComponent<ScrollbarSliderBarVerticalProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderBarVerticalProps>(
    ({ variant, defaultVariant, layout, tintColor, onPointerDown }, ref) => {
        const { config, state, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant({
            cascadeKey: 'border', variants: SCROLLBAR_SLIDER_BAR_VERTICAL_VARIANTS, variant, defaultVariant, tintColor,
        });

        const handlePointerDown = (event: FederatedPointerEvent) => {
            handlers.onPointerDown?.();
            onPointerDown?.(event);
        };

        const mergedLayout = { position: 'absolute' as const, ...config.layout, ...layout };

        return (
            <Box
                ref={ref}
                eventMode="static"
                cursor={state === 'pressed' ? 'grabbing' : 'grab'}
                layout={mergedLayout}
                onPointerOver={handlers.onPointerOver}
                onPointerOut={handlers.onPointerOut}
                onPointerDown={handlePointerDown}
                onPointerUp={handlers.onPointerUp}
                onPointerUpOutside={handlers.onPointerUpOutside}
            >
                { resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                ) }
                {/* `layout` here is what lets the overlay's tile insets compute a real height
                    instead of falling back to its texture's own intrinsic size - see
                    `BackgroundLayer.tsx`'s docblock on `containerHeight`. */}
                {resolvedOverlay && (
                    <BackgroundLayer
                        layer={resolvedOverlay}
                        layout={mergedLayout}
                    />
                )}
            </Box>
        );
    },
);

ScrollbarSliderBarVertical.displayName = 'ScrollbarSliderBarVertical';

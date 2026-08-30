import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, NineSlice, Tiled } from './layer';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant } from './utils';

export type ScrollbarSliderBarVerticalVariant = ThemeWithStatesVariant;

const SCROLLBAR_SLIDER_BAR_VERTICAL_VARIANTS: ThemeVariants<ScrollbarSliderBarVerticalVariant> = {
    0: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-0-default-src', 0, 2, 0, 2),
            hovering: NineSlice('scrollbarsliderbarvertical-0-default-src', 0, 2, 0, 2),
            pressed: NineSlice('scrollbarsliderbarvertical-0-pressed-src', 0, 2, 0, 2),
        },
        // Matches the old CSS reference exactly: the draggable bar itself fills its container
        // (border-image-slice applied to the full-width nine-slice-border div); only the grip
        // *pattern* inside it is a non-repeating-horizontally 7px column, positioned 5px from
        // the bar's own left edge via background-position (`bg-position-[left_5px_top_0px]
        // bg-size-[7px_10px] bg-repeat-y` on a `inset-x-0 top-1 bottom-1` wrapper).
        overlays: {
            default: Tiled('scrollbarsliderbarvertical-0-default-grd-src', 5, 4, 4, 7),
            pressed: Tiled('scrollbarsliderbarvertical-0-pressed-grd-src', 5, 4, 4, 7),
        },
    },
    1: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-1-default-src', 0, 2, 0, 2),
            hovering: NineSlice('scrollbarsliderbarvertical-1-default-src', 0, 2, 0, 2),
            pressed: NineSlice('scrollbarsliderbarvertical-1-default-src', 0, 2, 0, 2),
        },
        overlays: {
            default: Tiled('scrollbarsliderbarvertical-1-default-grd-src', 5, 4, 4, 7),
            pressed: Tiled('scrollbarsliderbarvertical-1-pressed-grd-src', 5, 4, 4, 7),
        },
    },
    3: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-3-default-src', 0, 5, 0, 5, undefined, 'y'),
            hovering: NineSlice('scrollbarsliderbarvertical-3-hovering-src', 0, 5, 0, 5, undefined, 'y'),
            pressed: NineSlice('scrollbarsliderbarvertical-3-pressed-src', 0, 5, 0, 5, undefined, 'y'),
        },
    },
    100: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-100-default-src', 0, 4, 0, 4),
            hovering: NineSlice('scrollbarsliderbarvertical-100-default-src', 0, 4, 0, 4),
            pressed: NineSlice('scrollbarsliderbarvertical-100-default-src', 0, 4, 0, 4),
        },
    },
    200: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-200-default-src', 0, 4, 0, 4),
            hovering: NineSlice('scrollbarsliderbarvertical-200-default-src', 0, 4, 0, 4),
            pressed: NineSlice('scrollbarsliderbarvertical-200-default-src', 0, 4, 0, 4),
        },
    },
};

export type ScrollbarSliderBarVerticalProps = ThemeProps<ScrollbarSliderBarVerticalVariant>;

export const ScrollbarSliderBarVertical: ForwardRefExoticComponent<ScrollbarSliderBarVerticalProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderBarVerticalProps>(
    ({
        variant, defaultVariant, layout, tintColor,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { config, state, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant({
            cascadeKey: 'border', variants: SCROLLBAR_SLIDER_BAR_VERTICAL_VARIANTS, variant, defaultVariant, tintColor,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        const mergedLayout = { position: 'absolute' as const, ...config.layout, ...layout };

        return (
            <Box
                ref={ref}
                cursor={state === 'pressed' ? 'grabbing' : 'grab'}
                layout={mergedLayout}
                {...handlers}
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

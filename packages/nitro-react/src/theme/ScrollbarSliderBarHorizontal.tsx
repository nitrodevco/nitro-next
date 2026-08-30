import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, NineSlice, Tiled } from './layer';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant } from './utils';

export type ScrollbarSliderBarHorizontalVariant = ThemeWithStatesVariant;

/**
 * The horizontal scrollbar thumb - the same shape as `ScrollbarSliderBarVertical`: the bar's
 * body as a state-driven nine-slice (`states`), and for the classic skins a "grip" pattern
 * tiled along the bar's middle (`overlays`, a `Tiled` strip inset from the bar's ends), untinted
 * like the vertical grip.
 */
const SCROLLBAR_SLIDER_BAR_HORIZONTAL_VARIANTS: ThemeVariants<ScrollbarSliderBarHorizontalVariant> = {
    0: {
        states: {
            default: NineSlice('scrollbarsliderbarhorizontal-0-default-src', 2, 0, 2, 0),
            hovering: NineSlice('scrollbarsliderbarhorizontal-0-default-src', 2, 0, 2, 0),
            pressed: NineSlice('scrollbarsliderbarhorizontal-0-pressed-src', 2, 0, 2, 0),
        },
        overlays: {
            default: Tiled('scrollbarsliderbarhorizontal-0-default-grd-src', { left: 2, right: 2, top: 5, height: 7 }),
            pressed: Tiled('scrollbarsliderbarhorizontal-0-pressed-grd-src', { left: 2, right: 2, top: 5, height: 7 }),
        },
    },
    1: {
        states: {
            default: NineSlice('scrollbarsliderbarhorizontal-1-default-src', 2, 0, 2, 0),
            hovering: NineSlice('scrollbarsliderbarhorizontal-1-default-src', 2, 0, 2, 0),
            pressed: NineSlice('scrollbarsliderbarhorizontal-1-default-src', 2, 0, 2, 0),
        },
        overlays: {
            default: Tiled('scrollbarsliderbarhorizontal-1-default-grd-src', { left: 0, right: 0, top: 5, height: 7 }),
            pressed: Tiled('scrollbarsliderbarhorizontal-1-default-grd-src', { left: 0, right: 0, top: 5, height: 7 }),
        },
    },
    3: {
        states: {
            default: NineSlice('scrollbarsliderbarhorizontal-3-default-src', 5, 0, 5, 0, undefined, 'x'),
            hovering: NineSlice('scrollbarsliderbarhorizontal-3-hovering-src', 5, 0, 5, 0, undefined, 'x'),
            pressed: NineSlice('scrollbarsliderbarhorizontal-3-pressed-src', 5, 0, 5, 0, undefined, 'x'),
        },
    },
    100: {
        states: {
            default: NineSlice('scrollbarsliderbarhorizontal-100-default-src', 4, 0, 4, 0),
            hovering: NineSlice('scrollbarsliderbarhorizontal-100-default-src', 4, 0, 4, 0),
            pressed: NineSlice('scrollbarsliderbarhorizontal-100-default-src', 4, 0, 4, 0),
        },
    },
    200: {
        states: {
            default: NineSlice('scrollbarsliderbarhorizontal-200-default-src', 4, 0, 4, 0),
            hovering: NineSlice('scrollbarsliderbarhorizontal-200-default-src', 4, 0, 4, 0),
            pressed: NineSlice('scrollbarsliderbarhorizontal-200-default-src', 4, 0, 4, 0),
        },
    },
};

export type ScrollbarSliderBarHorizontalProps = ThemeProps<ScrollbarSliderBarHorizontalVariant>;

export const ScrollbarSliderBarHorizontal: ForwardRefExoticComponent<ScrollbarSliderBarHorizontalProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderBarHorizontalProps>(
    ({
        variant, defaultVariant, layout, tintColor,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { config, state, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant({
            cascadeKey: 'scrollbarSliderBarHorizontal', variants: SCROLLBAR_SLIDER_BAR_HORIZONTAL_VARIANTS, variant, defaultVariant, tintColor,
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
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {/* `layout` lets the grip strip's insets resolve against the thumb's real size -
                    see `BackgroundLayer.tsx` on `containerWidth`/`containerHeight`. */}
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

ScrollbarSliderBarHorizontal.displayName = 'ScrollbarSliderBarHorizontal';

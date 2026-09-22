import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, Composite, NineSlice, Tiled } from './layer';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant } from './utils';

export type ScrollbarSliderBarVerticalVariant = ThemeWithStatesVariant;

/**
 * The classic lift (`habbo_skin_scrollbar` / `_black`, layout `scrollbar_lift_vertical`): a 2px cap
 * top and bottom around a stretched middle, and the grip (`grd`), a 7x10 bitmap the layout places
 * at 5,7 and tiles down as the bar grows - `BitmapSkinRenderer.draw` grows a `tiled` entity's rect
 * by the window's size delta and tiles from its top-left, so it always spans y 7 to 7 from the
 * bottom. The layout has no `hovering` state; hovering draws `default`.
 */
const classicVerticalLift = (style: string): ScrollbarSliderBarVerticalVariant => ({
    states: {
        default: NineSlice(`scrollbarsliderbarvertical-${style}-default-src`, 0, 2, 0, 2),
        disabled: NineSlice(`scrollbarsliderbarvertical-${style}-disabled-src`, 0, 2, 0, 2),
        pressed: NineSlice(`scrollbarsliderbarvertical-${style}-pressed-src`, 0, 2, 0, 2),
    },
    overlays: {
        default: Tiled(`scrollbarsliderbarvertical-${style}-default-grd-src`, { left: 5, top: 7, bottom: 7, width: 7 }),
        pressed: Tiled(`scrollbarsliderbarvertical-${style}-pressed-grd-src`, { left: 5, top: 7, bottom: 7, width: 7 }),
        // The `disabled` template has no grip.
        disabled: Composite([]),
    },
});

const SCROLLBAR_SLIDER_BAR_VERTICAL_VARIANTS: ThemeVariants<ScrollbarSliderBarVerticalVariant> = {
    0: classicVerticalLift('0'),
    1: classicVerticalLift('1'),
    3: {
        states: {
            default: NineSlice('scrollbarsliderbarvertical-3-default-src', 0, 5, 0, 5, undefined, 'y'),
            hovering: NineSlice('scrollbarsliderbarvertical-3-hovering-src', 0, 5, 0, 5, undefined, 'y'),
            // `lift_*_disabled_3` is an empty template: no lift is drawn while the bar is disabled.
            disabled: Composite([]),
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

export interface ScrollbarSliderBarVerticalProps extends ThemeProps<ScrollbarSliderBarVerticalVariant> {
    /** The scrollbar is disabled (its content fits): the lift fills the track in its `disabled` art and takes no input. */
    disabled?: boolean;
}

export const ScrollbarSliderBarVertical: ForwardRefExoticComponent<ScrollbarSliderBarVerticalProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderBarVerticalProps>(
    ({
        variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, disabled,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { config, state, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant({
            cascadeKey: 'scrollbarSliderBarVertical', variants: SCROLLBAR_SLIDER_BAR_VERTICAL_VARIANTS, variant, defaultVariant, tooltip, tooltipDelay, tintColor, disabled,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        const mergedLayout = { position: 'absolute' as const, ...config.layout, ...layout };

        return (
            <Box
                ref={ref}
                layout={mergedLayout}
                {...handlers}
                cursor={disabled ? 'default' : (state === 'pressed' ? 'grabbing' : 'grab')}
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

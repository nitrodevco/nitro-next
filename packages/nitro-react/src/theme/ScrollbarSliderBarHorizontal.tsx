import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box } from './Box';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, Composite, NineSlice, Tiled } from './layer';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant } from './utils';

export type ScrollbarSliderBarHorizontalVariant = ThemeWithStatesVariant;

/**
 * The horizontal scrollbar thumb - the same shape as `ScrollbarSliderBarVertical`: the bar's
 * body as a state-driven nine-slice (`states`), and for the classic skins the grip tiled along
 * its middle (`overlays`).
 *
 * The classic lift is that one lying down (`scrollbar_lift_horizontal`): 2px caps left and right, and the
 * 10x7 grip placed at 8,5 and tiled across as the bar grows, so it spans x 8 to 6 from the right
 * (see `classicVerticalLift` in ScrollbarSliderBarVertical.tsx for the rule).
 */
const classicHorizontalLift = (style: string): ScrollbarSliderBarHorizontalVariant => ({
    states: {
        default: NineSlice(`scrollbarsliderbarhorizontal-${style}-default-src`, 2, 0, 2, 0),
        disabled: NineSlice(`scrollbarsliderbarhorizontal-${style}-disabled-src`, 2, 0, 2, 0),
        pressed: NineSlice(`scrollbarsliderbarhorizontal-${style}-pressed-src`, 2, 0, 2, 0),
    },
    overlays: {
        default: Tiled(`scrollbarsliderbarhorizontal-${style}-default-grd-src`, { left: 8, right: 6, top: 5, height: 7 }),
        pressed: Tiled(`scrollbarsliderbarhorizontal-${style}-pressed-grd-src`, { left: 8, right: 6, top: 5, height: 7 }),
        // The `disabled` template has no grip.
        disabled: Composite([]),
    },
});

const SCROLLBAR_SLIDER_BAR_HORIZONTAL_VARIANTS: ThemeVariants<ScrollbarSliderBarHorizontalVariant> = {
    0: classicHorizontalLift('0'),
    1: classicHorizontalLift('1'),
    3: {
        states: {
            default: NineSlice('scrollbarsliderbarhorizontal-3-default-src', 5, 0, 5, 0, undefined, 'x'),
            hovering: NineSlice('scrollbarsliderbarhorizontal-3-hovering-src', 5, 0, 5, 0, undefined, 'x'),
            // `lift_*_disabled_3` is an empty template: no lift is drawn while the bar is disabled.
            disabled: Composite([]),
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

export interface ScrollbarSliderBarHorizontalProps extends ThemeProps<ScrollbarSliderBarHorizontalVariant> {
    /** The scrollbar is disabled (its content fits): the lift fills the track in its `disabled` art and takes no input. */
    disabled?: boolean;
}

export const ScrollbarSliderBarHorizontal: ForwardRefExoticComponent<ScrollbarSliderBarHorizontalProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderBarHorizontalProps>(
    ({
        variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, disabled,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { config, state, handlers, resolvedLayer, resolvedOverlay, resolvedTint } = useThemeVariant({
            cascadeKey: 'scrollbarSliderBarHorizontal', variants: SCROLLBAR_SLIDER_BAR_HORIZONTAL_VARIANTS, variant, defaultVariant, tooltip, tooltipDelay, tintColor, disabled,
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

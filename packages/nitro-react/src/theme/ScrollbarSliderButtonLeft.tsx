import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { useThemeVariant } from './hooks';
import { Stretch } from './layer';
import { ThemeImage } from './ThemeImage';
import { expandSides, ThemeProps, ThemeVariants, ThemeWithStatesVariant } from './utils';

export type ScrollbarSliderButtonLeftVariant = ThemeWithStatesVariant;

/**
 * The scrollbar's "left" step button: one PNG per variant and state under
 * `public/assets/theme/scrollbarsliderbuttonleft/`, cut from `habbo_skin_scrollbar`'s
 * `scrollbar_button_left` layout (and the `_black` / `_3` skins' own). Variants 0/1 have no
 * distinct hover art - the skins' `active` state is commented out, so hovering repeats the
 * default piece, the same pattern as `CloseButton`'s 1/2. Variant 3's layout is 17 wide for a
 * 16-wide bitmap, which is why its box is a pixel wider than its art.
 */
const SCROLLBAR_SLIDER_BUTTON_LEFT_VARIANTS: ThemeVariants<ScrollbarSliderButtonLeftVariant> = {
    0: {
        states: {
            default: Stretch('scrollbarsliderbuttonleft-0-default-src'),
            hovering: Stretch('scrollbarsliderbuttonleft-0-default-src'),
            pressed: Stretch('scrollbarsliderbuttonleft-0-pressed-src'),
            disabled: Stretch('scrollbarsliderbuttonleft-0-disabled-src'),
        },
        layout: { width: 16, height: 17 },
    },
    1: {
        states: {
            default: Stretch('scrollbarsliderbuttonleft-1-default-src'),
            hovering: Stretch('scrollbarsliderbuttonleft-1-default-src'),
            pressed: Stretch('scrollbarsliderbuttonleft-1-pressed-src'),
            disabled: Stretch('scrollbarsliderbuttonleft-1-disabled-src'),
        },
        layout: { width: 16, height: 17 },
    },
    3: {
        states: {
            default: Stretch('scrollbarsliderbuttonleft-3-default-src'),
            hovering: Stretch('scrollbarsliderbuttonleft-3-hovering-src'),
            pressed: Stretch('scrollbarsliderbuttonleft-3-pressed-src'),
            disabled: Stretch('scrollbarsliderbuttonleft-3-disabled-src'),
        },
        layout: { width: 17, height: 17 },
    },
};

export interface ScrollbarSliderButtonLeftProps extends ThemeProps<ScrollbarSliderButtonLeftVariant> {
    disabled?: boolean;
}

/**
 * Purely the themed skin - the press-and-hold repeat-scroll behaviour lives in the caller's
 * `useHoldToRepeat` (see ScrollbarHorizontal.tsx), spread in as the pointer handlers.
 */
export const ScrollbarSliderButtonLeft: ForwardRefExoticComponent<ScrollbarSliderButtonLeftProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderButtonLeftProps>(
    ({ variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, disabled, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { config, handlers, resolvedLayer, resolvedTint } = useThemeVariant({
            cascadeKey: 'scrollbarSliderButtonLeft', variants: SCROLLBAR_SLIDER_BUTTON_LEFT_VARIANTS, variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, disabled,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        if (!resolvedLayer || resolvedLayer.kind !== 'sprite') return null;

        return (
            <ThemeImage
                ref={ref}
                textureKey={resolvedLayer.textureKey}
                tint={resolvedTint}
                {...handlers}
                layout={{ ...expandSides(config.layout), ...expandSides(layout) }}
            />
        );
    },
);

ScrollbarSliderButtonLeft.displayName = 'ScrollbarSliderButtonLeft';

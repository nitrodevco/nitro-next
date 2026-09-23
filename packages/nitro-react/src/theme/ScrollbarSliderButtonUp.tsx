import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { useThemeVariant } from './hooks';
import { Stretch } from './layer';
import { ThemeImage } from './ThemeImage';
import { expandSides, ThemeProps, ThemeVariants, ThemeWithStatesVariant } from './utils';

export type ScrollbarSliderButtonUpVariant = ThemeWithStatesVariant;

/**
 * The scrollbar's "up" step button: one PNG per variant and state under
 * `public/assets/theme/scrollbarsliderbuttonup/`, cut from `habbo_skin_scrollbar`'s
 * `scrollbar_button_up` layout (and the `_black` / `_3` skins' own). Variants 0/1 have no
 * distinct hover art - the skins' `active` state is commented out, so hovering repeats the
 * default piece, the same pattern as `CloseButton`'s 1/2.
 */
const SCROLLBAR_SLIDER_BUTTON_UP_VARIANTS: ThemeVariants<ScrollbarSliderButtonUpVariant> = {
    0: {
        states: {
            default: Stretch('scrollbarsliderbuttonup-0-default-src'),
            hovering: Stretch('scrollbarsliderbuttonup-0-default-src'),
            pressed: Stretch('scrollbarsliderbuttonup-0-pressed-src'),
            disabled: Stretch('scrollbarsliderbuttonup-0-disabled-src'),
        },
        layout: { width: 17, height: 16 },
    },
    1: {
        states: {
            default: Stretch('scrollbarsliderbuttonup-1-default-src'),
            hovering: Stretch('scrollbarsliderbuttonup-1-default-src'),
            pressed: Stretch('scrollbarsliderbuttonup-1-pressed-src'),
            disabled: Stretch('scrollbarsliderbuttonup-1-disabled-src'),
        },
        layout: { width: 17, height: 16 },
    },
    3: {
        states: {
            default: Stretch('scrollbarsliderbuttonup-3-default-src'),
            hovering: Stretch('scrollbarsliderbuttonup-3-hovering-src'),
            pressed: Stretch('scrollbarsliderbuttonup-3-pressed-src'),
            disabled: Stretch('scrollbarsliderbuttonup-3-disabled-src'),
        },
        layout: { width: 17, height: 16 },
    },
};

export interface ScrollbarSliderButtonUpProps extends ThemeProps<ScrollbarSliderButtonUpVariant> {
    disabled?: boolean;
}

/**
 * Purely the themed skin - the press-and-hold repeat-scroll behaviour lives in the caller's
 * `useHoldToRepeat` (see ScrollbarVertical.tsx), spread in as the pointer handlers.
 */
export const ScrollbarSliderButtonUp: ForwardRefExoticComponent<ScrollbarSliderButtonUpProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderButtonUpProps>(
    ({ variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, disabled, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { config, handlers, resolvedLayer, resolvedTint } = useThemeVariant({
            cascadeKey: 'scrollbarSliderButtonUp', variants: SCROLLBAR_SLIDER_BUTTON_UP_VARIANTS, variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, disabled,
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

ScrollbarSliderButtonUp.displayName = 'ScrollbarSliderButtonUp';

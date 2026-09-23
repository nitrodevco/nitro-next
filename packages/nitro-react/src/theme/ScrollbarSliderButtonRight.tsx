import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { useThemeVariant } from './hooks';
import { Stretch } from './layer';
import { ThemeImage } from './ThemeImage';
import { expandSides, ThemeProps, ThemeVariants, ThemeWithStatesVariant } from './utils';

export type ScrollbarSliderButtonRightVariant = ThemeWithStatesVariant;

/**
 * The scrollbar's "right" step button: one PNG per variant and state under
 * `public/assets/theme/scrollbarsliderbuttonright/`, cut from `habbo_skin_scrollbar`'s
 * `scrollbar_button_right` layout (and the `_black` / `_3` skins' own). Variants 0/1 have no
 * distinct hover art - the skins' `active` state is commented out, so hovering repeats the
 * default piece, the same pattern as `CloseButton`'s 1/2.
 */
const SCROLLBAR_SLIDER_BUTTON_RIGHT_VARIANTS: ThemeVariants<ScrollbarSliderButtonRightVariant> = {
    0: {
        states: {
            default: Stretch('scrollbarsliderbuttonright-0-default-src'),
            hovering: Stretch('scrollbarsliderbuttonright-0-default-src'),
            pressed: Stretch('scrollbarsliderbuttonright-0-pressed-src'),
            disabled: Stretch('scrollbarsliderbuttonright-0-disabled-src'),
        },
        layout: { width: 16, height: 17 },
    },
    1: {
        states: {
            default: Stretch('scrollbarsliderbuttonright-1-default-src'),
            hovering: Stretch('scrollbarsliderbuttonright-1-default-src'),
            pressed: Stretch('scrollbarsliderbuttonright-1-pressed-src'),
            disabled: Stretch('scrollbarsliderbuttonright-1-disabled-src'),
        },
        layout: { width: 16, height: 17 },
    },
    3: {
        states: {
            default: Stretch('scrollbarsliderbuttonright-3-default-src'),
            hovering: Stretch('scrollbarsliderbuttonright-3-hovering-src'),
            pressed: Stretch('scrollbarsliderbuttonright-3-pressed-src'),
            disabled: Stretch('scrollbarsliderbuttonright-3-disabled-src'),
        },
        layout: { width: 16, height: 17 },
    },
};

export interface ScrollbarSliderButtonRightProps extends ThemeProps<ScrollbarSliderButtonRightVariant> {
    disabled?: boolean;
}

/**
 * Purely the themed skin - the press-and-hold repeat-scroll behaviour lives in the caller's
 * `useHoldToRepeat` (see ScrollbarHorizontal.tsx), spread in as the pointer handlers.
 */
export const ScrollbarSliderButtonRight: ForwardRefExoticComponent<ScrollbarSliderButtonRightProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderButtonRightProps>(
    ({ variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, disabled, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { config, handlers, resolvedLayer, resolvedTint } = useThemeVariant({
            cascadeKey: 'scrollbarSliderButtonRight', variants: SCROLLBAR_SLIDER_BUTTON_RIGHT_VARIANTS, variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, disabled,
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

ScrollbarSliderButtonRight.displayName = 'ScrollbarSliderButtonRight';

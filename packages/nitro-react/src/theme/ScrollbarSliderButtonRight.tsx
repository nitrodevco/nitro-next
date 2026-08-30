import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { useThemeVariant } from './hooks';
import { Stretch } from './layer';
import { ThemeImage } from './ThemeImage';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant } from './utils';

export type ScrollbarSliderButtonRightVariant = ThemeWithStatesVariant;

/**
 * The scrollbar's "right" step button: one 160x17 sheet packing the default / pressed /
 * disabled frames of every variant, 16x17 each, selected by state through `Stretch(key, frame)`
 * like every other state-driven skin. Variants 0/1 have no distinct hover art (hovering repeats
 * the default frame, the same pattern as `CloseButton`'s 1/2).
 */
const SCROLLBAR_SLIDER_BUTTON_RIGHT_VARIANTS: ThemeVariants<ScrollbarSliderButtonRightVariant> = {
    0: {
        states: {
            default: Stretch('scrollbarsliderbuttonright-src', { x: 0, y: 0, width: 16, height: 17 }),
            hovering: Stretch('scrollbarsliderbuttonright-src', { x: 0, y: 0, width: 16, height: 17 }),
            pressed: Stretch('scrollbarsliderbuttonright-src', { x: 16, y: 0, width: 16, height: 17 }),
            disabled: Stretch('scrollbarsliderbuttonright-src', { x: 32, y: 0, width: 16, height: 17 }),
        },
        layout: { width: 16, height: 17 },
    },
    1: {
        states: {
            default: Stretch('scrollbarsliderbuttonright-src', { x: 48, y: 0, width: 16, height: 17 }),
            hovering: Stretch('scrollbarsliderbuttonright-src', { x: 48, y: 0, width: 16, height: 17 }),
            pressed: Stretch('scrollbarsliderbuttonright-src', { x: 64, y: 0, width: 16, height: 17 }),
            disabled: Stretch('scrollbarsliderbuttonright-src', { x: 80, y: 0, width: 16, height: 17 }),
        },
        layout: { width: 16, height: 17 },
    },
    3: {
        states: {
            default: Stretch('scrollbarsliderbuttonright-src', { x: 96, y: 0, width: 16, height: 17 }),
            hovering: Stretch('scrollbarsliderbuttonright-src', { x: 112, y: 0, width: 16, height: 17 }),
            pressed: Stretch('scrollbarsliderbuttonright-src', { x: 128, y: 0, width: 16, height: 17 }),
            disabled: Stretch('scrollbarsliderbuttonright-src', { x: 144, y: 0, width: 16, height: 17 }),
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
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, disabled, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { config, handlers, resolvedLayer, resolvedTint } = useThemeVariant({
            cascadeKey: 'scrollbarSliderButtonRight', variants: SCROLLBAR_SLIDER_BUTTON_RIGHT_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, disabled,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        if (!resolvedLayer || resolvedLayer.kind !== 'sprite' || !resolvedLayer.frame) return null;

        return (
            <ThemeImage
                ref={ref}
                textureKey={resolvedLayer.textureKey}
                frame={resolvedLayer.frame}
                tint={resolvedTint}
                {...handlers}
                layout={{ ...config.layout, ...layout }}
            />
        );
    },
);

ScrollbarSliderButtonRight.displayName = 'ScrollbarSliderButtonRight';

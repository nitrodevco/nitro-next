import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { useThemeVariant } from './hooks';
import { Stretch } from './layer';
import { ThemeImage } from './ThemeImage';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant } from './utils';

export type ScrollbarSliderButtonUpVariant = ThemeWithStatesVariant;

/**
 * The scrollbar's "up" step button: one 170x16 sheet packing the default / pressed /
 * disabled frames of every variant, 17x16 each, selected by state through `Stretch(key, frame)`
 * like every other state-driven skin. Variants 0/1 have no distinct hover art (hovering repeats
 * the default frame, the same pattern as `CloseButton`'s 1/2).
 */
const SCROLLBAR_SLIDER_BUTTON_UP_VARIANTS: ThemeVariants<ScrollbarSliderButtonUpVariant> = {
    0: {
        states: {
            default: Stretch('scrollbarsliderbuttonup-src', { x: 0, y: 0, width: 17, height: 16 }),
            hovering: Stretch('scrollbarsliderbuttonup-src', { x: 0, y: 0, width: 17, height: 16 }),
            pressed: Stretch('scrollbarsliderbuttonup-src', { x: 17, y: 0, width: 17, height: 16 }),
            disabled: Stretch('scrollbarsliderbuttonup-src', { x: 34, y: 0, width: 17, height: 16 }),
        },
        layout: { width: 17, height: 16 },
    },
    1: {
        states: {
            default: Stretch('scrollbarsliderbuttonup-src', { x: 51, y: 0, width: 17, height: 16 }),
            hovering: Stretch('scrollbarsliderbuttonup-src', { x: 51, y: 0, width: 17, height: 16 }),
            pressed: Stretch('scrollbarsliderbuttonup-src', { x: 68, y: 0, width: 17, height: 16 }),
            disabled: Stretch('scrollbarsliderbuttonup-src', { x: 85, y: 0, width: 17, height: 16 }),
        },
        layout: { width: 17, height: 16 },
    },
    3: {
        states: {
            default: Stretch('scrollbarsliderbuttonup-src', { x: 102, y: 0, width: 17, height: 16 }),
            hovering: Stretch('scrollbarsliderbuttonup-src', { x: 119, y: 0, width: 17, height: 16 }),
            pressed: Stretch('scrollbarsliderbuttonup-src', { x: 136, y: 0, width: 17, height: 16 }),
            disabled: Stretch('scrollbarsliderbuttonup-src', { x: 153, y: 0, width: 17, height: 16 }),
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
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, disabled, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { config, handlers, resolvedLayer, resolvedTint } = useThemeVariant({
            cascadeKey: 'scrollbarSliderButtonUp', variants: SCROLLBAR_SLIDER_BUTTON_UP_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, disabled,
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

ScrollbarSliderButtonUp.displayName = 'ScrollbarSliderButtonUp';

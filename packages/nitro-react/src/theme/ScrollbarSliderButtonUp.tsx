import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { useThemeVariant } from './hooks';
import { Stretch } from './layer';
import { ThemeImage } from './ThemeImage';
import { THEME_URLS, ThemeProps, ThemeVariants, ThemeWithStatesVariant } from './utils';

export type ScrollbarSliderButtonUpVariant = ThemeWithStatesVariant;

/**
 * Full port of theme/ScrollbarSliderButtonUp.tsx's 3-variant table: a single 170x16
 * spritesheet packing default/active/aria-disabled frames per variant, 17x16px each.
 * Variants '0'/'1' have no `hover:` rule in DOM (hovering renders identically to default) -
 * modeled as static, repeating the default frame for the hovering state, same pattern as
 * CloseButton.tsx's variant '1'/'2'.
 */
const SCROLLBAR_SLIDER_BUTTON_UP_VARIANTS: ThemeVariants<ScrollbarSliderButtonUpVariant> = {
    0: {
        states: {
            default: Stretch('scrollbarsliderbuttonup-src', { x: 0, y: 0, width: 17, height: 16 }),
            hovering: Stretch('scrollbarsliderbuttonup-src', { x: 0, y: 0, width: 17, height: 16 }),
            pressed: Stretch('scrollbarsliderbuttonup-src', { x: 17, y: 0, width: 17, height: 16 }),
            disabled: Stretch('scrollbarsliderbuttonup-src', { x: 34, y: 0, width: 17, height: 16 }),
        },
        layout: {
            width: 17,
            height: 16,
        },
    },
    1: {
        states: {
            default: Stretch('scrollbarsliderbuttonup-src', { x: 51, y: 0, width: 17, height: 16 }),
            hovering: Stretch('scrollbarsliderbuttonup-src', { x: 51, y: 0, width: 17, height: 16 }),
            pressed: Stretch('scrollbarsliderbuttonup-src', { x: 68, y: 0, width: 17, height: 16 }),
            disabled: Stretch('scrollbarsliderbuttonup-src', { x: 85, y: 0, width: 17, height: 16 }),
        },
        layout: {
            width: 17,
            height: 16,
        },
    },
    3: {
        states: {
            default: Stretch('scrollbarsliderbuttonup-src', { x: 102, y: 0, width: 17, height: 16 }),
            hovering: Stretch('scrollbarsliderbuttonup-src', { x: 119, y: 0, width: 17, height: 16 }),
            pressed: Stretch('scrollbarsliderbuttonup-src', { x: 136, y: 0, width: 17, height: 16 }),
            disabled: Stretch('scrollbarsliderbuttonup-src', { x: 153, y: 0, width: 17, height: 16 }),
        },
        layout: {
            width: 17,
            height: 16,
        },
    },
};

export interface ScrollbarSliderButtonUpProps extends ThemeProps<ScrollbarSliderButtonUpVariant> {
    disabled?: boolean;
}

/**
 * Pixi port of theme/ScrollbarSliderButtonUp.tsx. Purely a themed button skin - the
 * press-and-hold repeat-scroll behavior lives in the caller's `useHoldToRepeat`
 * (see ScrollbarVertical.tsx), spread in as `onPointerDown`/`onPointerUp`/`onPointerUpOutside`.
 */
export const ScrollbarSliderButtonUp: ForwardRefExoticComponent<ScrollbarSliderButtonUpProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderButtonUpProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, disabled, onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { config, handlers, resolvedLayer } = useThemeVariant({
            cascadeKey: 'scrollbarSliderButtonUp', variants: SCROLLBAR_SLIDER_BUTTON_UP_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, disabled,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        if (!resolvedLayer || resolvedLayer.kind !== 'sprite' || !resolvedLayer.frame) return null;

        return (
            <ThemeImage
                ref={ref}
                src={THEME_URLS[resolvedLayer.textureKey]}
                frame={resolvedLayer.frame}
                cursor={handlers.eventMode === 'static' ? 'pointer' : undefined}
                {...handlers}
                layout={{ ...config.layout, ...layout }}
            />
        );
    },
);

ScrollbarSliderButtonUp.displayName = 'ScrollbarSliderButtonUp';

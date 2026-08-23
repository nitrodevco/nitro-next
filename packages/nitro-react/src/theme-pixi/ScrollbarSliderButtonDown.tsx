import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { THEME_URLS } from '#base/theme-core';

import { BoxLayout } from './Box';
import { Image } from './Image';
import { resolveByState, useInteractionState } from './utils/useInteractionState';
import { useResolvedVariant } from './utils/useResolvedVariant';
import { SpriteFrame } from './utils/spriteFrame';

interface ScrollbarSliderButtonDownVariant {
    textureKey: string;
    frames: { default: SpriteFrame; hovering: SpriteFrame; pressed: SpriteFrame; disabled: SpriteFrame };
}

/**
 * Full port of theme/ScrollbarSliderButtonDown.tsx's 3-variant table - identical frame
 * geometry to ScrollbarSliderButtonUp.tsx (same 170x16 layout, same offsets), just its own
 * `scrollbarsliderbuttondown-src` texture. Variants '0'/'1' have no `hover:` rule in DOM -
 * modeled as static, repeating the default frame for the hovering state.
 */
const SCROLLBAR_SLIDER_BUTTON_DOWN_VARIANTS: Partial<Record<string, ScrollbarSliderButtonDownVariant>> = {
    0: {
        textureKey: 'scrollbarsliderbuttondown-src',
        frames: {
            default: { x: 0, y: 0, width: 17, height: 16 },
            hovering: { x: 0, y: 0, width: 17, height: 16 },
            pressed: { x: 17, y: 0, width: 17, height: 16 },
            disabled: { x: 34, y: 0, width: 17, height: 16 },
        },
    },
    1: {
        textureKey: 'scrollbarsliderbuttondown-src',
        frames: {
            default: { x: 51, y: 0, width: 17, height: 16 },
            hovering: { x: 51, y: 0, width: 17, height: 16 },
            pressed: { x: 68, y: 0, width: 17, height: 16 },
            disabled: { x: 85, y: 0, width: 17, height: 16 },
        },
    },
    3: {
        textureKey: 'scrollbarsliderbuttondown-src',
        frames: {
            default: { x: 102, y: 0, width: 17, height: 16 },
            hovering: { x: 119, y: 0, width: 17, height: 16 },
            pressed: { x: 136, y: 0, width: 17, height: 16 },
            disabled: { x: 153, y: 0, width: 17, height: 16 },
        },
    },
};

export interface ScrollbarSliderButtonDownProps {
    variant?: string;
    defaultVariant?: string;
    disabled?: boolean;
    layout?: BoxLayout;
    onPointerDown?: () => void;
    onPointerUp?: () => void;
    onPointerUpOutside?: () => void;
}

/**
 * Pixi port of theme/ScrollbarSliderButtonDown.tsx. Purely a themed button skin - the
 * press-and-hold repeat-scroll behavior lives in the caller's `useHoldToRepeat`
 * (see ScrollbarVertical.tsx), spread in as `onPointerDown`/`onPointerUp`/`onPointerUpOutside`.
 */
export const ScrollbarSliderButtonDown: ForwardRefExoticComponent<ScrollbarSliderButtonDownProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderButtonDownProps>(
    ({ variant, defaultVariant, disabled, layout, onPointerDown, onPointerUp, onPointerUpOutside }, ref) => {
        const { resolvedVariant } = useResolvedVariant('scrollbarSliderButtonDown', variant, defaultVariant);
        const config = SCROLLBAR_SLIDER_BUTTON_DOWN_VARIANTS[resolvedVariant] ?? SCROLLBAR_SLIDER_BUTTON_DOWN_VARIANTS['0']!;
        const { state, handlers } = useInteractionState(disabled);
        const frame = resolveByState(config.frames, state);

        const handlePointerDown = () => {
            handlers.onPointerDown?.();
            onPointerDown?.();
        };
        const handlePointerUp = () => {
            handlers.onPointerUp?.();
            onPointerUp?.();
        };
        const handlePointerUpOutside = () => {
            handlers.onPointerUpOutside?.();
            onPointerUpOutside?.();
        };

        return (
            <Image
                ref={ref}
                src={THEME_URLS[config.textureKey]}
                frame={frame}
                eventMode={handlers.eventMode}
                cursor={disabled ? undefined : 'pointer'}
                onPointerOver={handlers.onPointerOver}
                onPointerOut={handlers.onPointerOut}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerUpOutside={handlePointerUpOutside}
                layout={{ width: frame.width, height: frame.height, ...layout }}
            />
        );
    },
);

ScrollbarSliderButtonDown.displayName = 'ScrollbarSliderButtonDown';

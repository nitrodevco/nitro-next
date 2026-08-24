import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { BoxLayout } from './Box';
import { resolveByState, useInteractionState, useResolvedVariant } from './hooks';
import { ThemeImage } from './ThemeImage';
import { SpriteFrame, THEME_URLS } from './utils';

interface ScrollbarSliderButtonLeftVariant {
    textureKey: string;
    frames: { default: SpriteFrame; hovering: SpriteFrame; pressed: SpriteFrame; disabled: SpriteFrame };
}

/**
 * Full port of theme/ScrollbarSliderButtonLeft.tsx's 3-variant table: a 164x17 spritesheet.
 * Variants '0'/'1' frames are 16x17px with no `hover:` rule (hovering = default frame);
 * variant '3' frames are 17x17px and has a distinct hover frame - confirmed from the exact
 * `bg-position`/`bg-size` offsets in theme/ScrollbarSliderButtonLeft.tsx (variant '3' is the
 * only one of the four button components whose frame width differs across its own variants).
 */
const SCROLLBAR_SLIDER_BUTTON_LEFT_VARIANTS: Partial<Record<string, ScrollbarSliderButtonLeftVariant>> = {
    0: {
        textureKey: 'scrollbarsliderbuttonleft-src',
        frames: {
            default: { x: 0, y: 0, width: 16, height: 17 },
            hovering: { x: 0, y: 0, width: 16, height: 17 },
            pressed: { x: 16, y: 0, width: 16, height: 17 },
            disabled: { x: 32, y: 0, width: 16, height: 17 },
        },
    },
    1: {
        textureKey: 'scrollbarsliderbuttonleft-src',
        frames: {
            default: { x: 48, y: 0, width: 16, height: 17 },
            hovering: { x: 48, y: 0, width: 16, height: 17 },
            pressed: { x: 64, y: 0, width: 16, height: 17 },
            disabled: { x: 80, y: 0, width: 16, height: 17 },
        },
    },
    3: {
        textureKey: 'scrollbarsliderbuttonleft-src',
        frames: {
            default: { x: 96, y: 0, width: 17, height: 17 },
            hovering: { x: 113, y: 0, width: 17, height: 17 },
            pressed: { x: 130, y: 0, width: 17, height: 17 },
            disabled: { x: 147, y: 0, width: 17, height: 17 },
        },
    },
};

export interface ScrollbarSliderButtonLeftProps {
    variant?: string;
    defaultVariant?: string;
    disabled?: boolean;
    layout?: BoxLayout;
    onPointerDown?: () => void;
    onPointerUp?: () => void;
    onPointerUpOutside?: () => void;
}

/**
 * Pixi port of theme/ScrollbarSliderButtonLeft.tsx. Purely a themed button skin - the
 * press-and-hold repeat-scroll behavior lives in the caller's `useHoldToRepeat`
 * (see ScrollbarHorizontal.tsx), spread in as `onPointerDown`/`onPointerUp`/`onPointerUpOutside`.
 */
export const ScrollbarSliderButtonLeft: ForwardRefExoticComponent<ScrollbarSliderButtonLeftProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderButtonLeftProps>(
    ({ variant, defaultVariant, disabled, layout, onPointerDown, onPointerUp, onPointerUpOutside }, ref) => {
        const { resolvedVariant } = useResolvedVariant('scrollbarSliderButtonLeft', variant, defaultVariant);
        const config = SCROLLBAR_SLIDER_BUTTON_LEFT_VARIANTS[resolvedVariant] ?? SCROLLBAR_SLIDER_BUTTON_LEFT_VARIANTS['0']!;
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
            <ThemeImage
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

ScrollbarSliderButtonLeft.displayName = 'ScrollbarSliderButtonLeft';

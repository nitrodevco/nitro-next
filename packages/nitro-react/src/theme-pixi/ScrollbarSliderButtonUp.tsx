import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react';

import { useCascadedVariant } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { useInteractionState } from './utils/useInteractionState';
import { type SpriteFrame, useSpriteFrameTexture } from './utils/useSpriteFrameTexture';

interface ScrollbarSliderButtonUpVariant {
    textureKey: string;
    frames: { default: SpriteFrame, hovering: SpriteFrame, pressed: SpriteFrame, disabled: SpriteFrame };
}

/**
 * Full port of theme/ScrollbarSliderButtonUp.tsx's 3-variant table: a single 170x16
 * spritesheet packing default/active/aria-disabled frames per variant, 17x16px each.
 * Variants '0'/'1' have no `hover:` rule in DOM (hovering renders identically to default) -
 * modeled as static, repeating the default frame for the hovering state, same pattern as
 * CloseButton.tsx's variant '1'/'2'.
 */
const SCROLLBAR_SLIDER_BUTTON_UP_VARIANTS: Partial<Record<string, ScrollbarSliderButtonUpVariant>> = {
    '0': {
        textureKey: 'scrollbarsliderbuttonup-src',
        frames: {
            default: { x: 0, y: 0, width: 17, height: 16 },
            hovering: { x: 0, y: 0, width: 17, height: 16 },
            pressed: { x: 17, y: 0, width: 17, height: 16 },
            disabled: { x: 34, y: 0, width: 17, height: 16 },
        },
    },
    '1': {
        textureKey: 'scrollbarsliderbuttonup-src',
        frames: {
            default: { x: 51, y: 0, width: 17, height: 16 },
            hovering: { x: 51, y: 0, width: 17, height: 16 },
            pressed: { x: 68, y: 0, width: 17, height: 16 },
            disabled: { x: 85, y: 0, width: 17, height: 16 },
        },
    },
    '3': {
        textureKey: 'scrollbarsliderbuttonup-src',
        frames: {
            default: { x: 102, y: 0, width: 17, height: 16 },
            hovering: { x: 119, y: 0, width: 17, height: 16 },
            pressed: { x: 136, y: 0, width: 17, height: 16 },
            disabled: { x: 153, y: 0, width: 17, height: 16 },
        },
    },
};

export interface ScrollbarSliderButtonUpProps {
    variant?: string;
    defaultVariant?: string;
    /** Pixi equivalent of the DOM `aria-disabled` state - callers wire this from their own
     *  scroll controller (e.g. `!scroll.scrollable`), matching ScrollbarVertical/Horizontal. */
    disabled?: boolean;
    layout?: BoxLayout;
    onPointerDown?: () => void;
    onPointerUp?: () => void;
    onPointerUpOutside?: () => void;
}

/**
 * Pixi port of theme/ScrollbarSliderButtonUp.tsx. Purely a themed button skin - the
 * press-and-hold repeat-scroll behavior lives in the caller's `useHoldToRepeat`
 * (see ScrollbarVertical.tsx), spread in as `onPointerDown`/`onPointerUp`/`onPointerUpOutside`.
 */
export const ScrollbarSliderButtonUp: ForwardRefExoticComponent<ScrollbarSliderButtonUpProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderButtonUpProps>(
    ({ variant, defaultVariant, disabled, layout, onPointerDown, onPointerUp, onPointerUpOutside }, ref) => {
        const cascadedVariant = useCascadedVariant('scrollbarSliderButtonUp');
        const resolvedVariant = variant ?? cascadedVariant ?? defaultVariant ?? '0';
        const config = SCROLLBAR_SLIDER_BUTTON_UP_VARIANTS[resolvedVariant] ?? SCROLLBAR_SLIDER_BUTTON_UP_VARIANTS['0'];
        const { state, handlers } = useInteractionState(disabled);
        const frame = config && (
            state === 'pressed' ? config.frames.pressed
                : state === 'disabled' ? config.frames.disabled
                    : state === 'hovering' ? config.frames.hovering
                        : config.frames.default
        );
        const texture = useSpriteFrameTexture(config?.textureKey, frame);

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

        if (!texture) return null;

        return (
            <Box ref={ref} layout={{ width: texture.width, height: texture.height, ...layout }}>
                <pixiSprite
                    texture={texture}
                    width={texture.width}
                    height={texture.height}
                    eventMode={handlers.eventMode}
                    cursor={disabled ? undefined : 'pointer'}
                    layout={{}}
                    onPointerOver={handlers.onPointerOver}
                    onPointerOut={handlers.onPointerOut}
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerUpOutside={handlePointerUpOutside}
                />
            </Box>
        );
    }
);

ScrollbarSliderButtonUp.displayName = 'ScrollbarSliderButtonUp';

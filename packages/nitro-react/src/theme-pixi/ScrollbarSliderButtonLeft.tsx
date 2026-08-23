import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react';

import { Box, type BoxLayout } from './Box';
import { useInteractionState } from './utils/useInteractionState';
import { useResolvedVariant } from './utils/useResolvedVariant';
import { type SpriteFrame, useSpriteFrameTexture } from './utils/useSpriteFrameTexture';

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
        const config = SCROLLBAR_SLIDER_BUTTON_LEFT_VARIANTS[resolvedVariant] ?? SCROLLBAR_SLIDER_BUTTON_LEFT_VARIANTS['0'];
        const { state, handlers } = useInteractionState(disabled);
        const frame = config && (
            state === 'pressed'
                ? config.frames.pressed
                : state === 'disabled'
                    ? config.frames.disabled
                    : state === 'hovering'
                        ? config.frames.hovering
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
            <Box
                ref={ref}
                layout={{ width: texture.width, height: texture.height, ...layout }}
            >
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
    },
);

ScrollbarSliderButtonLeft.displayName = 'ScrollbarSliderButtonLeft';

import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

import { Box, BoxLayout } from './Box';
import { useInteractionState } from './utils/useInteractionState';
import { useResolvedVariant } from './utils/useResolvedVariant';
import { SpriteFrame, useSpriteFrameTexture } from './utils/useSpriteFrameTexture';

interface ScrollbarSliderButtonRightVariant {
    textureKey: string;
    frames: { default: SpriteFrame; hovering: SpriteFrame; pressed: SpriteFrame; disabled: SpriteFrame };
}

/**
 * Full port of theme/ScrollbarSliderButtonRight.tsx's 3-variant table: a 160x17 spritesheet,
 * every variant's frames a uniform 16x17px (unlike ScrollbarSliderButtonLeft.tsx, whose
 * variant '3' widens to 17px - confirmed from the exact `bg-position`/`bg-size` offsets, not
 * assumed symmetric with Left). Variants '0'/'1' have no `hover:` rule in DOM - modeled as
 * static, repeating the default frame for the hovering state.
 */
const SCROLLBAR_SLIDER_BUTTON_RIGHT_VARIANTS: Partial<Record<string, ScrollbarSliderButtonRightVariant>> = {
    0: {
        textureKey: 'scrollbarsliderbuttonright-src',
        frames: {
            default: { x: 0, y: 0, width: 16, height: 17 },
            hovering: { x: 0, y: 0, width: 16, height: 17 },
            pressed: { x: 16, y: 0, width: 16, height: 17 },
            disabled: { x: 32, y: 0, width: 16, height: 17 },
        },
    },
    1: {
        textureKey: 'scrollbarsliderbuttonright-src',
        frames: {
            default: { x: 48, y: 0, width: 16, height: 17 },
            hovering: { x: 48, y: 0, width: 16, height: 17 },
            pressed: { x: 64, y: 0, width: 16, height: 17 },
            disabled: { x: 80, y: 0, width: 16, height: 17 },
        },
    },
    3: {
        textureKey: 'scrollbarsliderbuttonright-src',
        frames: {
            default: { x: 96, y: 0, width: 16, height: 17 },
            hovering: { x: 112, y: 0, width: 16, height: 17 },
            pressed: { x: 128, y: 0, width: 16, height: 17 },
            disabled: { x: 144, y: 0, width: 16, height: 17 },
        },
    },
};

export interface ScrollbarSliderButtonRightProps {
    variant?: string;
    defaultVariant?: string;
    disabled?: boolean;
    layout?: BoxLayout;
    onPointerDown?: () => void;
    onPointerUp?: () => void;
    onPointerUpOutside?: () => void;
}

/**
 * Pixi port of theme/ScrollbarSliderButtonRight.tsx. Purely a themed button skin - the
 * press-and-hold repeat-scroll behavior lives in the caller's `useHoldToRepeat`
 * (see ScrollbarHorizontal.tsx), spread in as `onPointerDown`/`onPointerUp`/`onPointerUpOutside`.
 */
export const ScrollbarSliderButtonRight: ForwardRefExoticComponent<ScrollbarSliderButtonRightProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ScrollbarSliderButtonRightProps>(
    ({ variant, defaultVariant, disabled, layout, onPointerDown, onPointerUp, onPointerUpOutside }, ref) => {
        const { resolvedVariant } = useResolvedVariant('scrollbarSliderButtonRight', variant, defaultVariant);
        const config = SCROLLBAR_SLIDER_BUTTON_RIGHT_VARIANTS[resolvedVariant] ?? SCROLLBAR_SLIDER_BUTTON_RIGHT_VARIANTS['0'];
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

ScrollbarSliderButtonRight.displayName = 'ScrollbarSliderButtonRight';

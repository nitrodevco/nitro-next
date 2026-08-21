import './utils/pixiElements';

import type { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type RefAttributes } from 'react';

import { useCascadedVariant } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { useInteractionState } from './utils/useInteractionState';
import { type SpriteFrame, useSpriteFrameTexture } from './utils/useSpriteFrameTexture';

interface CloseButtonVariant {
    textureKey: string;
    frames: { default: SpriteFrame, hovering: SpriteFrame, pressed: SpriteFrame };
}

const CLOSE_BUTTON_VARIANTS: Partial<Record<string, CloseButtonVariant>> = {
    '0': {
        textureKey: 'closebutton-src',
        frames: {
            default: { x: 114, y: 0, width: 15, height: 15 },
            hovering: { x: 129, y: 0, width: 15, height: 15 },
            pressed: { x: 144, y: 0, width: 15, height: 15 },
        },
    },
    // DOM has no hover: rule and sets active: to the same background-position as the base -
    // model as static, repeating the default frame for hovering/pressed.
    '1': {
        textureKey: 'closebutton-src',
        frames: {
            default: { x: 159, y: 0, width: 15, height: 15 },
            hovering: { x: 159, y: 0, width: 15, height: 15 },
            pressed: { x: 159, y: 0, width: 15, height: 15 },
        },
    },
    '2': {
        textureKey: 'closebutton-src',
        frames: {
            default: { x: 174, y: 0, width: 15, height: 15 },
            hovering: { x: 174, y: 0, width: 15, height: 15 },
            pressed: { x: 174, y: 0, width: 15, height: 15 },
        },
    },
    '3': {
        textureKey: 'closebutton-src',
        frames: {
            default: { x: 0, y: 0, width: 19, height: 20 },
            hovering: { x: 19, y: 0, width: 19, height: 20 },
            pressed: { x: 38, y: 0, width: 19, height: 20 },
        },
    },
    '4': {
        textureKey: 'closebutton-src',
        frames: {
            default: { x: 57, y: 0, width: 19, height: 20 },
            hovering: { x: 76, y: 0, width: 19, height: 20 },
            pressed: { x: 95, y: 0, width: 19, height: 20 },
        },
    },
    // Separate, smaller texture - the whole texture is the frame, no hover/press states.
    '100': {
        textureKey: 'closebutton-100-src',
        frames: {
            default: { x: 0, y: 0, width: 20, height: 20 },
            hovering: { x: 0, y: 0, width: 20, height: 20 },
            pressed: { x: 0, y: 0, width: 20, height: 20 },
        },
    },
};

export interface CloseButtonProps {
    variant?: string;
    defaultVariant?: string;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const CloseButton: ForwardRefExoticComponent<CloseButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, CloseButtonProps>(
    ({ variant, defaultVariant, layout, onClose }, ref) => {
        const cascadedVariant = useCascadedVariant('closeButton');
        const resolvedVariant = variant ?? cascadedVariant ?? defaultVariant ?? '0';
        const config = CLOSE_BUTTON_VARIANTS[resolvedVariant];
        const { state, handlers } = useInteractionState();
        const frame = config
            ? (state === 'hovering' ? config.frames.hovering : state === 'pressed' ? config.frames.pressed : config.frames.default)
            : undefined;
        const texture = useSpriteFrameTexture(config?.textureKey, frame);

        const handlePointerDown = (event: FederatedPointerEvent) => {
            // Stops the click from also being seen by Header's onHeaderPointerDown (drag),
            // same effect as the DOM version's data-no-drag attribute.
            event.stopPropagation();
            handlers.onPointerDown?.();
        };

        if (!texture) return null;

        return (
            <Box ref={ref} layout={{ width: texture.width, height: texture.height, ...layout }}>
                <pixiSprite
                    texture={texture}
                    width={texture.width}
                    height={texture.height}
                    eventMode="static"
                    cursor="pointer"
                    layout={{}}
                    onPointerOver={handlers.onPointerOver}
                    onPointerOut={handlers.onPointerOut}
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlers.onPointerUp}
                    onPointerUpOutside={handlers.onPointerUpOutside}
                    onPointerTap={onClose}
                />
            </Box>
        );
    }
);

CloseButton.displayName = 'CloseButton';

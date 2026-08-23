import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, PointerEvent as ReactPointerEvent, RefAttributes } from 'react';

import { getRenderMode } from '#base/theme-core';

import { Box, BoxLayout } from './Box';
import { spriteFrameToStyle } from './dom/spriteFrameDom';
import { resolveByState, useInteractionState } from './utils/useInteractionState';
import { useResolvedVariant } from './utils/useResolvedVariant';
import {  SpriteFrame, useSpriteFrameTexture } from './utils/useSpriteFrameTexture';

interface CloseButtonVariant {
    textureKey: string;
    frames: { default: SpriteFrame; hovering: SpriteFrame; pressed: SpriteFrame };
}

const CLOSE_BUTTON_VARIANTS: Partial<Record<string, CloseButtonVariant>> = {
    0: {
        textureKey: 'closebutton-src',
        frames: {
            default: { x: 114, y: 0, width: 15, height: 15 },
            hovering: { x: 129, y: 0, width: 15, height: 15 },
            pressed: { x: 144, y: 0, width: 15, height: 15 },
        },
    },
    // DOM has no hover: rule and sets active: to the same background-position as the base -
    // model as static, repeating the default frame for hovering/pressed.
    1: {
        textureKey: 'closebutton-src',
        frames: {
            default: { x: 159, y: 0, width: 15, height: 15 },
            hovering: { x: 159, y: 0, width: 15, height: 15 },
            pressed: { x: 159, y: 0, width: 15, height: 15 },
        },
    },
    2: {
        textureKey: 'closebutton-src',
        frames: {
            default: { x: 174, y: 0, width: 15, height: 15 },
            hovering: { x: 174, y: 0, width: 15, height: 15 },
            pressed: { x: 174, y: 0, width: 15, height: 15 },
        },
    },
    3: {
        textureKey: 'closebutton-src',
        frames: {
            default: { x: 0, y: 0, width: 19, height: 20 },
            hovering: { x: 19, y: 0, width: 19, height: 20 },
            pressed: { x: 38, y: 0, width: 19, height: 20 },
        },
    },
    4: {
        textureKey: 'closebutton-src',
        frames: {
            default: { x: 57, y: 0, width: 19, height: 20 },
            hovering: { x: 76, y: 0, width: 19, height: 20 },
            pressed: { x: 95, y: 0, width: 19, height: 20 },
        },
    },
    // Separate, smaller texture - the whole texture is the frame, no hover/press states.
    100: {
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
        const { resolvedVariant } = useResolvedVariant('closeButton', variant, defaultVariant);
        const config = CLOSE_BUTTON_VARIANTS[resolvedVariant];
        const { state, handlers } = useInteractionState();
        const isDom = getRenderMode() === 'dom';
        const frame = config ? resolveByState(config.frames, state) : undefined;
        const texture = useSpriteFrameTexture(isDom ? undefined : config?.textureKey, isDom ? undefined : frame);

        // Stops the click from also being seen by Header's onHeaderPointerDown (drag), same
        // effect as the DOM version's data-no-drag attribute. `.stopPropagation()` exists on
        // both Pixi's FederatedPointerEvent and DOM's PointerEvent, so one handler covers both.
        const handlePointerDown = (event: FederatedPointerEvent | ReactPointerEvent) => {
            event.stopPropagation();
            handlers.onPointerDown?.();
        };

        if (isDom) {
            const style = frame ? spriteFrameToStyle(config?.textureKey, frame) : undefined;

            if (!style) return null;

            return (
                <Box
                    ref={ref}
                    layout={{ width: frame!.width, height: frame!.height, ...layout }}
                >
                    <div
                        style={{ ...style, cursor: 'pointer' }}
                        onPointerEnter={handlers.onPointerOver}
                        onPointerLeave={handlers.onPointerOut}
                        onPointerDown={handlePointerDown}
                        onPointerUp={handlers.onPointerUp}
                        onClick={onClose}
                    />
                </Box>
            );
        }

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
    },
);

CloseButton.displayName = 'CloseButton';

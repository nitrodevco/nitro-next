import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, PointerEvent as ReactPointerEvent, RefAttributes } from 'react';

import { BoxLayout } from './Box';
import { resolveByState, useInteractionState, useResolvedVariant } from './hooks';
import { ThemeImage } from './ThemeImage';
import { compose, PointerHandlerProps, SpriteFrame, THEME_URLS } from './utils';

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

export interface CloseButtonProps extends PointerHandlerProps {
    variant?: string;
    defaultVariant?: string;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const CloseButton: ForwardRefExoticComponent<CloseButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, CloseButtonProps>(
    ({
        variant, defaultVariant, layout, onClose,
        onPointerOver, onPointerOut, onPointerDown: onPointerDownProp, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { resolvedVariant } = useResolvedVariant('closeButton', variant, defaultVariant);
        const config = CLOSE_BUTTON_VARIANTS[resolvedVariant];

        // Stops the click from also being seen by Header's onHeaderPointerDown (drag), same
        // effect as the DOM version's data-no-drag attribute. `.stopPropagation()` exists on
        // both Pixi's FederatedPointerEvent and DOM's PointerEvent, so one handler covers both.
        // Passed into useInteractionState below rather than wrapping its own onPointerDown
        // afterward, so this composes with (rather than replaces) the hover/press tracking it
        // already owns.
        const stopPropagation = (event: FederatedPointerEvent | ReactPointerEvent) => event.stopPropagation();

        const { state, handlers } = useInteractionState({
            onPointerOver, onPointerOut, onPointerUp, onPointerUpOutside,
            onPointerDown: compose(stopPropagation, onPointerDownProp),
            onPointerTap: compose(onClose, onPointerTap),
        });

        if (!config) return null;

        const frame = resolveByState(config.frames, state);

        return (
            <ThemeImage
                ref={ref}
                src={THEME_URLS[config.textureKey]}
                frame={frame}
                cursor="pointer"
                {...handlers}
                layout={{ width: frame.width, height: frame.height, ...layout }}
            />
        );
    },
);

CloseButton.displayName = 'CloseButton';

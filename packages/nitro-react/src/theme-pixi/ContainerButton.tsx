import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { BUTTON_100_DEFAULT_OVERLAY, BUTTON_100_PRESSED_OVERLAY, BUTTON_CURVE_OVERLAY, BUTTON_CURVE_PRESSED_OVERLAY } from './utils/buttonOverlayPieces';
import { CompositeLayer, type CompositePiece, NineSliceLayer } from './utils/Layer';
import { type InteractionStates, type NineSliceLayerState, nineSliceLayerState, resolveByState, useInteractionState } from './utils/useInteractionState';
import { useResolvedVariant } from './utils/useResolvedVariant';
import { wrapTextChildren } from './utils/wrapTextChildren';

interface ContainerButtonVariant {
    states: InteractionStates<NineSliceLayerState>;
    overlay?: InteractionStates<CompositePiece[]>;
}

const layerState = nineSliceLayerState;

/**
 * Full port of theme/ContainerButton.tsx's 14-variant table. Unlike Border/Button/
 * ButtonThick, ContainerButton has no padding/min-size classes at all in DOM for any
 * variant - it's pure border chrome, entirely caller-sized via `layout`. Extensive
 * cross-component asset reuse (confirmed from the DOM source, not a guess): 0/1/2 reuse
 * Button's own `button-0-*`/`button-1-*` textures; 3/6 reuse ButtonThick's
 * `buttonthick-3-*`; 5 reuses variant 4's own `containerbutton-4-*` set; 100/101/102/103
 * reuse Button's `button-100-*`/`button-102-*`/`button-103-*` textures AND overlay pieces
 * verbatim (see utils/buttonOverlayPieces.ts). Variant '1's `pressed` state pointing at
 * `border-3-default-src` is the same real DOM quirk Button.tsx has, not a typo.
 */
const CONTAINER_BUTTON_VARIANTS: Record<string, ContainerButtonVariant> = {
    '0': {
        states: {
            default: layerState('button-0-default-src', 3, 3, 3, 3),
            hovering: layerState('button-0-hovering-src', 3, 3, 3, 3),
            pressed: layerState('button-0-pressed-src', 3, 3, 3, 3),
            disabled: layerState('button-0-disabled-src', 3, 3, 3, 3),
        },
    },
    '1': {
        states: {
            default: layerState('button-1-default-src', 3, 3, 3, 3),
            hovering: layerState('button-1-hovering-src', 3, 3, 3, 3),
            pressed: layerState('border-3-default-src', 3, 3, 3, 3),
            disabled: layerState('button-1-disabled-src', 3, 3, 3, 3),
        },
    },
    '2': {
        states: {
            default: layerState('button-0-default-src', 3, 3, 3, 3),
            hovering: layerState('button-0-hovering-src', 3, 3, 3, 3),
            pressed: layerState('button-0-pressed-src', 3, 3, 3, 3),
            disabled: layerState('button-0-disabled-src', 3, 3, 3, 3),
        },
    },
    '3': {
        states: {
            default: layerState('buttonthick-3-default-src', 5, 5, 5, 5),
            hovering: layerState('buttonthick-3-hovering-src', 5, 5, 5, 5),
            pressed: layerState('buttonthick-3-pressed-src', 5, 5, 5, 5),
            disabled: layerState('buttonthick-3-disabled-src', 5, 5, 5, 5),
        },
    },
    '4': {
        states: {
            default: layerState('containerbutton-4-default-src', 6, 6, 6, 7),
            hovering: layerState('containerbutton-4-hovering-src', 6, 6, 6, 7),
            pressed: layerState('containerbutton-4-pressed-src', 6, 6, 6, 7),
            disabled: layerState('containerbutton-4-disabled-src', 6, 6, 6, 7),
        },
    },
    '5': {
        states: {
            default: layerState('containerbutton-4-default-src', 6, 6, 6, 7),
            hovering: layerState('containerbutton-4-hovering-src', 6, 6, 6, 7),
            pressed: layerState('containerbutton-4-pressed-src', 6, 6, 6, 7),
            disabled: layerState('containerbutton-4-disabled-src', 6, 6, 6, 7),
        },
    },
    '6': {
        states: {
            default: layerState('buttonthick-3-default-src', 5, 5, 5, 5),
            hovering: layerState('buttonthick-3-hovering-src', 5, 5, 5, 5),
            pressed: layerState('buttonthick-3-pressed-src', 5, 5, 5, 5),
            disabled: layerState('buttonthick-3-disabled-src', 5, 5, 5, 5),
        },
    },
    '100': {
        states: {
            default: layerState('button-100-default-src', 1, 1, 1, 1),
            hovering: layerState('button-100-hovering-src', 19, 19, 19, 19),
            pressed: layerState('button-100-hovering-src', 19, 19, 19, 19),
        },
        overlay: { default: BUTTON_100_DEFAULT_OVERLAY, pressed: BUTTON_100_PRESSED_OVERLAY },
    },
    '101': {
        states: {
            default: layerState('button-100-default-src', 1, 1, 1, 1),
            hovering: layerState('button-100-hovering-src', 19, 19, 19, 19),
            pressed: layerState('button-100-hovering-src', 19, 19, 19, 19),
        },
        overlay: { default: BUTTON_100_DEFAULT_OVERLAY, pressed: BUTTON_100_PRESSED_OVERLAY },
    },
    '102': {
        states: {
            default: layerState('button-102-default-src', 6, 8, 4, 8),
            pressed: layerState('button-102-pressed-src', 6, 8, 4, 8),
        },
        overlay: { default: BUTTON_CURVE_OVERLAY, pressed: BUTTON_CURVE_PRESSED_OVERLAY },
    },
    '103': {
        states: {
            default: layerState('button-103-default-src', 6, 8, 4, 8),
            pressed: layerState('button-103-pressed-src', 6, 8, 4, 8),
        },
        overlay: { default: BUTTON_CURVE_OVERLAY, pressed: BUTTON_CURVE_PRESSED_OVERLAY },
    },
    '200': {
        states: {
            default: layerState('button-200-default-src', 4, 4, 4, 5),
        },
    },
};

const CONTAINER_BUTTON_TINT_COLORS: Partial<Record<string, string>> = {
    '6': '#00aa00',
    '101': '#bbbbbb',
};

export interface ContainerButtonProps {
    variant?: string;
    defaultVariant?: string;
    tintColor?: string;
    disabled?: boolean;
    layout?: BoxLayout;
    onPress?: () => void;
    children?: ReactNode;
}

/**
 * Pixi port of theme/ContainerButton.tsx - a generic pressable container (window chrome,
 * plain UI surfaces), not a labeled button. Note DOM's base class has no
 * `not-aria-disabled:` cursor guard the way Button/ButtonThick do (`cursor-pointer`
 * unconditionally) - preserved as-is rather than adding a disabled-cursor affordance DOM
 * doesn't have.
 */
export const ContainerButton: ForwardRefExoticComponent<ContainerButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ContainerButtonProps>(
    ({ variant, defaultVariant, tintColor, disabled, layout, onPress, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('containerButton', variant, defaultVariant);
        const config = CONTAINER_BUTTON_VARIANTS[resolvedVariant] ?? CONTAINER_BUTTON_VARIANTS['0'];
        const { state, handlers } = useInteractionState(disabled);
        const resolvedLayer = resolveByState(config.states, state);
        const resolvedOverlay = config.overlay && resolveByState(config.overlay, state);
        const resolvedTint = tintColor || CONTAINER_BUTTON_TINT_COLORS[resolvedVariant];

        return (
            <Box
                ref={ref}
                layout={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', ...layout }}
                {...handlers}
                cursor="pointer"
                onPointerTap={disabled ? undefined : onPress}
            >
                <NineSliceLayer
                    textureKey={resolvedLayer.textureKey}
                    leftWidth={resolvedLayer.leftWidth}
                    topHeight={resolvedLayer.topHeight}
                    rightWidth={resolvedLayer.rightWidth}
                    bottomHeight={resolvedLayer.bottomHeight}
                    tint={resolvedTint}
                />
                {resolvedOverlay && <CompositeLayer pieces={resolvedOverlay} />}
                <VariantCascadeProvider map={ownCascade}>{wrapTextChildren(children)}</VariantCascadeProvider>
            </Box>
        );
    }
);

ContainerButton.displayName = 'ContainerButton';

import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { BackgroundLayer, BackgroundLayerConfig, NineSlice } from './layer';
import { BUTTON_100_DEFAULT_OVERLAY, BUTTON_100_PRESSED_OVERLAY, BUTTON_CURVE_OVERLAY, BUTTON_CURVE_PRESSED_OVERLAY, InteractionStates, resolveByState, TextStyleKey, useInteractionState, useResolvedVariant, wrapTextChildren } from './utils';

interface ContainerButtonVariant {
    states: InteractionStates<BackgroundLayerConfig>;
    overlay?: InteractionStates<BackgroundLayerConfig>;
    tintColor?: string;
    textStyleKey?: TextStyleKey;
    color?: string;
    layout?: BoxLayout;
}

type ContainerButtonVariants = Record<string, ContainerButtonVariant>;

const CONTAINER_BUTTON_VARIANTS: ContainerButtonVariants = {
    '0': {
        states: {
            default: NineSlice('button-0-default-src', 3, 3, 3, 3),
            hovering: NineSlice('button-0-hovering-src', 3, 3, 3, 3),
            pressed: NineSlice('button-0-pressed-src', 3, 3, 3, 3),
            disabled: NineSlice('button-0-disabled-src', 3, 3, 3, 3),
        },
    },
    '1': {
        states: {
            default: NineSlice('button-1-default-src', 3, 3, 3, 3),
            hovering: NineSlice('button-1-hovering-src', 3, 3, 3, 3),
            pressed: NineSlice('border-3-default-src', 3, 3, 3, 3),
            disabled: NineSlice('button-1-disabled-src', 3, 3, 3, 3),
        },
    },
    '2': {
        states: {
            default: NineSlice('button-0-default-src', 3, 3, 3, 3),
            hovering: NineSlice('button-0-hovering-src', 3, 3, 3, 3),
            pressed: NineSlice('button-0-pressed-src', 3, 3, 3, 3),
            disabled: NineSlice('button-0-disabled-src', 3, 3, 3, 3),
        },
    },
    '3': {
        states: {
            default: NineSlice('buttonthick-3-default-src', 5, 5, 5, 5),
            hovering: NineSlice('buttonthick-3-hovering-src', 5, 5, 5, 5),
            pressed: NineSlice('buttonthick-3-pressed-src', 5, 5, 5, 5),
            disabled: NineSlice('buttonthick-3-disabled-src', 5, 5, 5, 5),
        },
    },
    '4': {
        states: {
            default: NineSlice('containerbutton-4-default-src', 6, 6, 6, 7),
            hovering: NineSlice('containerbutton-4-hovering-src', 6, 6, 6, 7),
            pressed: NineSlice('containerbutton-4-pressed-src', 6, 6, 6, 7),
            disabled: NineSlice('containerbutton-4-disabled-src', 6, 6, 6, 7),
        },
    },
    '5': {
        states: {
            default: NineSlice('containerbutton-4-default-src', 6, 6, 6, 7),
            hovering: NineSlice('containerbutton-4-hovering-src', 6, 6, 6, 7),
            pressed: NineSlice('containerbutton-4-pressed-src', 6, 6, 6, 7),
            disabled: NineSlice('containerbutton-4-disabled-src', 6, 6, 6, 7),
        },
    },
    '6': {
        states: {
            default: NineSlice('buttonthick-3-default-src', 5, 5, 5, 5),
            hovering: NineSlice('buttonthick-3-hovering-src', 5, 5, 5, 5),
            pressed: NineSlice('buttonthick-3-pressed-src', 5, 5, 5, 5),
            disabled: NineSlice('buttonthick-3-disabled-src', 5, 5, 5, 5),
        },
        tintColor: '#00aa00'
    },
    '100': {
        states: {
            default: NineSlice('button-100-default-src', 1, 1, 1, 1),
            hovering: NineSlice('button-100-hovering-src', 19, 19, 19, 19),
            pressed: NineSlice('button-100-hovering-src', 19, 19, 19, 19),
        },
        overlay: { default: BUTTON_100_DEFAULT_OVERLAY, pressed: BUTTON_100_PRESSED_OVERLAY },
    },
    '101': {
        states: {
            default: NineSlice('button-100-default-src', 1, 1, 1, 1),
            hovering: NineSlice('button-100-hovering-src', 19, 19, 19, 19),
            pressed: NineSlice('button-100-hovering-src', 19, 19, 19, 19),
        },
        overlay: { default: BUTTON_100_DEFAULT_OVERLAY, pressed: BUTTON_100_PRESSED_OVERLAY },
        tintColor: '#bbbbbb'
    },
    '102': {
        states: {
            default: NineSlice('button-102-default-src', 6, 8, 4, 8),
            pressed: NineSlice('button-102-pressed-src', 6, 8, 4, 8),
        },
        overlay: { default: BUTTON_CURVE_OVERLAY, pressed: BUTTON_CURVE_PRESSED_OVERLAY },
    },
    '103': {
        states: {
            default: NineSlice('button-103-default-src', 6, 8, 4, 8),
            pressed: NineSlice('button-103-pressed-src', 6, 8, 4, 8),
        },
        overlay: { default: BUTTON_CURVE_OVERLAY, pressed: BUTTON_CURVE_PRESSED_OVERLAY },
    },
    '200': {
        states: {
            default: NineSlice('button-200-default-src', 4, 4, 4, 5),
        },
    },
};

export interface ContainerButtonProps {
    variant?: keyof ContainerButtonVariants;
    defaultVariant?: keyof ContainerButtonVariants;
    tintColor?: string;
    disabled?: boolean;
    layout?: BoxLayout;
    onPress?: () => void;
    children?: ReactNode;
}

export const ContainerButton: ForwardRefExoticComponent<ContainerButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ContainerButtonProps>(
    ({ variant, defaultVariant, tintColor, disabled, layout, onPress, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('containerButton', variant, defaultVariant);
        const config = CONTAINER_BUTTON_VARIANTS[resolvedVariant] ?? CONTAINER_BUTTON_VARIANTS['0'];
        const { state, handlers } = useInteractionState(disabled);
        const resolvedLayer = resolveByState(config.states, state);
        const resolvedOverlay = config.overlay && resolveByState(config.overlay, state);
        const resolvedTint = tintColor || config.tintColor;

        return (
            <Box
                ref={ref}
                layout={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', ...layout }}
                {...handlers}
                cursor="pointer"
                onPointerTap={disabled ? undefined : onPress}
            >
                <BackgroundLayer layer={resolvedLayer} tintColor={resolvedTint} />
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                <VariantCascadeProvider map={ownCascade}>{wrapTextChildren(children)}</VariantCascadeProvider>
            </Box>
        );
    }
);

ContainerButton.displayName = 'ContainerButton';

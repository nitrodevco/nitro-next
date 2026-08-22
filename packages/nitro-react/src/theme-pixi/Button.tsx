import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { Text } from './Text';
import { BUTTON_100_DEFAULT_OVERLAY, BUTTON_100_PRESSED_OVERLAY, BUTTON_CURVE_OVERLAY, BUTTON_CURVE_PRESSED_OVERLAY } from './utils/buttonOverlayPieces';
import { CompositeLayer, type CompositePiece, NineSliceLayer } from './utils/Layer';
import { type TextStyleKey } from './utils/textStyles';
import { type InteractionStates, type NineSliceLayerState, nineSliceLayerState, resolveByState, useInteractionState } from './utils/useInteractionState';
import { useResolvedVariant } from './utils/useResolvedVariant';

/** DOM's button overlay divs only ever carry hover:/active: modifiers (never aria-disabled:),
 *  and hover is either identical to default (100/101) or simply absent (102/103) - so only
 *  `default`/`pressed` piece sets are ever populated, everything else falls back to `default`
 *  via `resolveByState`. */
interface ButtonVariant {
    states: InteractionStates<NineSliceLayerState>;
    overlay?: InteractionStates<CompositePiece[]>;
    paddingLeft: number;
    paddingTop: number;
    paddingRight: number;
    paddingBottom: number;
    minWidth?: number;
    minHeight?: number;
    /** False for '102'/'200', which (unlike every other variant) have no tintable-vars entry
     *  in DOM - their `tintColor` prop is a no-op there, preserved here by never resolving a
     *  tint for them regardless of what the caller passes. */
    tintable?: boolean;
    textStyleKey: TextStyleKey;
    color: string;
}

const layerState = nineSliceLayerState;

/**
 * Full port of theme/Button.tsx's 13-variant table (buttonVariantsConfig +
 * buttonOverlayVariantsConfig). Variant '1's `pressed` state deliberately points at
 * `border-3-default-src` (real DOM cross-component asset reuse, not a typo) rather than a
 * `button-1-pressed-src` that doesn't exist.
 */
const BUTTON_VARIANTS: Record<string, ButtonVariant> = {
    // default
    '0': {
        states: {
            default: layerState('button-0-default-src', 3, 3, 3, 3),
            hovering: layerState('button-0-hovering-src', 3, 3, 3, 3),
            pressed: layerState('button-0-pressed-src', 3, 3, 3, 3),
            disabled: layerState('button-0-disabled-src', 3, 3, 3, 3),
        },
        paddingLeft: 8, paddingTop: 8, paddingRight: 8, paddingBottom: 8,
        textStyleKey: 'text-style-button-regular', color: '#000000',
    },
    // black
    '1': {
        states: {
            default: layerState('button-1-default-src', 3, 3, 3, 3),
            hovering: layerState('button-1-hovering-src', 3, 3, 3, 3),
            pressed: layerState('border-3-default-src', 3, 3, 3, 3),
            disabled: layerState('button-1-disabled-src', 3, 3, 3, 3),
        },
        paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
        minWidth: 20, minHeight: 22,
        textStyleKey: 'text-style-button-regular', color: '#ffffff',
    },
    // white
    '2': {
        states: {
            default: layerState('button-0-default-src', 3, 3, 3, 3),
            hovering: layerState('button-0-hovering-src', 3, 3, 3, 3),
            pressed: layerState('button-0-pressed-src', 3, 3, 3, 3),
            disabled: layerState('button-0-disabled-src', 3, 3, 3, 3),
        },
        paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
        minWidth: 20, minHeight: 22,
        textStyleKey: 'text-style-button-regular', color: '#000000',
    },
    // default
    '3': {
        states: {
            default: layerState('button-3-default-src', 5, 5, 5, 5),
            hovering: layerState('button-3-hovering-src', 5, 5, 5, 5),
            pressed: layerState('button-3-pressed-src', 5, 5, 5, 5),
            disabled: layerState('button-3-disabled-src', 5, 5, 5, 5),
        },
        paddingLeft: 8, paddingTop: 2, paddingRight: 8, paddingBottom: 3,
        minWidth: 20, minHeight: 22,
        textStyleKey: 'text-style-button-shiny-regular', color: '#000000',
    },
    // black
    '4': {
        states: {
            default: layerState('button-4-default-src', 5, 5, 5, 5),
            hovering: layerState('button-4-hovering-src', 5, 5, 5, 5),
            pressed: layerState('button-4-pressed-src', 5, 5, 5, 5),
            disabled: layerState('button-4-disabled-src', 5, 5, 5, 5),
        },
        paddingLeft: 10, paddingTop: 5, paddingRight: 10, paddingBottom: 6,
        minWidth: 20, minHeight: 28,
        textStyleKey: 'text-style-button-shiny-regular', color: '#ffffff',
    },
    // white
    '5': {
        states: {
            default: layerState('button-3-default-src', 5, 5, 5, 5),
            hovering: layerState('button-3-hovering-src', 5, 5, 5, 5),
            pressed: layerState('button-3-pressed-src', 5, 5, 5, 5),
            disabled: layerState('button-3-disabled-src', 5, 5, 5, 5),
        },
        paddingLeft: 10, paddingTop: 5, paddingRight: 10, paddingBottom: 6,
        minWidth: 20, minHeight: 28,
        textStyleKey: 'text-style-button-shiny-regular', color: '#ffffff',
    },
    // green
    '6': {
        states: {
            default: layerState('button-3-default-src', 5, 5, 5, 5),
            hovering: layerState('button-3-hovering-src', 5, 5, 5, 5),
            pressed: layerState('button-3-pressed-src', 5, 5, 5, 5),
            disabled: layerState('button-3-disabled-src', 5, 5, 5, 5),
        },
        paddingLeft: 10, paddingTop: 5, paddingRight: 10, paddingBottom: 6,
        minWidth: 20, minHeight: 28,
        textStyleKey: 'text-style-button-shiny-regular', color: '#ffffff',
    },
    // landing view
    '100': {
        states: {
            default: layerState('button-100-default-src', 1, 1, 1, 1),
            hovering: layerState('button-100-hovering-src', 19, 19, 19, 19),
            pressed: layerState('button-100-hovering-src', 19, 19, 19, 19),
        },
        overlay: { default: BUTTON_100_DEFAULT_OVERLAY, pressed: BUTTON_100_PRESSED_OVERLAY },
        paddingLeft: 24, paddingTop: 14, paddingRight: 24, paddingBottom: 14,
        minWidth: 48, minHeight: 48,
        textStyleKey: 'text-style-il-button', color: '#000000',
    },
    // window
    '101': {
        states: {
            default: layerState('button-100-default-src', 1, 1, 1, 1),
            hovering: layerState('button-100-hovering-src', 19, 19, 19, 19),
            pressed: layerState('button-100-hovering-src', 19, 19, 19, 19),
        },
        overlay: { default: BUTTON_100_DEFAULT_OVERLAY, pressed: BUTTON_100_PRESSED_OVERLAY },
        paddingLeft: 24, paddingTop: 14, paddingRight: 24, paddingBottom: 14,
        minWidth: 48, minHeight: 48,
        textStyleKey: 'text-style-il-button', color: '#000000',
    },
    // plain
    '102': {
        states: {
            default: layerState('button-102-default-src', 6, 8, 4, 8),
            pressed: layerState('button-102-pressed-src', 6, 8, 4, 8),
        },
        overlay: { default: BUTTON_CURVE_OVERLAY, pressed: BUTTON_CURVE_PRESSED_OVERLAY },
        paddingLeft: 13, paddingTop: 3, paddingRight: 13, paddingBottom: 3,
        minWidth: 28, minHeight: 28,
        tintable: false,
        textStyleKey: 'text-style-il-button', color: '#000000',
    },
    // unetched
    '103': {
        states: {
            default: layerState('button-103-default-src', 6, 8, 4, 8),
            pressed: layerState('button-103-pressed-src', 6, 8, 4, 8),
        },
        overlay: { default: BUTTON_CURVE_OVERLAY, pressed: BUTTON_CURVE_PRESSED_OVERLAY },
        paddingLeft: 13, paddingTop: 3, paddingRight: 13, paddingBottom: 3,
        minWidth: 28, minHeight: 28,
        textStyleKey: 'text-style-il-button', color: '#000000',
    },
    // default
    '200': {
        states: {
            default: layerState('button-200-default-src', 4, 4, 4, 5),
        },
        paddingLeft: 13, paddingTop: 3, paddingRight: 13, paddingBottom: 3,
        minWidth: 28, minHeight: 28,
        tintable: false,
        textStyleKey: 'text-style-id-button', color: '#000000',
    },
    // borderless
    '300': {
        states: {
            default: layerState('button-300-default-src', 3, 3, 3, 3),
            hovering: layerState('button-300-hovering-src', 3, 3, 3, 3),
            pressed: layerState('button-300-pressed-src', 3, 3, 3, 3),
            disabled: layerState('button-300-disabled-src', 3, 3, 3, 3),
        },
        paddingLeft: 8, paddingTop: 2, paddingRight: 8, paddingBottom: 3,
        minWidth: 20, minHeight: 22,
        textStyleKey: 'text-style-button-shiny-regular', color: '#000000',
    },
};

const BUTTON_TINT_COLORS: Partial<Record<string, string>> = {
    '6': '#00aa00',
    '101': '#bbbbbb',
};

export interface ButtonProps {
    variant?: string;
    defaultVariant?: string;
    tintColor?: string;
    textColor?: string;
    disabled?: boolean;
    layout?: BoxLayout;
    onPress?: () => void;
    children?: ReactNode;
}

export const Button: ForwardRefExoticComponent<ButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ButtonProps>(
    ({ variant, defaultVariant, tintColor, textColor, disabled, layout, onPress, children }, ref) => {
        const { resolvedVariant, ownCascade } = useResolvedVariant('button', variant, defaultVariant);
        const config = BUTTON_VARIANTS[resolvedVariant] ?? BUTTON_VARIANTS['0'];
        const { state, handlers } = useInteractionState(disabled);
        const resolvedLayer = resolveByState(config.states, state);
        const resolvedOverlay = config.overlay && resolveByState(config.overlay, state);
        const resolvedTint = config.tintable === false ? undefined : (tintColor || BUTTON_TINT_COLORS[resolvedVariant]);
        const resolvedTextColor = textColor ?? config.color;

        return (
            <Box
                ref={ref}
                layout={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: config.paddingLeft,
                    paddingTop: config.paddingTop,
                    paddingRight: config.paddingRight,
                    paddingBottom: config.paddingBottom,
                    minWidth: config.minWidth,
                    minHeight: config.minHeight,
                    ...layout,
                }}
                {...handlers}
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
                <VariantCascadeProvider map={ownCascade}>
                    {typeof children === 'string'
                        ? <Text text={children} textStyle={config.textStyleKey} textOptions={{ fill: resolvedTextColor }} />
                        : children}
                </VariantCascadeProvider>
            </Box>
        );
    }
);

Button.displayName = 'Button';

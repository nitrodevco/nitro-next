import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { useCascadedVariant, VARIANT_CASCADE_CONFIG, VariantCascadeProvider } from '#base/theme';

import { Box, type BoxLayout } from './Box';
import { CompositeLayer, type CompositePiece, NineSliceLayer } from './utils/Layer';
import { getPixiTextStyle, type TextStyleKey } from './utils/textStyles';
import { type InteractionState,useInteractionState } from './utils/useInteractionState';

interface ButtonLayerState {
    textureKey: string;
    leftWidth: number;
    topHeight: number;
    rightWidth: number;
    bottomHeight: number;
}

interface ButtonStates {
    default: ButtonLayerState;
    hovering?: ButtonLayerState;
    pressed?: ButtonLayerState;
    disabled?: ButtonLayerState;
}

/** DOM's button overlay divs only ever carry hover:/active: modifiers (never aria-disabled:),
 *  and hover is either identical to default (100/101) or simply absent (102/103) - so only
 *  `default`/`pressed` piece sets are needed, everything else falls back to `default`. */
interface ButtonOverlayStates {
    default: CompositePiece[];
    pressed?: CompositePiece[];
}

interface ButtonVariant {
    states: ButtonStates;
    overlay?: ButtonOverlayStates;
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

const layerState = (textureKey: string, leftWidth: number, topHeight: number, rightWidth: number, bottomHeight: number): ButtonLayerState => (
    { textureKey, leftWidth, topHeight, rightWidth, bottomHeight }
);

// Full 11-piece button-piece composite shared by variants 100/101, default+hovering state.
const buttonPieces = (prefix: string): CompositePiece[] => [
    { textureKey: `${prefix}-top-left-src`, top: 11, left: 11, width: 6, height: 8 },
    { textureKey: `${prefix}-top-center-src`, top: 11, left: 17, right: 15, height: 8 },
    { textureKey: `${prefix}-top-right-src`, top: 11, right: 11, width: 4, height: 8 },
    { textureKey: `${prefix}-center-left-src`, top: 19, left: 11, bottom: 19, width: 6 },
    { textureKey: `${prefix}-center-center-src`, top: 19, left: 17, right: 15, bottom: 19 },
    { textureKey: `${prefix}-center-right-src`, top: 19, right: 11, bottom: 19, width: 4 },
    { textureKey: `${prefix}-bottom-left-src`, bottom: 11, left: 11, width: 6, height: 8 },
    { textureKey: `${prefix}-bottom-center-src`, bottom: 11, left: 17, right: 15, height: 8 },
    { textureKey: `${prefix}-bottom-right-src`, bottom: 11, right: 11, width: 4, height: 8 },
    // Curve pieces are DOM `background-position: ... center` - left/right unset on the cross
    // axis so Button's own Box `alignItems: 'center'` (flexDirection 'row') centers them
    // vertically, the same "unset edge = not anchored" convention CompositePiece already uses
    // for stretch, extended here to centering via the parent's own cross-axis alignment.
    { textureKey: 'button-100-default-button-center-left-curve-src', left: 12, width: 3, height: 5 },
    { textureKey: 'button-100-default-button-center-right-curve-src', right: 12, width: 3, height: 5 },
];

const buttonDefaultOverlay = buttonPieces('button-100-default-button');
const buttonPressedOverlay: CompositePiece[] = [
    ...buttonPieces('button-100-pressed-button').slice(0, 9),
    { textureKey: 'bubble-0-default-spacer-src', left: 12, width: 1, height: 1 },
    { textureKey: 'bubble-0-default-spacer-src', right: 12, width: 1, height: 1 },
];

// 2-piece curve composite shared by variants 102/103.
const curveOverlay: CompositePiece[] = [
    { textureKey: 'button-100-default-button-center-left-curve-src', left: 1, width: 3, height: 5 },
    { textureKey: 'button-100-default-button-center-right-curve-src', right: 1, width: 3, height: 5 },
];
const curvePressedOverlay: CompositePiece[] = [
    { textureKey: 'bubble-0-default-spacer-src', left: 1, width: 1, height: 1 },
    { textureKey: 'bubble-0-default-spacer-src', right: 1, width: 1, height: 1 },
];

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
        overlay: { default: buttonDefaultOverlay, pressed: buttonPressedOverlay },
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
        overlay: { default: buttonDefaultOverlay, pressed: buttonPressedOverlay },
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
        overlay: { default: curveOverlay, pressed: curvePressedOverlay },
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
        overlay: { default: curveOverlay, pressed: curvePressedOverlay },
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

const resolveLayerState = (states: ButtonStates, state: InteractionState): ButtonLayerState => (
    (state === 'hovering' && states.hovering)
    || (state === 'pressed' && states.pressed)
    || (state === 'disabled' && states.disabled)
    || states.default
);

const resolveOverlayPieces = (overlay: ButtonOverlayStates | undefined, state: InteractionState): CompositePiece[] | undefined => {
    if (!overlay) return undefined;

    return (state === 'pressed' && overlay.pressed) || overlay.default;
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
        const cascadedVariant = useCascadedVariant('button');
        const resolvedVariant = variant ?? cascadedVariant ?? defaultVariant ?? '0';
        const ownCascade = VARIANT_CASCADE_CONFIG['button']?.[resolvedVariant];
        const config = BUTTON_VARIANTS[resolvedVariant] ?? BUTTON_VARIANTS['0'];
        const { state, handlers } = useInteractionState(disabled);
        const resolvedLayer = resolveLayerState(config.states, state);
        const resolvedOverlay = resolveOverlayPieces(config.overlay, state);
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
                        ? <pixiText layout={{}} text={children} style={getPixiTextStyle(config.textStyleKey, { fill: resolvedTextColor })} />
                        : children}
                </VariantCascadeProvider>
            </Box>
        );
    }
);

Button.displayName = 'Button';

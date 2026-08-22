import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme';

import { Box } from './Box';
import { BackgroundLayer, NineSlice } from './layer';
import { Text } from './Text';
import { BUTTON_100_DEFAULT_OVERLAY, BUTTON_100_PRESSED_OVERLAY, BUTTON_CURVE_OVERLAY, BUTTON_CURVE_PRESSED_OVERLAY, useThemeVariant, wrapTextChildren } from './utils';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant } from './variant';

type ButtonVariant = ThemeWithStatesVariant;

const BUTTON_VARIANTS: ThemeVariants<ButtonVariant> = {
    // default
    '0': {
        states: {
            default: NineSlice('button-0-default-src', 3, 3, 3, 3),
            hovering: NineSlice('button-0-hovering-src', 3, 3, 3, 3),
            pressed: NineSlice('button-0-pressed-src', 3, 3, 3, 3),
            disabled: NineSlice('button-0-disabled-src', 3, 3, 3, 3),
        },
        layout: {
            padding: 8
        },
        textStyleKey: 'text-style-button-regular', textColor: '#000000',
    },
    // black
    '1': {
        states: {
            default: NineSlice('button-1-default-src', 3, 3, 3, 3),
            hovering: NineSlice('button-1-hovering-src', 3, 3, 3, 3),
            pressed: NineSlice('border-3-default-src', 3, 3, 3, 3),
            disabled: NineSlice('button-1-disabled-src', 3, 3, 3, 3),
        },
        layout: {
            paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
        textStyleKey: 'text-style-button-regular', textColor: '#ffffff',
    },
    // white
    '2': {
        states: {
            default: NineSlice('button-0-default-src', 3, 3, 3, 3),
            hovering: NineSlice('button-0-hovering-src', 3, 3, 3, 3),
            pressed: NineSlice('button-0-pressed-src', 3, 3, 3, 3),
            disabled: NineSlice('button-0-disabled-src', 3, 3, 3, 3),
        },
        layout: {
            paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22
        },
        textStyleKey: 'text-style-button-regular', textColor: '#000000',
    },
    // default
    '3': {
        states: {
            default: NineSlice('button-3-default-src', 5, 5, 5, 5),
            hovering: NineSlice('button-3-hovering-src', 5, 5, 5, 5),
            pressed: NineSlice('button-3-pressed-src', 5, 5, 5, 5),
            disabled: NineSlice('button-3-disabled-src', 5, 5, 5, 5),
        },
        layout: {
            paddingLeft: 8, paddingTop: 2, paddingRight: 8, paddingBottom: 3,
            minWidth: 20, minHeight: 22
        },
        textStyleKey: 'text-style-button-shiny-regular', textColor: '#000000',
    },
    // black
    '4': {
        states: {
            default: NineSlice('button-4-default-src', 5, 5, 5, 5),
            hovering: NineSlice('button-4-hovering-src', 5, 5, 5, 5),
            pressed: NineSlice('button-4-pressed-src', 5, 5, 5, 5),
            disabled: NineSlice('button-4-disabled-src', 5, 5, 5, 5),
        },
        layout: {
            paddingLeft: 10, paddingTop: 5, paddingRight: 10, paddingBottom: 6,
            minWidth: 20, minHeight: 28
        },
        textStyleKey: 'text-style-button-shiny-regular', textColor: '#ffffff',
    },
    // white
    '5': {
        states: {
            default: NineSlice('button-3-default-src', 5, 5, 5, 5),
            hovering: NineSlice('button-3-hovering-src', 5, 5, 5, 5),
            pressed: NineSlice('button-3-pressed-src', 5, 5, 5, 5),
            disabled: NineSlice('button-3-disabled-src', 5, 5, 5, 5),
        },
        layout: {
            paddingLeft: 10, paddingTop: 5, paddingRight: 10, paddingBottom: 6,
            minWidth: 20, minHeight: 28
        },
        textStyleKey: 'text-style-button-shiny-regular', textColor: '#ffffff',
    },
    // green
    '6': {
        states: {
            default: NineSlice('button-3-default-src', 5, 5, 5, 5),
            hovering: NineSlice('button-3-hovering-src', 5, 5, 5, 5),
            pressed: NineSlice('button-3-pressed-src', 5, 5, 5, 5),
            disabled: NineSlice('button-3-disabled-src', 5, 5, 5, 5),
        },
        layout: {
            paddingLeft: 10, paddingTop: 5, paddingRight: 10, paddingBottom: 6,
            minWidth: 20, minHeight: 28
        },
        textStyleKey: 'text-style-button-shiny-regular', textColor: '#ffffff', tintColor: '#00aa00'
    },
    // landing view
    '100': {
        states: {
            default: NineSlice('button-100-default-src', 1, 1, 1, 1),
            hovering: NineSlice('button-100-hovering-src', 19, 19, 19, 19),
            pressed: NineSlice('button-100-hovering-src', 19, 19, 19, 19),
        },
        overlays: { default: BUTTON_100_DEFAULT_OVERLAY, pressed: BUTTON_100_PRESSED_OVERLAY },
        layout: {
            paddingLeft: 24, paddingTop: 14, paddingRight: 24, paddingBottom: 14,
            minWidth: 48, minHeight: 48
        },
        textStyleKey: 'text-style-il-button', textColor: '#000000',
    },
    // window
    '101': {
        states: {
            default: NineSlice('button-100-default-src', 1, 1, 1, 1),
            hovering: NineSlice('button-100-hovering-src', 19, 19, 19, 19),
            pressed: NineSlice('button-100-hovering-src', 19, 19, 19, 19),
        },
        overlays: { default: BUTTON_100_DEFAULT_OVERLAY, pressed: BUTTON_100_PRESSED_OVERLAY },
        layout: {
            paddingLeft: 24, paddingTop: 14, paddingRight: 24, paddingBottom: 14,
            minWidth: 48, minHeight: 48
        },
        textStyleKey: 'text-style-il-button', textColor: '#000000', tintColor: '#bbbbbb'
    },
    // plain
    '102': {
        states: {
            default: NineSlice('button-102-default-src', 6, 8, 4, 8),
            pressed: NineSlice('button-102-pressed-src', 6, 8, 4, 8),
        },
        overlays: { default: BUTTON_CURVE_OVERLAY, pressed: BUTTON_CURVE_PRESSED_OVERLAY },
        layout: {
            paddingLeft: 13, paddingTop: 3, paddingRight: 13, paddingBottom: 3,
            minWidth: 28, minHeight: 28
        },
        textStyleKey: 'text-style-il-button', textColor: '#000000',
    },
    // unetched
    '103': {
        states: {
            default: NineSlice('button-103-default-src', 6, 8, 4, 8),
            pressed: NineSlice('button-103-pressed-src', 6, 8, 4, 8),
        },
        overlays: { default: BUTTON_CURVE_OVERLAY, pressed: BUTTON_CURVE_PRESSED_OVERLAY },
        layout: {
            paddingLeft: 13, paddingTop: 3, paddingRight: 13, paddingBottom: 3,
            minWidth: 28, minHeight: 28
        },
        textStyleKey: 'text-style-il-button', textColor: '#000000',
    },
    // default
    '200': {
        states: {
            default: NineSlice('button-200-default-src', 4, 4, 4, 5),
        },
        layout: {
            paddingLeft: 13, paddingTop: 3, paddingRight: 13, paddingBottom: 3,
            minWidth: 28, minHeight: 28
        },
        textStyleKey: 'text-style-id-button', textColor: '#000000',
    },
    // borderless
    '300': {
        states: {
            default: NineSlice('button-300-default-src', 3, 3, 3, 3),
            hovering: NineSlice('button-300-hovering-src', 3, 3, 3, 3),
            pressed: NineSlice('button-300-pressed-src', 3, 3, 3, 3),
            disabled: NineSlice('button-300-disabled-src', 3, 3, 3, 3),
        },
        layout: {
            paddingLeft: 8, paddingTop: 2, paddingRight: 8, paddingBottom: 3,
            minWidth: 20, minHeight: 22
        },
        textStyleKey: 'text-style-button-shiny-regular', textColor: '#000000',
    },
};

export interface ButtonProps extends ThemeProps<ButtonVariant> {
    disabled?: boolean;
    onPress?: () => void;
    children?: ReactNode;
}

export const Button: ForwardRefExoticComponent<ButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ButtonProps>(
    ({ variant, defaultVariant, tintColor, textColor, disabled, layout, onPress, children }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'button', variants: BUTTON_VARIANTS, variant, defaultVariant, tintColor, textColor, disabled,
        });

        return (
            <Box
                ref={ref}
                layout={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...config.layout,
                    ...layout,
                }}
                {...handlers}
                onPointerTap={disabled ? undefined : onPress}
            >
                <BackgroundLayer layer={resolvedLayer} tintColor={resolvedTint} />
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                <VariantCascadeProvider map={ownCascade}>
                    {typeof children === 'string'
                        ? <Text text={children} textStyle={config.textStyleKey} textOptions={{ fill: resolvedTextColor }} />
                        : wrapTextChildren(children)}
                </VariantCascadeProvider>
            </Box>
        );
    }
);

Button.displayName = 'Button';

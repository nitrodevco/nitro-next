import './utils/pixiElements';

import type { Container as PixiContainer } from 'pixi.js';
import { forwardRef, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';

import { VariantCascadeProvider } from '#base/theme-core';

import { Box } from './Box';
import { BackgroundLayer, NineSlice, Stretch } from './layer';
import { useThemeVariant, wrapTextChildren } from './utils';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant } from './variant';

type ButtonThickVariant = ThemeWithStatesVariant;

const BUTTON_THICK_VARIANTS: ThemeVariants<ButtonThickVariant> = {
    0: {
        states: {
            default: Stretch('buttonthick-0-default-src'),
            hovering: Stretch('buttonthick-0-hovering-src'),
            pressed: Stretch('buttonthick-0-pressed-src'),
            disabled: Stretch('buttonthick-0-disabled-src'),
        },
        layout: {
            paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4, minWidth: 8, minHeight: 23,
        },
        textStyle: 'text-style-button-bold', textColor: '#000000',
    },
    1: {
        states: {
            default: Stretch('buttonthick-1-default-src'),
            hovering: Stretch('buttonthick-1-hovering-src'),
            pressed: Stretch('buttonthick-1-pressed-src'),
            disabled: Stretch('buttonthick-1-disabled-src'),
        },
        layout: {
            paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4, minWidth: 8, minHeight: 23,
        },
        textStyle: 'text-style-button-bold', textColor: '#FFFFFF',
    },
    2: {
        states: {
            default: Stretch('buttonthick-0-default-src'),
            hovering: Stretch('buttonthick-0-hovering-src'),
            pressed: Stretch('buttonthick-0-pressed-src'),
            disabled: Stretch('buttonthick-0-disabled-src'),
        },
        layout: {
            paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4, minWidth: 8, minHeight: 23,
        },
        textStyle: 'text-style-button-bold', textColor: '#000000',
    },
    3: {
        states: {
            default: NineSlice('buttonthick-3-default-src', 5, 5, 5, 5),
            hovering: NineSlice('buttonthick-3-hovering-src', 5, 5, 5, 5),
            pressed: NineSlice('buttonthick-3-pressed-src', 5, 5, 5, 5),
            disabled: NineSlice('buttonthick-3-disabled-src', 5, 5, 5, 5),
        },
        layout: {
            paddingLeft: 10, paddingTop: 2, paddingRight: 10, paddingBottom: 3, minWidth: 20, minHeight: 22,
        },
        textStyle: 'text-style-button-shiny-bold', textColor: '#000000',
    },
    4: {
        states: {
            default: NineSlice('buttonthick-4-default-src', 5, 5, 5, 5),
            hovering: NineSlice('buttonthick-4-hovering-src', 5, 5, 5, 5),
            pressed: NineSlice('buttonthick-4-pressed-src', 5, 5, 5, 5),
            disabled: NineSlice('buttonthick-4-disabled-src', 5, 5, 5, 5),
        },
        layout: {
            paddingLeft: 10, paddingTop: 5, paddingRight: 10, paddingBottom: 6, minWidth: 20, minHeight: 28,
        },
        textStyle: 'text-style-button-shiny-bold', textColor: '#FFFFFF',
    },
    5: {
        states: {
            default: NineSlice('buttonthick-3-default-src', 5, 5, 5, 5),
            hovering: NineSlice('buttonthick-3-hovering-src', 5, 5, 5, 5),
            pressed: NineSlice('buttonthick-3-pressed-src', 5, 5, 5, 5),
            disabled: NineSlice('buttonthick-3-disabled-src', 5, 5, 5, 5),
        },
        layout: {
            paddingLeft: 10, paddingTop: 5, paddingRight: 10, paddingBottom: 6, minWidth: 20, minHeight: 28,
        },
        textStyle: 'text-style-button-shiny-bold', textColor: '#FFFFFF',
    },
    6: {
        states: {
            default: NineSlice('buttonthick-3-default-src', 5, 5, 5, 5),
            hovering: NineSlice('buttonthick-3-hovering-src', 5, 5, 5, 5),
            pressed: NineSlice('buttonthick-3-pressed-src', 5, 5, 5, 5),
            disabled: NineSlice('buttonthick-3-disabled-src', 5, 5, 5, 5),
        },
        layout: {
            paddingLeft: 10, paddingTop: 5, paddingRight: 10, paddingBottom: 6, minWidth: 20, minHeight: 28,
        },
        tintColor: '#00aa00',
        textStyle: 'text-style-button-shiny-bold', textColor: '#FFFFFF',
    },
};

export interface ButtonThickProps extends ThemeProps<ButtonThickVariant> {
    disabled?: boolean;
    selected?: boolean;
    onPress?: () => void;
    children?: ReactNode;
}

export const ButtonThick: ForwardRefExoticComponent<ButtonThickProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ButtonThickProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, disabled, selected, onPress, children }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'buttonThick', variants: BUTTON_THICK_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, disabled, selected,
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
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

ButtonThick.displayName = 'ButtonThick';

import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, Stretch } from './layer';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant, wrapTextChildren } from './utils';

type CheckBoxVariant = ThemeWithStatesVariant;

const CHECK_BOX_0_VARIANT: CheckBoxVariant = {
    states: {
        default: Stretch('checkbox-src', { x: 0, y: 0, width: 15, height: 15 }),
        selected: Stretch('checkbox-src', { x: 15, y: 0, width: 15, height: 15 }),
    },
    layout: {
        width: 15,
        height: 15,
        padding: 0,
    },
};

const CHECK_BOX_VARIANTS: ThemeVariants<CheckBoxVariant> = {
    0: CHECK_BOX_0_VARIANT,
    1: {
        states: {
            default: Stretch('checkbox-src', { x: 30, y: 0, width: 15, height: 15 }),
            selected: Stretch('checkbox-src', { x: 45, y: 0, width: 15, height: 15 }),
        },
        layout: {
            width: 15,
            height: 15,
            padding: 0,
        },
    },
    2: CHECK_BOX_0_VARIANT,
    100: {
        states: {
            default: Stretch('checkbox-100-default-src'),
            selected: Stretch('checkbox-100-selected-src'),
        },
        layout: {
            width: 38,
            height: 21,
            paddingLeft: 42,
            paddingTop: 4,
            paddingBottom: 4,
        },
        textStyle: 'text-style-il-button',
        textColor: '#000000',
    },
    101: {
        states: {
            default: Stretch('checkbox-101-default-src'),
            selected: Stretch('checkbox-101-selected-src'),
        },
        layout: {
            width: 19,
            height: 20,
            paddingLeft: 23,
            paddingTop: 4,
            paddingBottom: 4,
        },
        textStyle: 'text-style-il-button',
        textColor: '#000000',
    },
};

export interface CheckBoxProps extends ThemeProps<CheckBoxVariant> {
    disabled?: boolean;
    selected?: boolean;
    children?: ReactNode;
}

export const CheckBox: ForwardRefExoticComponent<CheckBoxProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, CheckBoxProps>(
    ({ variant, defaultVariant, layout, tintColor, textStyle, textColor, visible, disabled, selected, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'checkBox', variants: CHECK_BOX_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, disabled, selected,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
                visible={visible}
                layout={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    ...config.layout,
                    ...layout,
                }}
                {...handlers}
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

CheckBox.displayName = 'CheckBox';

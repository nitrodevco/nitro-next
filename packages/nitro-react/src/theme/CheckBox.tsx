import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, Stretch } from './layer';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant, wrapTextChildren } from './utils';

export type CheckBoxVariant = ThemeWithStatesVariant;

/** The three classic checkbox skins are one 15x15 bitmap per state, so only their art differs. */
const habboCheckBox = (style: '0' | '1' | '2'): CheckBoxVariant => ({
    states: {
        default: Stretch(`checkbox-${style}-default-src`),
        selected: Stretch(`checkbox-${style}-selected-src`),
    },
    layout: {
        width: 15,
        height: 15,
        padding: 0,
    },
});

/** `CheckBox` variants - the `type="checkbox"` rows of `habbo_element_description_xml`, keyed by their `style`. */
const CHECK_BOX_VARIANTS: ThemeVariants<CheckBoxVariant> = {
    0: habboCheckBox('0'),
    1: habboCheckBox('1'),
    2: habboCheckBox('2'),
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
    },
};

export interface CheckBoxProps extends ThemeProps<CheckBoxVariant> {
    disabled?: boolean;
    selected?: boolean;
    children?: ReactNode;
}

export const CheckBox: ForwardRefExoticComponent<CheckBoxProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, CheckBoxProps>(
    ({ variant, defaultVariant, tooltip, layout, tintColor, textStyle, textColor, visible, disabled, selected, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'checkBox', variants: CHECK_BOX_VARIANTS, variant, defaultVariant, tooltip, tintColor, textStyle, textColor, disabled, selected,
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

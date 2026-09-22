import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box, BoxLayout } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, Stretch } from './layer';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant, wrapTextChildren } from './utils';

export type CheckBoxVariant = ThemeWithStatesVariant;

/**
 * The three classic checkbox skins are one 15x15 bitmap per state, so only their art differs.
 * Every checkbox skin maps `pressed` onto its unticked template, and `pressed` outranks `selected`
 * (`SkinContainer.getTheActualState`), so a box shows unticked while it is held.
 */
const habboCheckBox = (style: '0' | '1' | '2'): CheckBoxVariant => ({
    states: {
        default: Stretch(`checkbox-${style}-default-src`),
        pressed: Stretch(`checkbox-${style}-default-src`),
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
            pressed: Stretch('checkbox-100-default-src'),
            selected: Stretch('checkbox-100-selected-src'),
        },
        layout: {
            width: 38,
            height: 21,
            paddingLeft: 42,
            paddingTop: 4,
            paddingBottom: 4,
        },
        textStyle: 'il_button',
    },
    101: {
        states: {
            default: Stretch('checkbox-101-default-src'),
            pressed: Stretch('checkbox-101-default-src'),
            selected: Stretch('checkbox-101-selected-src'),
        },
        layout: {
            width: 19,
            height: 20,
            paddingLeft: 23,
            paddingTop: 4,
            paddingBottom: 4,
        },
        textStyle: 'il_button',
    },
};

export interface CheckBoxProps extends ThemeProps<CheckBoxVariant> {
    disabled?: boolean;
    selected?: boolean;
    /**
     * The window's `blend` (`WindowController.blend`): the opacity its graphic context is drawn
     * with, clamped to 0..1 as the setter does, covering the art and the label alike.
     */
    alpha?: number;
    children?: ReactNode;
}

export const CheckBox: ForwardRefExoticComponent<CheckBoxProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, CheckBoxProps>(
    ({ variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, disabled, selected, alpha, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'checkBox', variants: CHECK_BOX_VARIANTS, variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, disabled, selected,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        // The skin's layout entities are `fixed`: `BitmapSkinRenderer.draw` copies them at their own
        // size from the window's top-left, however large the window is - never stretched over it.
        const skinLayout: BoxLayout = { position: 'absolute', left: 0, top: 0, width: config.layout?.width, height: config.layout?.height };

        return (
            <Box
                ref={ref}
                visible={visible}
                alpha={(alpha === undefined) ? undefined : Math.min(1, Math.max(0, alpha))}
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
                        layout={skinLayout}
                    />
                )}
                {resolvedOverlay && (
                    <BackgroundLayer
                        layer={resolvedOverlay}
                        layout={skinLayout}
                    />
                )}
                <VariantCascadeProvider map={ownCascade}>
                    {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                </VariantCascadeProvider>
            </Box>
        );
    },
);

CheckBox.displayName = 'CheckBox';

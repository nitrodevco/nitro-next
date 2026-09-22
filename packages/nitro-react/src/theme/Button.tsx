import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { dynamicStyleBoxProps, DynamicStyleProvider, useHostDynamicStyleEffect } from './dynamicstyle';
import { useThemeVariant } from './hooks';
import { BackgroundLayer } from './layer';
import { BUTTON_100_VARIANT, BUTTON_102_VARIANT, BUTTON_103_VARIANT, BUTTON_104_VARIANT, BUTTON_105_VARIANT, BUTTON_106_VARIANT, BUTTON_200_VARIANT, ButtonVariant, classicButtonVariant, shinyButtonVariant, ThemeProps, ThemeVariants, windowLayout, wrapTextChildren } from './utils';

/**
 * `Button` variants - the `type="button"` rows of `habbo_element_description_xml`, keyed by
 * their `style`: each the row's skin art plus the window layout it names (`windowLayout`).
 */
const BUTTON_VARIANTS: ThemeVariants<ButtonVariant> = {
    // habbo_skin_button_default
    0: { ...classicButtonVariant('button-0'), ...windowLayout('habbo_window_layout_button') },
    // habbo_skin_button_default_black
    1: { ...classicButtonVariant('button-1'), ...windowLayout('habbo_window_layout_button_black') },
    // habbo_skin_button_default_white
    2: { ...classicButtonVariant('button-2'), ...windowLayout('habbo_window_layout_button') },
    // habbo_skin_button_shiny_default
    3: { ...shinyButtonVariant('button-3'), ...windowLayout('habbo_window_layout_button_shiny') },
    // habbo_skin_button_shiny_black
    4: { ...shinyButtonVariant('button-4'), ...windowLayout('habbo_window_layout_button_shiny_black') },
    // "white": the shiny default art on the shiny black layout (white caption, 28px tall)
    5: { ...shinyButtonVariant('button-3'), ...windowLayout('habbo_window_layout_button_shiny_black') },
    // "green": as 5, tinted by the row's `color`
    6: { ...shinyButtonVariant('button-3'), ...windowLayout('habbo_window_layout_button_shiny_black'), tintColor: '#00aa00' },
    // illumina landing view
    100: { ...BUTTON_100_VARIANT, ...windowLayout('illumina_light_button') },
    // illumina window
    101: { ...BUTTON_100_VARIANT, ...windowLayout('illumina_light_button'), tintColor: '#bbbbbb' },
    // illumina plain
    102: { ...BUTTON_102_VARIANT, ...windowLayout('illumina_light_button_plain') },
    // illumina unetched
    103: { ...BUTTON_103_VARIANT, ...windowLayout('illumina_light_button_plain') },
    // illumina purple window
    104: { ...BUTTON_104_VARIANT, ...windowLayout('illumina_purple_button') },
    // illumina purple plain
    105: { ...BUTTON_105_VARIANT, ...windowLayout('illumina_purple_button_plain') },
    // illumina dark recolorable
    106: { ...BUTTON_106_VARIANT, ...windowLayout('illumina_light_button_plain') },
    // illumina dark
    200: { ...BUTTON_200_VARIANT, ...windowLayout('illumina_dark_button') },
};

export interface ButtonProps extends ThemeProps<ButtonVariant> {
    disabled?: boolean;
    selected?: boolean;
    children?: ReactNode;
}

export const Button: ForwardRefExoticComponent<ButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ButtonProps>(
    ({
        variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, dynamicStyle, disabled, selected, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, state, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'button', variants: BUTTON_VARIANTS, variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, disabled, selected, interactive: !!dynamicStyle,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });
        // A few layouts put a `dynamic_style` on a button too: its own rule (only the disabled fade) and its tagged children's.
        const hostEffect = useHostDynamicStyleEffect(dynamicStyle, state);

        return (
            <Box
                ref={ref}
                visible={visible}
                layout={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...config.layout,
                    ...layout,
                }}
                {...dynamicStyleBoxProps(hostEffect)}
                {...handlers}
            >
                {resolvedLayer && (
                    <BackgroundLayer
                        layer={resolvedLayer}
                        tintColor={resolvedTint}
                    />
                )}
                {resolvedOverlay && <BackgroundLayer layer={resolvedOverlay} />}
                <DynamicStyleProvider
                    name={dynamicStyle}
                    state={state}
                >
                    <VariantCascadeProvider map={ownCascade}>
                        {wrapTextChildren(children, { textStyle: resolvedTextStyle, textColor: resolvedTextColor })}
                    </VariantCascadeProvider>
                </DynamicStyleProvider>
            </Box>
        );
    },
);

Button.displayName = 'Button';

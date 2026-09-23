import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { dynamicStyleBoxProps, DynamicStyleProvider, useHostDynamicStyleEffect } from './dynamicstyle';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, NineSlice } from './layer';
import { expandSides, shinyButtonVariant, ThemeProps, ThemeVariants, ThemeWithStatesVariant, windowLayout, wrapTextChildren } from './utils';

export type ButtonThickVariant = ThemeWithStatesVariant;

/**
 * `habbo_skin_button_thick` and its black and white twins, cut the way their templates describe:
 * a 4px edge, a single stretchable column of face, another 4px edge, and the same again
 * vertically. The middle row of the default skin reads
 *
 *   #000 #000 #fff #ccc | #fff | #888 #fff #000 #000
 *
 * - two columns of outline, a white highlight and a light bevel, then the white face, then the
 * darker bevel and the outline mirrored back.
 */
const thickCapsuleVariant = (prefix: string): ThemeWithStatesVariant => ({
    states: {
        default: NineSlice(`${prefix}-default-src`, 4, 4, 4, 4),
        hovering: NineSlice(`${prefix}-hovering-src`, 4, 4, 4, 4),
        pressed: NineSlice(`${prefix}-pressed-src`, 4, 4, 4, 4),
        disabled: NineSlice(`${prefix}-disabled-src`, 4, 4, 4, 4),
    },
});

/**
 * `ButtonThick` variants - the `type="button_thick"` rows of `habbo_element_description_xml`,
 * keyed by their `style`: each the row's skin art plus the window layout it names.
 */
const BUTTON_THICK_VARIANTS: ThemeVariants<ButtonThickVariant> = {
    // habbo_skin_button_thick
    0: { ...thickCapsuleVariant('buttonthick-0'), ...windowLayout('habbo_window_layout_button_thick') },
    // habbo_skin_button_thick_black
    1: { ...thickCapsuleVariant('buttonthick-1'), ...windowLayout('habbo_window_layout_button_thick_black') },
    // habbo_skin_button_thick_white
    2: { ...thickCapsuleVariant('buttonthick-2'), ...windowLayout('habbo_window_layout_button_thick') },
    // habbo_skin_button_shiny_thick
    3: { ...shinyButtonVariant('buttonthick-3'), ...windowLayout('habbo_window_layout_button_shiny_thick') },
    // habbo_skin_button_shiny_thick_black
    4: { ...shinyButtonVariant('buttonthick-4'), ...windowLayout('habbo_window_layout_button_shiny_thick_black') },
    // "white": the shiny thick art on the shiny thick black layout (white caption, 28px tall)
    5: { ...shinyButtonVariant('buttonthick-3'), ...windowLayout('habbo_window_layout_button_shiny_thick_black') },
    // "green": as 5, tinted by the row's `color`
    6: { ...shinyButtonVariant('buttonthick-3'), ...windowLayout('habbo_window_layout_button_shiny_thick_black'), tintColor: '#00aa00' },
};

export interface ButtonThickProps extends ThemeProps<ButtonThickVariant> {
    disabled?: boolean;
    selected?: boolean;
    children?: ReactNode;
}

export const ButtonThick: ForwardRefExoticComponent<ButtonThickProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ButtonThickProps>(
    ({
        variant, defaultVariant, tooltip, tooltipDelay, layout, tintColor, textStyle, textColor, visible, dynamicStyle, disabled, selected, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, state, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'buttonThick', variants: BUTTON_THICK_VARIANTS, variant, defaultVariant, tooltip, tooltipDelay, tintColor, textStyle, textColor, disabled, selected, interactive: !!dynamicStyle,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });
        const hostEffect = useHostDynamicStyleEffect(dynamicStyle, state);

        return (
            <Box
                ref={ref}
                visible={visible}
                layout={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...expandSides(config.layout),
                    ...expandSides(layout),
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

ButtonThick.displayName = 'ButtonThick';

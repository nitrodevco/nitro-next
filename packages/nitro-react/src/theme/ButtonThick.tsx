import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { dynamicStyleBoxProps, DynamicStyleProvider, useHostDynamicStyleEffect } from './dynamicstyle';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, NineSlice } from './layer';
import { ThemeProps, ThemeVariants, ThemeWithStatesVariant, wrapTextChildren } from './utils';
import { makeTextStyleBold, roundedButtonVariant, shinyButtonBoldVariant } from './utils/buttonVariants';

export type ButtonThickVariant = ThemeWithStatesVariant;

const BUTTON_THICK_3_VARIANT: ButtonThickVariant = {
    ...shinyButtonBoldVariant('buttonthick-3', '#000000'),
    layout: {
        paddingLeft: 10, paddingTop: 2, paddingRight: 10, paddingBottom: 3, minWidth: 20, minHeight: 22,
    },
};

/**
 * `habbo_skin_button_thick` and its black twin, cut the way their templates describe: a 4px
 * edge, a single stretchable column of face, another 4px edge, and the same again vertically.
 * The middle row of the white skin reads
 *
 *   #000 #000 #fff #ccc | #fff | #888 #fff #000 #000
 *
 * - two columns of outline, a white highlight and a light bevel, then the white face, then the
 * darker bevel and the outline mirrored back.
 */
const thickCapsuleVariant = (prefix: string, textColor: string): ThemeWithStatesVariant => ({
    states: {
        default: NineSlice(`${prefix}-default-src`, 4, 4, 4, 4),
        hovering: NineSlice(`${prefix}-hovering-src`, 4, 4, 4, 4),
        pressed: NineSlice(`${prefix}-pressed-src`, 4, 4, 4, 4),
        disabled: NineSlice(`${prefix}-disabled-src`, 4, 4, 4, 4),
    },
    layout: {
        paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4, minWidth: 8, minHeight: 23,
    },
    textStyle: 'text-style-button-bold',
    textColor,
});

const BUTTON_THICK_VARIANTS: ThemeVariants<ButtonThickVariant> = {
    // habbo_skin - default / white
    0: thickCapsuleVariant('buttonthick-0', '#000000'),
    // Habbo_skin black
    1: thickCapsuleVariant('buttonthick-1', '#FFFFFF'),
    // ubuntu_skin - default
    3: {
        ...BUTTON_THICK_3_VARIANT,
        textColor: '#000000',
    },
    // ubuntu_skin - black
    4: {
        ...shinyButtonBoldVariant('buttonthick-4', '#ffffff'),
        layout: {
            paddingLeft: 10, paddingTop: 5, paddingRight: 10, paddingBottom: 6, minWidth: 20, minHeight: 28,
        },
    },
    // ubuntu_skin - default rounded
    5: {
        ...makeTextStyleBold(roundedButtonVariant('containerbutton-4', '#ffffff')),
        layout: {
            paddingLeft: 10, paddingTop: 5, paddingRight: 10, paddingBottom: 6, minWidth: 20, minHeight: 28,
        },
    },
    // ubuntu_skin - green
    6: {
        ...BUTTON_THICK_3_VARIANT,
        tintColor: '#00aa00',
        textColor: '#FFFFFF',
    },
};

export interface ButtonThickProps extends ThemeProps<ButtonThickVariant> {
    disabled?: boolean;
    selected?: boolean;
    children?: ReactNode;
}

export const ButtonThick: ForwardRefExoticComponent<ButtonThickProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ButtonThickProps>(
    ({
        variant, defaultVariant, tooltip, layout, tintColor, textStyle, textColor, visible, dynamicStyle, disabled, selected, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, state, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'buttonThick', variants: BUTTON_THICK_VARIANTS, variant, defaultVariant, tooltip, tintColor, textStyle, textColor, disabled, selected, interactive: !!dynamicStyle,
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

ButtonThick.displayName = 'ButtonThick';

import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, NineSlice } from './layer';
import { ThemeProps, ThemeVariant, ThemeVariants, ThemeWithStatesVariant, wrapTextChildren } from './utils';
import { BUTTON_100_VARIANT, BUTTON_104_VARIANT, BUTTON_105_VARIANT, BUTTON_106_VARIANT, buttonPlainVariant, classicButtonVariant, roundedButtonVariant, shinyButtonVariant, withoutLayout } from './utils/buttonVariants';

export type ContainerButtonVariant = ThemeVariant | ThemeWithStatesVariant;

/** illumina `button_multi_*` - a segmented button's left/right/middle piece (no outer edge on the joined side). */
const multiVariant = (style: string, left: number, right: number): ContainerButtonVariant => ({
    states: {
        default: NineSlice(`containerbutton-${style}-default-src`, left, 4, right, 4),
        hovering: NineSlice(`containerbutton-${style}-hovering-src`, left, 4, right, 4),
        pressed: NineSlice(`containerbutton-${style}-pressed-src`, left, 4, right, 4),
    },
    textStyle: 'text-style-il-button',
});

/**
 * Keyed by the same `style` ids the client's `habbo_element_description_xml` gives
 * `type="container_button"`; most share a sheet with a `Button` style of a different number.
 */
const CONTAINER_BUTTON_VARIANTS: ThemeVariants<ContainerButtonVariant> = {
    // habbo_skin default (button_default) - the same art as Button 0
    0: classicButtonVariant('button-0'),
    // habbo_skin black
    1: classicButtonVariant('button-1', '#ffffff'),
    // habbo_skin white
    2: classicButtonVariant('button-2'),
    // ubuntu_skin shiny thick
    3: shinyButtonVariant('buttonthick-3'),
    // ubuntu_skin shiny large (black intent)
    4: roundedButtonVariant('containerbutton-4'),
    // ubuntu_skin shiny large (white intent)
    5: roundedButtonVariant('containerbutton-4'),
    // ubuntu_skin shiny thick, green
    6: { ...shinyButtonVariant('buttonthick-3', '#ffffff'), tintColor: '#00aa00' },
    // ubuntu_skin shiny default ("default thin")
    7: shinyButtonVariant('button-3'),
    // illumina landing view / window
    100: withoutLayout(BUTTON_100_VARIANT),
    101: { ...withoutLayout(BUTTON_100_VARIANT), tintColor: '#bbbbbb' },
    // illumina plain / unetched
    102: withoutLayout(buttonPlainVariant('button-102', false)),
    103: withoutLayout(buttonPlainVariant('button-103', false)),
    // illumina multi-left / multi-right / multi-middle
    104: multiVariant('104', 4, 0),
    105: multiVariant('105', 0, 4),
    106: multiVariant('106', 0, 0),
    // illumina purple window / purple plain / dark recolorable
    107: withoutLayout(BUTTON_104_VARIANT),
    108: withoutLayout(BUTTON_105_VARIANT),
    109: withoutLayout(BUTTON_106_VARIANT),
};

export interface ContainerButtonProps extends ThemeProps<ContainerButtonVariant> {
    disabled?: boolean;
    selected?: boolean;
    children?: ReactNode;
}

/**
 * The Flash `container_button`: a button whose face is built from arbitrary children
 * (positioned absolutely, exactly like a `container`) rather than a centered caption. Press
 * feedback beyond the sheet's own states came from `dynamic_style`, which is carried on
 * `ThemeLayoutMeta` but not applied yet.
 */
export const ContainerButton: ForwardRefExoticComponent<ContainerButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ContainerButtonProps>(
    ({
        variant, defaultVariant, layout, tintColor, textStyle, textColor, visible, disabled, selected, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'containerButton', variants: CONTAINER_BUTTON_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, disabled, selected,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
                visible={visible}
                layout={{ ...config.layout, ...layout }}
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

ContainerButton.displayName = 'ContainerButton';

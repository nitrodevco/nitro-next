import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { VariantCascadeProvider } from './cascade';
import { dynamicStyleBoxProps, DynamicStyleProvider, useHostDynamicStyleEffect } from './dynamicstyle';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, NineSlice } from './layer';
import { ThemeProps, ThemeVariant, ThemeVariants, ThemeWithStatesVariant, wrapTextChildren } from './utils';
import { BUTTON_100_VARIANT, BUTTON_102_VARIANT, BUTTON_104_VARIANT, BUTTON_105_VARIANT, BUTTON_106_VARIANT, BUTTON_200_VARIANT, buttonPlainVariant, classicButtonVariant, roundedButtonVariant, shinyButtonVariant } from './utils/buttonVariants';

export type ContainerButtonVariant = ThemeVariant | ThemeWithStatesVariant;

/**
 * illumina `button_multi_*` - a segmented button's left/right/middle piece (no outer edge on the
 * joined side).
 *
 * Three layers, because the skin colorizes only one of them. The `button_*` face is what
 * `NewSourceTypeOption.updateVisuals` tints through `_container.color`; the `button_etch_*`
 * entities are `colorize="false"` - the neutral shadow that rounds the piece off at the bottom -
 * so they are cut into a `-plain` sheet of the same size and metrics and drawn untinted over it.
 * Baked into the face they took the source type's colour and read as a coloured square over the
 * curve.
 *
 * The outer `button_center_*_curve` - the gradient patch that carries the face's light-to-dark
 * transition down the outer edge - is `vertical="center"`, so Flash puts it halfway up the
 * *rendered* segment, not at its layout rect. Cut at the rect it covered the rounded bottom
 * corner and filled it in: the same `#e2e2e2` as the face, so invisible while the segment is
 * unselected and a squared-off block once the picker tints the selected one. It is baked at the
 * centred position for the sheet's own height instead (`centeredInSheet` in
 * `extract-skin-assets.ts`), which is exact here - `sourceTypeSelector` draws these segments at
 * the 19px the skin itself is.
 */
const multiVariant = (style: string, left: number, right: number): ContainerButtonVariant => ({
    states: {
        default: NineSlice(`containerbutton-${style}-default-src`, left, 4, right, 4),
        hovering: NineSlice(`containerbutton-${style}-hovering-src`, left, 4, right, 4),
        pressed: NineSlice(`containerbutton-${style}-pressed-src`, left, 4, right, 4),
    },
    overlays: {
        default: NineSlice(`containerbutton-${style}-default-plain-src`, left, 4, right, 4),
        hovering: NineSlice(`containerbutton-${style}-hovering-plain-src`, left, 4, right, 4),
        pressed: NineSlice(`containerbutton-${style}-pressed-plain-src`, left, 4, right, 4),
    },
    textStyle: 'il_button',
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
    100: BUTTON_100_VARIANT,
    101: { ...BUTTON_100_VARIANT, tintColor: '#bbbbbb' },
    // illumina plain / unetched
    102: BUTTON_102_VARIANT,
    103: buttonPlainVariant('button-103', false),
    // illumina multi-left / multi-right / multi-middle
    104: multiVariant('104', 4, 0),
    105: multiVariant('105', 0, 4),
    106: multiVariant('106', 0, 0),
    // illumina purple window / purple plain / dark recolorable
    107: BUTTON_104_VARIANT,
    108: BUTTON_105_VARIANT,
    109: BUTTON_106_VARIANT,
    // illumina dark - the same art as Button 200
    200: BUTTON_200_VARIANT,
};

export interface ContainerButtonProps extends ThemeProps<ContainerButtonVariant> {
    disabled?: boolean;
    selected?: boolean;
    children?: ReactNode;
}

/**
 * The Flash `container_button`: a button whose face is built from arbitrary children
 * (positioned absolutely, exactly like a `container`) rather than a centered caption. Press
 * feedback beyond the sheet's own states comes from `dynamic_style` - almost always `button`,
 * whose `#icon` rule brightens a tagged icon child on hover and sinks and darkens it when pressed
 * - applied here the way `Button` applies it: the host rule to the button itself, the child rules
 * to its tagged descendants through `DynamicStyleProvider`.
 */
export const ContainerButton: ForwardRefExoticComponent<ContainerButtonProps & RefAttributes<PixiContainer>> = forwardRef<PixiContainer, ContainerButtonProps>(
    ({
        variant, defaultVariant, tooltip, layout, tintColor, textStyle, textColor, visible, dynamicStyle, disabled, selected, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, state, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'containerButton', variants: CONTAINER_BUTTON_VARIANTS, variant, defaultVariant, tooltip, tintColor, textStyle, textColor, disabled, selected, interactive: !!dynamicStyle,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });
        const hostEffect = useHostDynamicStyleEffect(dynamicStyle, state);

        return (
            <Box
                ref={ref}
                visible={visible}
                layout={{ ...config.layout, ...layout }}
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

ContainerButton.displayName = 'ContainerButton';

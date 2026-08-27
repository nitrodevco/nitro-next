import { Container as PixiContainer } from 'pixi.js';
import { forwardRef, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';

import { Box } from './Box';
import { BUTTON_100_VARIANT, BUTTON_104_VARIANT, BUTTON_105_VARIANT, BUTTON_106_VARIANT } from './buttonVariants';
import { VariantCascadeProvider } from './cascade';
import { useThemeVariant } from './hooks';
import { BackgroundLayer, NineSlice } from './layer';
import { BUTTON_CURVE_OVERLAY, BUTTON_CURVE_PRESSED_OVERLAY, ThemeProps, ThemeVariant, ThemeVariants, ThemeWithStatesVariant, wrapTextChildren } from './utils';

type ContainerButtonVariant = ThemeVariant | ThemeWithStatesVariant;

/** habbo_skin default/black/white buttons - the same sheets Button's 0/1/2 use. */
const classicVariant = (prefix: string, textColor: string): ContainerButtonVariant => ({
    states: {
        default: NineSlice(`${prefix}-default-src`, 3, 3, 3, 3),
        hovering: NineSlice(`${prefix}-hovering-src`, 3, 3, 3, 3),
        pressed: NineSlice(`${prefix}-pressed-src`, 3, 3, 3, 3),
        disabled: NineSlice(`${prefix}-disabled-src`, 3, 3, 3, 3),
    },
    textStyle: 'text-style-button-regular', textColor,
});

/** ubuntu_skin shiny buttons (`button_shiny_*`) - Button 3's / ButtonThick 3's sheets. */
const shinyVariant = (prefix: string): ContainerButtonVariant => ({
    states: {
        default: NineSlice(`${prefix}-default-src`, 5, 5, 5, 5),
        hovering: NineSlice(`${prefix}-hovering-src`, 5, 5, 5, 5),
        pressed: NineSlice(`${prefix}-pressed-src`, 5, 5, 5, 5),
        disabled: NineSlice(`${prefix}-disabled-src`, 5, 5, 5, 5),
    },
    textStyle: 'text-style-button-shiny-regular', textColor: '#000000',
});

/** ubuntu_skin `button_shiny_large` - the rounded "container" button. */
const CONTAINER_BUTTON_4_VARIANT: ContainerButtonVariant = {
    states: {
        default: NineSlice('containerbutton-4-default-src', 6, 6, 6, 7),
        hovering: NineSlice('containerbutton-4-hovering-src', 6, 6, 6, 7),
        pressed: NineSlice('containerbutton-4-pressed-src', 6, 6, 6, 7),
        disabled: NineSlice('containerbutton-4-disabled-src', 6, 6, 6, 7),
    },
    textStyle: 'text-style-button-shiny-regular',
    textColor: '#000000',
};

/** illumina plain/unetched buttons - Button 102/103's sheets, minus Button's caption padding. */
const plainVariant = (prefix: string): ContainerButtonVariant => ({
    states: {
        default: NineSlice(`${prefix}-default-src`, 6, 8, 4, 8),
        pressed: NineSlice(`${prefix}-pressed-src`, 6, 8, 4, 8),
    },
    overlays: { default: BUTTON_CURVE_OVERLAY, pressed: BUTTON_CURVE_PRESSED_OVERLAY },
    textStyle: 'text-style-il-button', textColor: '#000000',
});

/** illumina `button_multi_*` - a segmented button's left/right/middle piece (no outer edge on the joined side). */
const multiVariant = (style: string, left: number, right: number): ContainerButtonVariant => ({
    states: {
        default: NineSlice(`containerbutton-${style}-default-src`, left, 4, right, 4),
        hovering: NineSlice(`containerbutton-${style}-hovering-src`, left, 4, right, 4),
        pressed: NineSlice(`containerbutton-${style}-pressed-src`, left, 4, right, 4),
    },
    textStyle: 'text-style-il-button', textColor: '#000000',
});

/** Drop a Button variant's caption padding - a container button's children are placed absolutely. */
const withoutPadding = ({ layout: _layout, ...variant }: ThemeWithStatesVariant): ContainerButtonVariant => variant;

/**
 * Keyed by the same `style` ids the client's `habbo_element_description_xml` gives
 * `type="container_button"`; most share a sheet with a `Button` style of a different number.
 */
const CONTAINER_BUTTON_VARIANTS: ThemeVariants<ContainerButtonVariant> = {
    // habbo_skin default (button_default) - the same art as Button 0
    0: classicVariant('button-0', '#000000'),
    // habbo_skin black
    1: classicVariant('button-1', '#ffffff'),
    // habbo_skin white
    2: classicVariant('button-2', '#000000'),
    // ubuntu_skin shiny thick
    3: shinyVariant('buttonthick-3'),
    // ubuntu_skin shiny large (black intent)
    4: CONTAINER_BUTTON_4_VARIANT,
    // ubuntu_skin shiny large (white intent)
    5: CONTAINER_BUTTON_4_VARIANT,
    // ubuntu_skin shiny thick, green
    6: { ...shinyVariant('buttonthick-3'), tintColor: '#00aa00', textColor: '#ffffff' },
    // ubuntu_skin shiny default ("default thin")
    7: shinyVariant('button-3'),
    // illumina landing view / window
    100: withoutPadding(BUTTON_100_VARIANT),
    101: { ...withoutPadding(BUTTON_100_VARIANT), tintColor: '#bbbbbb' },
    // illumina plain / unetched
    102: plainVariant('button-102'),
    103: plainVariant('button-103'),
    // illumina multi-left / multi-right / multi-middle
    104: multiVariant('104', 4, 0),
    105: multiVariant('105', 0, 4),
    106: multiVariant('106', 0, 0),
    // illumina purple window / purple plain / dark recolorable
    107: withoutPadding(BUTTON_104_VARIANT),
    108: withoutPadding(BUTTON_105_VARIANT),
    109: withoutPadding(BUTTON_106_VARIANT),
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
        variant, defaultVariant, layout, tintColor, textStyle, textColor, disabled, selected, children,
        onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
    }, ref) => {
        const { ownCascade, config, handlers, resolvedLayer, resolvedOverlay, resolvedTint, resolvedTextStyle, resolvedTextColor } = useThemeVariant({
            cascadeKey: 'containerButton', variants: CONTAINER_BUTTON_VARIANTS, variant, defaultVariant, tintColor, textStyle, textColor, disabled, selected,
            onPointerOver, onPointerOut, onPointerDown, onPointerUp, onPointerUpOutside, onPointerTap,
        });

        return (
            <Box
                ref={ref}
                layout={{ ...config.layout, ...layout }}
                {...handlers}
                cursor={handlers.eventMode === 'static' ? 'pointer' : undefined}
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

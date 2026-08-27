import { NineSlice } from './layer';
import { BUTTON_100_DEFAULT_OVERLAY, BUTTON_100_PRESSED_OVERLAY, BUTTON_CURVE_OVERLAY, BUTTON_CURVE_PRESSED_OVERLAY, ThemeWithStatesVariant } from './utils';

/**
 * Button skins shared between `Button` and `ContainerButton` (the client's
 * `habbo_element_description_xml` points both types at the same skin assets under different
 * style numbers). Kept out of the component files so Fast Refresh keeps working there.
 */
export type ButtonVariant = ThemeWithStatesVariant;

/** ubuntu_skin `button_shiny` */
export const BUTTON_3_VARIANT: ButtonVariant = {
    states: {
        default: NineSlice('button-3-default-src', 5, 5, 5, 5),
        hovering: NineSlice('button-3-hovering-src', 5, 5, 5, 5),
        pressed: NineSlice('button-3-pressed-src', 5, 5, 5, 5),
        disabled: NineSlice('button-3-disabled-src', 5, 5, 5, 5),
    },
    layout: {
        paddingLeft: 8, paddingTop: 2, paddingRight: 8, paddingBottom: 3,
        minWidth: 20, minHeight: 22,
    },
    textStyle: 'text-style-button-shiny-regular',
};

/** illumina light window button (`illumina_light_button`) - a 50x50 glow sheet around a 28px button. */
export const BUTTON_100_VARIANT: ButtonVariant = {
    states: {
        default: NineSlice('button-100-default-src', 1, 1, 1, 1),
        hovering: NineSlice('button-100-hovering-src', 19, 19, 19, 19),
        pressed: NineSlice('button-100-hovering-src', 19, 19, 19, 19),
    },
    overlays: { default: BUTTON_100_DEFAULT_OVERLAY, pressed: BUTTON_100_PRESSED_OVERLAY },
    layout: {
        paddingLeft: 24, paddingTop: 14, paddingRight: 24, paddingBottom: 14,
        minWidth: 48, minHeight: 48,
    },
    textStyle: 'text-style-il-button', textColor: '#000000',
};

/** illumina "plain"-family buttons (102/103/105/106) all share this geometry. */
export const buttonPlainVariant = (prefix: string, hasHover: boolean): ButtonVariant => ({
    states: {
        default: NineSlice(`${prefix}-default-src`, 6, 8, 4, 8),
        ...(hasHover && { hovering: NineSlice(`${prefix}-hovering-src`, 6, 8, 4, 8) }),
        pressed: NineSlice(`${prefix}-pressed-src`, 6, 8, 4, 8),
    },
    overlays: { default: BUTTON_CURVE_OVERLAY, pressed: BUTTON_CURVE_PRESSED_OVERLAY },
    layout: {
        paddingLeft: 13, paddingTop: 3, paddingRight: 13, paddingBottom: 3,
        minWidth: 28, minHeight: 28,
    },
    textStyle: 'text-style-il-button', textColor: '#000000',
});

/** illumina purple window button - same 50x50 glow sheet layout as the light `100` variant. */
export const BUTTON_104_VARIANT: ButtonVariant = {
    states: {
        default: NineSlice('button-104-default-src', 19, 19, 19, 19),
        hovering: NineSlice('button-104-hovering-src', 19, 19, 19, 19),
        pressed: NineSlice('button-104-pressed-src', 19, 19, 19, 19),
    },
    layout: {
        paddingLeft: 24, paddingTop: 14, paddingRight: 24, paddingBottom: 14,
        minWidth: 48, minHeight: 48,
    },
    textStyle: 'text-style-il-button', textColor: '#ffffff',
};

export const BUTTON_105_VARIANT = buttonPlainVariant('button-105', true);
export const BUTTON_106_VARIANT = buttonPlainVariant('button-106', true);

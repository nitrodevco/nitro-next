import { BUTTON_3_VARIANT, BUTTON_100_VARIANT, BUTTON_104_VARIANT, BUTTON_105_VARIANT, BUTTON_106_VARIANT, ButtonVariant } from '../buttonVariants';
import { NineSlice } from '../layer';
import { BUTTON_CURVE_OVERLAY, BUTTON_CURVE_PRESSED_OVERLAY, ThemeVariants } from '../utils';
import { defineVariants } from './defineVariants';

/**
 * `Button` variants - the Flash `style` ids of `button` elements: the element description's view/colour
 * (see ./elements.ts) merged with the art layers drawn here.
 */
export const BUTTON_VARIANTS: ThemeVariants<ButtonVariant> = defineVariants<ButtonVariant>('button', {
    // habbo_skin - white
    0: {
        states: {
            default: NineSlice('button-0-default-src', 3, 3, 3, 3),
            hovering: NineSlice('button-0-hovering-src', 3, 3, 3, 3),
            pressed: NineSlice('button-0-pressed-src', 3, 3, 3, 3),
            disabled: NineSlice('button-0-disabled-src', 3, 3, 3, 3),
        },
        layout: {
            padding: 8,
        },
        textStyle: 'text-style-button-regular', textColor: '#000000',
    },
    // Habbo_skin black
    1: {
        states: {
            default: NineSlice('button-1-default-src', 3, 3, 3, 3),
            hovering: NineSlice('button-1-hovering-src', 3, 3, 3, 3),
            pressed: NineSlice('border-3-default-src', 3, 3, 3, 3),
            disabled: NineSlice('button-1-disabled-src', 3, 3, 3, 3),
        },
        layout: {
            paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
        textStyle: 'text-style-button-regular', textColor: '#ffffff',
    },
    // habbo_skin - white (button_default_white)
    2: {
        states: {
            default: NineSlice('button-2-default-src', 3, 3, 3, 3),
            hovering: NineSlice('button-2-hovering-src', 3, 3, 3, 3),
            pressed: NineSlice('button-2-pressed-src', 3, 3, 3, 3),
            disabled: NineSlice('button-2-disabled-src', 3, 3, 3, 3),
        },
        layout: {
            paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
        textStyle: 'text-style-button-regular', textColor: '#000000',
    },
    // ubuntu_skin - white
    3: {
        ...BUTTON_3_VARIANT, textColor: '#000000',
    },
    // ubuntu_skin - shiny art with the black window layout (white caption)
    5: {
        ...BUTTON_3_VARIANT, textColor: '#ffffff',
    },
    // ubuntu_skin - black
    4: {
        states: {
            default: NineSlice('button-4-default-src', 5, 5, 5, 5),
            hovering: NineSlice('button-4-hovering-src', 5, 5, 5, 5),
            pressed: NineSlice('button-4-pressed-src', 5, 5, 5, 5),
            disabled: NineSlice('button-4-disabled-src', 5, 5, 5, 5),
        },
        layout: {
            paddingLeft: 10, paddingTop: 5, paddingRight: 10, paddingBottom: 6,
            minWidth: 20, minHeight: 28,
        },
        textStyle: 'text-style-button-shiny-regular', textColor: '#ffffff',
    },
    // green
    6: {
        ...BUTTON_3_VARIANT,
        tintColor: '#00aa00',
        textColor: '#ffffff',
    },
    // landing view
    100: {
        ...BUTTON_100_VARIANT,
    },
    // window
    101: {
        ...BUTTON_100_VARIANT,
        tintColor: '#bbbbbb',
    },
    // plain
    102: {
        states: {
            default: NineSlice('button-102-default-src', 6, 8, 4, 8),
            pressed: NineSlice('button-102-pressed-src', 6, 8, 4, 8),
        },
        overlays: { default: BUTTON_CURVE_OVERLAY, pressed: BUTTON_CURVE_PRESSED_OVERLAY },
        layout: {
            paddingLeft: 13, paddingTop: 3, paddingRight: 13, paddingBottom: 3,
            minWidth: 28, minHeight: 28,
        },
        textStyle: 'text-style-il-button', textColor: '#000000',
    },
    // unetched
    103: {
        states: {
            default: NineSlice('button-103-default-src', 6, 8, 4, 8),
            pressed: NineSlice('button-103-pressed-src', 6, 8, 4, 8),
        },
        overlays: { default: BUTTON_CURVE_OVERLAY, pressed: BUTTON_CURVE_PRESSED_OVERLAY },
        layout: {
            paddingLeft: 13, paddingTop: 3, paddingRight: 13, paddingBottom: 3,
            minWidth: 28, minHeight: 28,
        },
        textStyle: 'text-style-il-button', textColor: '#000000',
    },
    // illumina purple window / purple plain / dark recolorable
    104: BUTTON_104_VARIANT,
    105: BUTTON_105_VARIANT,
    106: BUTTON_106_VARIANT,
    // default
    200: {
        states: {
            default: NineSlice('button-200-default-src', 4, 4, 4, 5),
        },
        layout: {
            paddingLeft: 13, paddingTop: 3, paddingRight: 13, paddingBottom: 3,
            minWidth: 28, minHeight: 28,
        },
        textStyle: 'text-style-id-button', textColor: '#000000',
    },
    // borderless
    300: {
        states: {
            default: NineSlice('button-300-default-src', 3, 3, 3, 3),
            hovering: NineSlice('button-300-hovering-src', 3, 3, 3, 3),
            pressed: NineSlice('button-300-pressed-src', 3, 3, 3, 3),
            disabled: NineSlice('button-300-disabled-src', 3, 3, 3, 3),
        },
        layout: {
            paddingLeft: 8, paddingTop: 2, paddingRight: 8, paddingBottom: 3,
            minWidth: 20, minHeight: 22,
        },
        textStyle: 'text-style-button-shiny-regular', textColor: '#000000',
    },
});

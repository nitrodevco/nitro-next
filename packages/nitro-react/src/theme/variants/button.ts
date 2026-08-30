import { NineSlice } from '../layer';
import { ThemeVariants } from '../utils';
import { BUTTON_100_VARIANT, BUTTON_104_VARIANT, BUTTON_105_VARIANT, BUTTON_106_VARIANT, buttonPlainVariant, ButtonVariant, classicButtonVariant, shinyButtonVariant } from './buttonVariants';

const BUTTON_3_VARIANT: ButtonVariant = {
    ...shinyButtonVariant('button-3'),
    layout: {
        paddingLeft: 8, paddingTop: 2, paddingRight: 8, paddingBottom: 3,
        minWidth: 20, minHeight: 22,
    },
};

/** `Button` variants - the Flash `style` ids it draws. */
export const BUTTON_VARIANTS: ThemeVariants<ButtonVariant> = {
    // habbo_skin - white
    0: {
        ...classicButtonVariant('button-0'),
        layout: {
            padding: 8,
        },
    },
    // Habbo_skin black
    1: {
        ...classicButtonVariant('button-1', '#ffffff'),
        layout: {
            paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
    },
    // habbo_skin - white (button_default_white)
    2: {
        ...classicButtonVariant('button-2'),
        layout: {
            paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
    },
    // ubuntu_skin - white
    3: BUTTON_3_VARIANT,
    // ubuntu_skin - shiny art with the black window layout (white caption)
    5: {
        ...BUTTON_3_VARIANT, textColor: '#ffffff',
    },
    // ubuntu_skin - black
    4: {
        ...shinyButtonVariant('button-4', '#ffffff'),
        layout: {
            paddingLeft: 10, paddingTop: 5, paddingRight: 10, paddingBottom: 6,
            minWidth: 20, minHeight: 28,
        },
    },
    // green
    6: {
        ...BUTTON_3_VARIANT,
        tintColor: '#00aa00',
        textColor: '#ffffff',
    },
    // landing view
    100: BUTTON_100_VARIANT,
    // window
    101: {
        ...BUTTON_100_VARIANT,
        tintColor: '#bbbbbb',
    },
    // plain
    102: buttonPlainVariant('button-102', false, '#000000'),
    // unetched
    103: buttonPlainVariant('button-103', false, '#000000'),
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
        textStyle: 'text-style-id-button',
    },
    // borderless / CUSTOM
    300: {
        ...classicButtonVariant('button-300', '#000000'),
        layout: {
            paddingLeft: 8, paddingTop: 2, paddingRight: 8, paddingBottom: 3,
            minWidth: 20, minHeight: 22,
        },
        textStyle: 'text-style-button-shiny-regular',
    },
};

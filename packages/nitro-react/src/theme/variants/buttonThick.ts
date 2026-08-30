import { NineSlice, Stretch } from '../layer';
import { ThemeVariants, ThemeWithStatesVariant } from '../utils';

/** `ButtonThick` variants - the Flash `style` ids it draws. */
export type ButtonThickVariant = ThemeWithStatesVariant;

const BUTTON_THICK_3_VARIANT: ButtonThickVariant = {
    states: {
        default: NineSlice('buttonthick-3-default-src', 5, 5, 5, 5),
        hovering: NineSlice('buttonthick-3-hovering-src', 5, 5, 5, 5),
        pressed: NineSlice('buttonthick-3-pressed-src', 5, 5, 5, 5),
        disabled: NineSlice('buttonthick-3-disabled-src', 5, 5, 5, 5),
    },
    layout: {
        paddingLeft: 10, paddingTop: 2, paddingRight: 10, paddingBottom: 3, minWidth: 20, minHeight: 22,
    },
    textStyle: 'text-style-button-shiny-bold',
};

export const BUTTON_THICK_VARIANTS: ThemeVariants<ButtonThickVariant> = {
    // habbo_skin - default / white
    0: {
        states: {
            default: Stretch('buttonthick-0-default-src'),
            hovering: Stretch('buttonthick-0-hovering-src'),
            pressed: Stretch('buttonthick-0-pressed-src'),
            disabled: Stretch('buttonthick-0-disabled-src'),
        },
        layout: {
            paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4, minWidth: 8, minHeight: 23,
        },
        textStyle: 'text-style-button-bold', textColor: '#000000',
    },
    // Habbo_skin black
    1: {
        states: {
            default: Stretch('buttonthick-1-default-src'),
            hovering: Stretch('buttonthick-1-hovering-src'),
            pressed: Stretch('buttonthick-1-pressed-src'),
            disabled: Stretch('buttonthick-1-disabled-src'),
        },
        layout: {
            paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4, minWidth: 8, minHeight: 23,
        },
        textStyle: 'text-style-button-bold', textColor: '#FFFFFF',
    },
    // ubuntu_skin - default
    3: {
        ...BUTTON_THICK_3_VARIANT,
        textColor: '#000000',
    },
    // ubuntu_skin - black
    4: {
        states: {
            default: NineSlice('buttonthick-4-default-src', 5, 5, 5, 5),
            hovering: NineSlice('buttonthick-4-hovering-src', 5, 5, 5, 5),
            pressed: NineSlice('buttonthick-4-pressed-src', 5, 5, 5, 5),
            disabled: NineSlice('buttonthick-4-disabled-src', 5, 5, 5, 5),
        },
        layout: {
            paddingLeft: 10, paddingTop: 5, paddingRight: 10, paddingBottom: 6, minWidth: 20, minHeight: 28,
        },
        textStyle: 'text-style-button-shiny-bold', textColor: '#FFFFFF',
    },
    // ubuntu_skin - default rounded
    5: {
        states: {
            default: NineSlice('containerbutton-4-default-src', 6, 6, 6, 7),
            hovering: NineSlice('containerbutton-4-hovering-src', 6, 6, 6, 7),
            pressed: NineSlice('containerbutton-4-pressed-src', 6, 6, 6, 7),
            disabled: NineSlice('containerbutton-4-disabled-src', 6, 6, 6, 7),
        },
        layout: {
            paddingLeft: 10, paddingTop: 5, paddingRight: 10, paddingBottom: 6, minWidth: 20, minHeight: 28,
        },
        textStyle: 'text-style-button-shiny-bold', textColor: '#FFFFFF',
    },
    // ubuntu_skin - green
    6: {
        ...BUTTON_THICK_3_VARIANT,
        tintColor: '#00aa00',
        textColor: '#FFFFFF',
    },
};

import { Stretch } from '../layer';
import { ThemeVariants, ThemeWithStatesVariant } from '../utils';
import { makeTextStyleBold, roundedButtonVariant, shinyButtonBoldVariant } from './buttonVariants';

/** `ButtonThick` variants - the Flash `style` ids it draws. */
export type ButtonThickVariant = ThemeWithStatesVariant;

const BUTTON_THICK_3_VARIANT: ButtonThickVariant = {
    ...shinyButtonBoldVariant('buttonthick-3', '#000000'),
    layout: {
        paddingLeft: 10, paddingTop: 2, paddingRight: 10, paddingBottom: 3, minWidth: 20, minHeight: 22,
    },
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

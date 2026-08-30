import { Stretch } from '../layer';
import { ThemeVariants, ThemeWithStatesVariant } from '../utils';

/** `RadioButton` variants - the Flash `style` ids it draws. */
export type RadioButtonVariant = ThemeWithStatesVariant;

export const RADIO_BUTTON_VARIANTS: ThemeVariants<RadioButtonVariant> = {
    0: {
        states: {
            default: Stretch('radiobutton-src', { x: 0, y: 0, width: 16, height: 16 }),
            selected: Stretch('radiobutton-src', { x: 16, y: 0, width: 16, height: 16 }),
        },
        layout: {
            width: 16,
            height: 16,
            padding: 0,
        },
    },
    1: {
        states: {
            default: Stretch('radiobutton-src', { x: 32, y: 0, width: 16, height: 16 }),
            selected: Stretch('radiobutton-src', { x: 48, y: 0, width: 16, height: 16 }),
        },
        layout: {
            width: 16,
            height: 16,
            padding: 0,
        },
    },
    2: {
        states: {
            default: Stretch('radiobutton-src', { x: 64, y: 0, width: 16, height: 16 }),
            selected: Stretch('radiobutton-src', { x: 16, y: 0, width: 16, height: 16 }),
        },
        layout: {
            width: 16,
            height: 16,
            padding: 0,
        },
    },
    100: {
        states: {
            default: Stretch('radiobutton-100-default-src'),
            selected: Stretch('radiobutton-100-selected-src'),
        },
        layout: {
            width: 11,
            height: 14,
            paddingLeft: 14,
        },
        textStyle: 'text-style-il-regular',
        textColor: '#000000',
    },
};

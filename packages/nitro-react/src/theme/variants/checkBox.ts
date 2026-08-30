import { Stretch } from '../layer';
import { ThemeVariants, ThemeWithStatesVariant } from '../utils';

/** `CheckBox` variants - the Flash `style` ids it draws. */
export type CheckBoxVariant = ThemeWithStatesVariant;

const CHECK_BOX_0_VARIANT: CheckBoxVariant = {
    states: {
        default: Stretch('checkbox-src', { x: 0, y: 0, width: 15, height: 15 }),
        selected: Stretch('checkbox-src', { x: 15, y: 0, width: 15, height: 15 }),
    },
    layout: {
        width: 15,
        height: 15,
        padding: 0,
    },
};

export const CHECK_BOX_VARIANTS: ThemeVariants<CheckBoxVariant> = {
    0: CHECK_BOX_0_VARIANT,
    1: {
        states: {
            default: Stretch('checkbox-src', { x: 30, y: 0, width: 15, height: 15 }),
            selected: Stretch('checkbox-src', { x: 45, y: 0, width: 15, height: 15 }),
        },
        layout: {
            width: 15,
            height: 15,
            padding: 0,
        },
    },
    2: CHECK_BOX_0_VARIANT,
    100: {
        states: {
            default: Stretch('checkbox-100-default-src'),
            selected: Stretch('checkbox-100-selected-src'),
        },
        layout: {
            width: 38,
            height: 21,
            paddingLeft: 42,
            paddingTop: 4,
            paddingBottom: 4,
        },
        textStyle: 'text-style-il-button',
    },
    101: {
        states: {
            default: Stretch('checkbox-101-default-src'),
            selected: Stretch('checkbox-101-selected-src'),
        },
        layout: {
            width: 19,
            height: 20,
            paddingLeft: 23,
            paddingTop: 4,
            paddingBottom: 4,
        },
        textStyle: 'text-style-il-button',
    },
};

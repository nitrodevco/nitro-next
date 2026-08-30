import { ButtonGroupComponentProps, ButtonGroupVariant, createButtonGroupComponent, ThemeVariants } from './utils';
import { classicButtonVariant } from './utils/buttonVariants';

export const BUTTON_GROUP_LEFT_VARIANTS: ThemeVariants<ButtonGroupVariant> = {
    // default
    0: {
        ...classicButtonVariant('buttongroupleft-0'),
        layout: {
            paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
    },
    // black
    1: {
        ...classicButtonVariant('buttongroupleft-1', '#ffffff'),
        layout: {
            paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
    },
    // white (reuses '0' art in every state)
    2: {
        ...classicButtonVariant('buttongroupleft-0'),
        layout: {
            paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
    },
    // landing view / IL button size (reuses '0' art)
    100: {
        ...classicButtonVariant('buttongroupleft-0'),
        layout: {
            paddingLeft: 13, paddingTop: 3, paddingRight: 13, paddingBottom: 3,
            minWidth: 28, minHeight: 28,
        },
        textStyle: 'text-style-il-button',
    },
};

export type ButtonGroupLeftProps = ButtonGroupComponentProps;

export const ButtonGroupLeft = createButtonGroupComponent('ButtonGroupLeft', 'buttonGroupLeft', BUTTON_GROUP_LEFT_VARIANTS);

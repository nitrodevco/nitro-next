import { NineSlice } from './layer';
import { type ButtonGroupComponentProps, type ButtonGroupVariant, createButtonGroupComponent } from './utils/buttonGroupFactory';
import { ThemeVariants } from './variant';

const BUTTON_GROUP_RIGHT_VARIANTS: ThemeVariants<ButtonGroupVariant> = {
    // default
    0: {
        states: {
            default: NineSlice('buttongroupright-0-default-src', 1, 3, 3, 3),
            hovering: NineSlice('buttongroupright-0-hovering-src', 2, 3, 3, 3),
            selected: NineSlice('buttongroupright-0-selected-src', 1, 3, 3, 3),
            disabled: NineSlice('buttongroupright-0-disabled-src', 1, 3, 3, 3),
        },
        layout: {
            paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
        textStyle: 'text-style-button-regular', textColor: '#000000',
    },
    // black
    1: {
        states: {
            default: NineSlice('buttongroupright-1-default-src', 1, 3, 3, 3),
            hovering: NineSlice('buttongroupright-1-hovering-src', 2, 3, 3, 3),
            selected: NineSlice('buttongroupright-1-selected-src', 1, 3, 3, 3),
            disabled: NineSlice('buttongroupright-1-disabled-src', 1, 3, 3, 3),
        },
        layout: {
            paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
        textStyle: 'text-style-button-regular', textColor: '#ffffff',
    },
    // white (reuses '0' art in every state, including hover - effectively identical to '0')
    2: {
        states: {
            default: NineSlice('buttongroupright-0-default-src', 1, 3, 3, 3),
            hovering: NineSlice('buttongroupright-0-hovering-src', 2, 3, 3, 3),
            selected: NineSlice('buttongroupright-0-selected-src', 1, 3, 3, 3),
            disabled: NineSlice('buttongroupright-0-disabled-src', 1, 3, 3, 3),
        },
        layout: {
            paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
        textStyle: 'text-style-button-regular', textColor: '#000000',
    },
    // landing view / IL button size (reuses '0' art)
    100: {
        states: {
            default: NineSlice('buttongroupright-0-default-src', 1, 3, 3, 3),
            hovering: NineSlice('buttongroupright-0-hovering-src', 2, 3, 3, 3),
            selected: NineSlice('buttongroupright-0-selected-src', 1, 3, 3, 3),
            disabled: NineSlice('buttongroupright-0-disabled-src', 1, 3, 3, 3),
        },
        layout: {
            paddingLeft: 13, paddingTop: 3, paddingRight: 13, paddingBottom: 3,
            minWidth: 28, minHeight: 28,
        },
        textStyle: 'text-style-il-button', textColor: '#000000',
    },
};

export type ButtonGroupRightProps = ButtonGroupComponentProps;

export const ButtonGroupRight = createButtonGroupComponent('ButtonGroupRight', 'buttonGroupRight', BUTTON_GROUP_RIGHT_VARIANTS);

import { NineSlice } from './layer';
import { ButtonGroupComponentProps, ButtonGroupVariant, createButtonGroupComponent, ThemeVariants } from './utils';

const BUTTON_GROUP_CENTER_VARIANTS: ThemeVariants<ButtonGroupVariant> = {
    // default
    0: {
        states: {
            default: NineSlice('buttongroupcenter-0-default-src', 1, 3, 3, 3),
            hovering: NineSlice('buttongroupcenter-0-hovering-src', 1, 3, 3, 3),
            selected: NineSlice('buttongroupcenter-0-selected-src', 1, 3, 3, 3),
            disabled: NineSlice('buttongroupcenter-0-disabled-src', 1, 3, 3, 3),
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
            default: NineSlice('buttongroupcenter-1-default-src', 1, 3, 3, 3),
            hovering: NineSlice('buttongroupcenter-1-hovering-src', 2, 3, 3, 3),
            selected: NineSlice('buttongroupcenter-1-selected-src', 1, 3, 3, 3),
            disabled: NineSlice('buttongroupcenter-1-disabled-src', 1, 3, 3, 3),
        },
        layout: {
            paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
        textStyle: 'text-style-button-regular', textColor: '#ffffff',
    },
    // white (default/selected/disabled reuse '0' art; hover gets its own '2'-specific asset)
    2: {
        states: {
            default: NineSlice('buttongroupcenter-0-default-src', 1, 3, 3, 3),
            hovering: NineSlice('buttongroupcenter-2-hovering-src', 2, 3, 3, 3),
            selected: NineSlice('buttongroupcenter-0-selected-src', 1, 3, 3, 3),
            disabled: NineSlice('buttongroupcenter-0-disabled-src', 1, 3, 3, 3),
        },
        layout: {
            paddingLeft: 8, paddingTop: 4, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
        textStyle: 'text-style-button-regular', textColor: '#000000',
    },
    // landing view / IL button size (reuses '0' art, no hover-thinning)
    100: {
        states: {
            default: NineSlice('buttongroupcenter-0-default-src', 1, 3, 3, 3),
            hovering: NineSlice('buttongroupcenter-0-hovering-src', 1, 3, 3, 3),
            selected: NineSlice('buttongroupcenter-0-selected-src', 1, 3, 3, 3),
            disabled: NineSlice('buttongroupcenter-0-disabled-src', 1, 3, 3, 3),
        },
        layout: {
            paddingLeft: 13, paddingTop: 3, paddingRight: 13, paddingBottom: 3,
            minWidth: 28, minHeight: 28,
        },
        textStyle: 'text-style-il-button', textColor: '#000000',
    },
};

export type ButtonGroupCenterProps = ButtonGroupComponentProps;

export const ButtonGroupCenter = createButtonGroupComponent('ButtonGroupCenter', 'buttonGroupCenter', BUTTON_GROUP_CENTER_VARIANTS);

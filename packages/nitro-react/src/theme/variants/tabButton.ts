import { NineSlice } from '../layer';
import { ThemeVariants, ThemeWithStatesVariant } from '../utils';

/** `TabButton` variants - the Flash `style` ids it draws. */
export type TabButtonVariant = ThemeWithStatesVariant;

const TRIM_BOTTOM_BORDER = { bottom: 0 };

export const TAB_BUTTON_VARIANTS: ThemeVariants<TabButtonVariant> = {
    // default
    0: {
        states: {
            default: NineSlice('tabbutton-0-default-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            hovering: NineSlice('tabbutton-0-hovering-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            selected: NineSlice('tabbutton-0-selected-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
        },
        layout: {
            paddingLeft: 8, paddingTop: 2, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
        textStyle: 'text-style-button-tab',
        textColor: '#000000',
    },
    // black
    1: {
        states: {
            default: NineSlice('tabbutton-1-default-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            hovering: NineSlice('tabbutton-1-hovering-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            selected: NineSlice('tabbutton-1-selected-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
        },
        layout: {
            paddingLeft: 8, paddingTop: 2, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
        textStyle: 'text-style-button-tab',
        textColor: '#ffffff',
    },
    // white - reuses variant '0's art wholesale
    2: {
        states: {
            default: NineSlice('tabbutton-0-default-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            hovering: NineSlice('tabbutton-0-hovering-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
            selected: NineSlice('tabbutton-0-selected-src', 5, 5, 5, 2, TRIM_BOTTOM_BORDER),
        },
        layout: {
            paddingLeft: 8, paddingTop: 2, paddingRight: 8, paddingBottom: 4,
            minWidth: 20, minHeight: 22,
        },
        textStyle: 'text-style-button-tab',
        textColor: '#000000',
    },
    // shiny/pill
    3: {
        states: {
            default: NineSlice('tabbutton-3-default-src', 9, 0, 9, 0),
            hovering: NineSlice('tabbutton-3-hovering-src', 9, 0, 9, 0),
            selected: NineSlice('tabbutton-3-selected-src', 9, 0, 9, 0),
        },
        layout: {
            paddingLeft: 10, paddingTop: 0, paddingRight: 10, paddingBottom: 0,
            minHeight: 32, maxHeight: 32,
        },
        textStyle: 'text-style-button-shiny-regular',
        textColor: '#000000',
    },
};

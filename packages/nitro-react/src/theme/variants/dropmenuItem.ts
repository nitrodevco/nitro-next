import { Stretch } from '../layer';
import { ThemeVariants, ThemeWithStatesVariant } from '../utils';

/** `DropmenuItem` variants - the Flash `style` ids it draws. */
export type DropmenuItemVariant = ThemeWithStatesVariant;

export const DROPMENU_ITEM_VARIANTS: ThemeVariants<DropmenuItemVariant> = {
    0: {
        states: {
            default: Stretch('dropmenuitem-0-default-src'),
            hovering: Stretch('dropmenuitem-0-hovering-src'),
            selected: Stretch('dropmenuitem-0-selected-src'),
        },
        layout: {
            paddingLeft: 4,
            paddingTop: 1,
            paddingRight: 4,
            paddingBottom: 2,
        },
        textStyle: 'text-style-regular',
        textColor: '#000000',
    },
    1: {
        states: {
            default: Stretch('dropmenuitem-1-default-src'),
            hovering: Stretch('dropmenuitem-1-hovering-src'),
            selected: Stretch('dropmenuitem-1-selected-src'),
        },
        layout: {
            paddingLeft: 4,
            paddingTop: 1,
            paddingRight: 4,
            paddingBottom: 2,
        },
        textStyle: 'text-style-regular',
        textColor: '#ffffff',
    },
    3: {
        states: {
            default: Stretch('dropmenuitem-0-default-src'),
            hovering: Stretch('dropmenuitem-3-hovering-src'),
            selected: Stretch('dropmenuitem-3-selected-src'),
        },
        layout: {
            paddingLeft: 4,
            paddingTop: 2,
            paddingRight: 4,
            paddingBottom: 4,
        },
        textStyle: 'text-style-u-regular',
        textColor: '#000000',
    },
    100: {
        states: {
            default: Stretch('dropmenuitem-0-default-src'),
            hovering: Stretch('dropmenuitem-3-hovering-src'),
            selected: Stretch('dropmenuitem-3-selected-src'),
        },
        layout: {
            paddingLeft: 4,
            paddingTop: 1,
            paddingRight: 4,
            paddingBottom: 2,
        },
        textStyle: 'text-style-il-regular',
        textColor: '#000000',
    },
};

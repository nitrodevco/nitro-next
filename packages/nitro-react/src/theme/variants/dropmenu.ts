import { NineSlice, Stretch } from '../layer';
import { ThemeVariant, ThemeVariants, ThemeWithStatesVariant } from '../utils';

/** `Dropmenu` variants - the Flash `style` ids it draws. */
export type DropmenuVariant = (ThemeVariant | ThemeWithStatesVariant) & {
    arrowTextureKey?: string;
};

export const DROPMENU_VARIANTS: ThemeVariants<DropmenuVariant> = {
    0: { layer: NineSlice('dropmenu-0-default-src', 3, 3, 3, 3), arrowTextureKey: 'dropmenu-0-default-arrow-src', layout: { minWidth: 40, minHeight: 22 }, textStyle: 'text-style-regular', textColor: '#000000' },
    1: { layer: NineSlice('button-1-default-src', 3, 3, 3, 3), arrowTextureKey: 'dropmenu-1-default-arrow-src', layout: { minWidth: 40, minHeight: 22 }, textStyle: 'text-style-regular', textColor: '#ffffff' },
    3: {
        states: {
            default: Stretch('dropmenu-3-default-src'),
            hovering: Stretch('dropmenu-3-hovering-src'),
        },
        layout: {
            minWidth: 40, minHeight: 23,
        },
        textStyle: 'text-style-u-regular', textColor: '#000000',
    },
    100: { layer: NineSlice('dropmenu-0-default-src', 3, 3, 3, 3), arrowTextureKey: 'dropmenu-0-default-arrow-src', layout: { minWidth: 40, minHeight: 22 }, textStyle: 'text-style-il-regular', textColor: '#000000' },
};

import { Stretch } from '../layer';
import { ThemeVariants, ThemeWithStatesVariant } from '../utils';

/** `DroplistItem` variants - the Flash `style` ids it draws. */
export type DroplistItemVariant = ThemeWithStatesVariant;

export const DROPLIST_ITEM_VARIANTS: ThemeVariants<DroplistItemVariant> = {
    0: {
        states: {
            default: Stretch('dropmenuitem-0-default-src'),
            hovering: Stretch('dropmenuitem-0-hovering-src'),
            selected: Stretch('dropmenuitem-0-selected-src'),
        },
        layout: {
            minWidth: 5,
            minHeight: 19,
        },
    },
};

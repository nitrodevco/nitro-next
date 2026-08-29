import { Stretch } from '../layer';
import { ThemeVariants, ThemeWithStatesVariant } from '../utils';
import { defineVariants } from './defineVariants';

/**
 * `DroplistItem` variants - the Flash `style` ids of `droplist_item` elements: the element description's view/colour
 * (see ./elements.ts) merged with the art layers drawn here.
 */
export type DroplistItemVariant = ThemeWithStatesVariant;

export const DROPLIST_ITEM_VARIANTS: ThemeVariants<DroplistItemVariant> = defineVariants<DroplistItemVariant>('droplist_item', {
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
});

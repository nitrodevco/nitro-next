/**
 * `selectors/FurniOnFurni` (FURNI_ON_FURNI) - selects furni by how they stack with the furni of
 * its source.
 *
 * Int params: `[ selection type ]` - `onfurni.0` to `.3` (the server's furni above, furni under,
 * same height, everything on the tile).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { SelectorCodes } from './selectorCodes';

/** The radio's ids. */
export const FURNI_ON_FURNI_IDS = [ 0, 1, 2, 3 ];

export interface FurniOnFurniSelectorForm {
    selectionType: number;
}

export const furniOnFurniSelector: WiredElementDefinition<FurniOnFurniSelectorForm> = {
    holder: 'selector',
    code: SelectorCodes.FURNI_ON_FURNI,
    createForm: triggerable => ({ selectionType: getWiredInt(triggerable, 0) }),
    readIntParams: form => [ form.selectionType ],
};

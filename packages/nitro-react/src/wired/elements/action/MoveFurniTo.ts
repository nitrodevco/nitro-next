/**
 * `actiontypes/MoveFurniTo` (`wf_act_move_furni_to`) - moves the furni of the first selection
 * next to the furni of the second, in a direction and up to a number of empty tiles away.
 *
 * Int params: `[ direction, empty tiles ]` - the direction 0, 2, 4 or 6, the tiles 1 to 5. Each
 * furni selection is titled `wiredfurni.params.sources.furni.title.mv.<id>`.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** `createSliderSection("wiredfurni.params.emptytiles", "tiles", CONVERTER_ECHO, 1, 5, 1)`. */
export const MOVE_FURNI_TO_MIN_TILES = 1;
export const MOVE_FURNI_TO_MAX_TILES = 5;

export interface MoveFurniToActionForm {
    direction: number;
    tiles: number;
}

export const moveFurniToAction: WiredElementDefinition<MoveFurniToActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.MOVE_FURNI_TO,
    createForm: triggerable => ({ direction: getWiredInt(triggerable, 0), tiles: getWiredInt(triggerable, 1) }),
    readIntParams: form => [ form.direction, form.tiles ],
    furniSelectionTitle: id => `wiredfurni.params.sources.furni.title.mv.${id}`,
};

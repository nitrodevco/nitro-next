/**
 * `actiontypes/SetFurniStateTo` (`wf_act_match_to_sshot`, code `§_-T10§`) - puts the selected furni
 * back to the snapshot taken of them: their state, direction, position and altitude, each only
 * when ticked.
 *
 * Int params: four flags, `[ state, direction, position, altitude ]`. The box has a state
 * snapshot, so the header offers "apply snapshot" and room clicks always pick furni.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** The snapshot parts, in int param order - each captioned `wiredfurni.params.condition.<part>`. */
export const SET_FURNI_STATE_TO_PARTS = [ 'state', 'direction', 'position', 'altitude' ];

export interface SetFurniStateToActionForm {
    /** One flag per `SET_FURNI_STATE_TO_PARTS` entry. */
    parts: boolean[];
}

export const setFurniStateToAction: WiredElementDefinition<SetFurniStateToActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.SET_FURNI_STATE_TO,
    hasStateSnapshot: true,
    createForm: triggerable => ({ parts: SET_FURNI_STATE_TO_PARTS.map((_, index) => getWiredBoolean(triggerable, index)) }),
    readIntParams: form => form.parts.map(selected => (selected ? 1 : 0)),
};

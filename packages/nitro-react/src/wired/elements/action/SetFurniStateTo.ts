/**
 * `actiontypes/SetFurniStateTo` (`wf_act_match_to_sshot`, code `§_-T10§`) - puts the selected furni
 * back to the snapshot taken of them: their state, direction, position and altitude, each only
 * when ticked.
 *
 * Int params: four flags, `[ state, direction, position, altitude ]`. The box has a state
 * snapshot, so the header offers "apply snapshot" and room clicks always pick furni.
 */
import { flagsElement, type WiredElementDefinition, type WiredFlagsForm } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';

/**
 * The snapshot parts, in int param order - each captioned `wiredfurni.params.condition.<part>`.
 * `conditions/StatesMatch` checks the same four.
 */
export const SET_FURNI_STATE_TO_PARTS = [ 'state', 'direction', 'position', 'altitude' ];

/** One flag per `SET_FURNI_STATE_TO_PARTS` entry. */
export type SetFurniStateToActionForm = WiredFlagsForm;

export const setFurniStateToAction: WiredElementDefinition<SetFurniStateToActionForm> = {
    ...flagsElement('action', ActionTypeCodes.SET_FURNI_STATE_TO, SET_FURNI_STATE_TO_PARTS),
    hasStateSnapshot: true,
};

/**
 * `conditions/StatesMatch` (`wf_cnd_match_snapshot`) - the picked furni are as they were in the
 * box's snapshot; inverted (`NOT_STATES_MATCH`), they are not.
 *
 * Int params: `[ state, direction, position, altitude ]` - 1 for each part of the snapshot that
 * has to match (`condition.state` / `.direction` / `.position` / `.altitude`). The box has a
 * state snapshot, so it forces furni picking and shows the header's snapshot button.
 */
import { flagsElement, type WiredElementDefinition, type WiredFlagsForm } from '../../WiredElement';
import { SET_FURNI_STATE_TO_PARTS } from '../action/SetFurniStateTo';
import { ConditionCodes } from './conditionCodes';

/**
 * One flag per checkbox: `condition.state`, `.direction`, `.position`, `.altitude` - the parts
 * `SetFurniStateTo` restores (`SET_FURNI_STATE_TO_PARTS`).
 */
export type StatesMatchConditionForm = WiredFlagsForm;

export const statesMatchCondition: WiredElementDefinition<StatesMatchConditionForm> = {
    ...flagsElement('condition', ConditionCodes.STATES_MATCH, SET_FURNI_STATE_TO_PARTS),
    negativeCode: ConditionCodes.NOT_STATES_MATCH,
    hasStateSnapshot: true,
};

/**
 * `conditions/StatesMatch` (`wf_cnd_match_snapshot`) - the picked furni are as they were in the
 * box's snapshot; inverted (`NOT_STATES_MATCH`), they are not.
 *
 * Int params: `[ state, direction, position, altitude ]` - 1 for each part of the snapshot that
 * has to match (`condition.state` / `.direction` / `.position` / `.altitude`). The box has a
 * state snapshot, so it forces furni picking and shows the header's snapshot button.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';

/** The four checkboxes: `condition.state`, `.direction`, `.position`, `.altitude`. */
export const STATES_MATCH_PARTS = [ 'state', 'direction', 'position', 'altitude' ];

export interface StatesMatchConditionForm {
    /** One flag per `STATES_MATCH_PARTS` entry. */
    parts: boolean[];
}

export const statesMatchCondition: WiredElementDefinition<StatesMatchConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.STATES_MATCH,
    negativeCode: ConditionCodes.NOT_STATES_MATCH,
    hasStateSnapshot: true,
    createForm: triggerable => ({ parts: STATES_MATCH_PARTS.map((_, index) => getWiredBoolean(triggerable, index)) }),
    readIntParams: form => form.parts.map(selected => (selected ? 1 : 0)),
};

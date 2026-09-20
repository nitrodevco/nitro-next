/**
 * `conditions/§_-ze§` (USER_DIRECTION, `wf_cnd_actor_dir`) - the user faces one of the chosen
 * directions.
 *
 * Int params: `[ direction mask ]` - bit n set for the `move_<n>` arrow, 0 (north) to 7.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ConditionCodes } from './conditionCodes';

/** The eight `move_<n>` checkboxes. */
export const USER_DIRECTION_DIRECTIONS = 8;

export interface UserDirectionConditionForm {
    /** Only the bits the checkboxes have. */
    directions: number;
}

export const userDirectionCondition: WiredElementDefinition<UserDirectionConditionForm> = {
    holder: 'condition',
    code: ConditionCodes.USER_DIRECTION,
    createForm: triggerable => ({ directions: getWiredInt(triggerable, 0) & ((1 << USER_DIRECTION_DIRECTIONS) - 1) }),
    readIntParams: form => [ form.directions ],
};

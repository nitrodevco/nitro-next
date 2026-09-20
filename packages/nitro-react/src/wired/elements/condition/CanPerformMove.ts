/**
 * `conditions/§_-E1C§` (CAN_PERFORM_MOVE, `wf_cnd_valid_moves`) - the move the stack is about to make is possible.
 *
 * No params, no inputs (`INPUTS_TYPE_NONE`) and no inverted twin.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ConditionCodes } from './conditionCodes';

export const canPerformMoveCondition: WiredElementDefinition<Record<string, never>> = {
    holder: 'condition',
    code: ConditionCodes.CAN_PERFORM_MOVE,
    createForm: () => ({}),
};

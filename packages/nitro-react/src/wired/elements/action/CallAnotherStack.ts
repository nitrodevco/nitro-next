/**
 * `actiontypes/§_-Sa§` (CALL_ANOTHER_STACK, negative NEG_CALL_ANOTHER_STACK) - runs the stacks
 * under the picked furni. The negative code is the same box in its inverted form, served by
 * this element. No params and no inputs (`INPUTS_TYPE_NONE`); only the furni selection.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';

export const callAnotherStackAction: WiredElementDefinition<Record<string, never>> = {
    holder: 'action',
    code: ActionTypeCodes.CALL_ANOTHER_STACK,
    negativeCode: ActionTypeCodes.NEG_CALL_ANOTHER_STACK,
    createForm: () => ({}),
};

/**
 * `actiontypes/§_-B2O§` (FLEE) - the picked furni move away from the nearest user.
 * No params and no inputs (`INPUTS_TYPE_NONE`); only the furni selection.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';

export const fleeAction: WiredElementDefinition<Record<string, never>> = {
    holder: 'action',
    code: ActionTypeCodes.FLEE,
    createForm: () => ({}),
};

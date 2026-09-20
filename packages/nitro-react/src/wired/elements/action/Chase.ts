/**
 * `actiontypes/§_-u1x§` (CHASE) - the picked furni move towards the nearest user.
 * No params and no inputs (`INPUTS_TYPE_NONE`); only the furni selection.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';

export const chaseAction: WiredElementDefinition<Record<string, never>> = {
    holder: 'action',
    code: ActionTypeCodes.CHASE,
    createForm: () => ({}),
};

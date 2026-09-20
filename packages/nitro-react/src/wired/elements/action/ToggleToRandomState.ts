/**
 * `actiontypes/§_-aG§` (TOGGLE_TO_RANDOM_STATE) - sets each picked furni to a random one of its
 * states. No params and no inputs (`INPUTS_TYPE_NONE`); only the furni selection.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';

export const toggleToRandomStateAction: WiredElementDefinition<Record<string, never>> = {
    holder: 'action',
    code: ActionTypeCodes.TOGGLE_TO_RANDOM_STATE,
    createForm: () => ({}),
};

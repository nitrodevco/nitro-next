/**
 * `actiontypes/§_-G2j§` (REMOVE_FURNI) - takes the selected furni out of the room (the
 * counterpart of `PlaceFurni`). No params and no inputs (`INPUTS_TYPE_NONE`); the advanced
 * input sources are always shown.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { ActionTypeCodes } from './actionCodes';

export const removeFurniAction: WiredElementDefinition<Record<string, never>> = {
    holder: 'action',
    code: ActionTypeCodes.REMOVE_FURNI,
    createForm: () => ({}),
    advancedAlwaysVisible: true,
};

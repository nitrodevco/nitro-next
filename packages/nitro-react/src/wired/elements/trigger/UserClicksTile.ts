/**
 * `triggerconfs/§_-Jc§` (USER_CLICKS_TILE) - fires when a user clicks a tile. No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const userClicksTileTrigger: WiredElementDefinition<Record<string, never>> = {
    holder: 'trigger',
    code: TriggerConfCodes.USER_CLICKS_TILE,
    createForm: () => ({}),
};

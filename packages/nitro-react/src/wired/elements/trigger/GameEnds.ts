/**
 * `triggerconfs/§_-h1g§` (GAME_ENDS) - fires when a game ends. No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const gameEndsTrigger: WiredElementDefinition<Record<string, never>> = {
    holder: 'trigger',
    code: TriggerConfCodes.GAME_ENDS,
    createForm: () => ({}),
};

/**
 * `triggerconfs/§_-d1w§` (GAME_STARTS) - fires when a game starts. No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const gameStartsTrigger: WiredElementDefinition<Record<string, never>> = {
    holder: 'trigger',
    code: TriggerConfCodes.GAME_STARTS,
    createForm: () => ({}),
};

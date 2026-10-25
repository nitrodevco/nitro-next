/**
 * `triggerconfs/§_-d1w§` (GAME_STARTS) - fires when a game starts. No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import { noInputElement } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const gameStartsTrigger = noInputElement('trigger', TriggerConfCodes.GAME_STARTS);

/**
 * `triggerconfs/§_-h1g§` (GAME_ENDS) - fires when a game ends. No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import { noInputElement } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const gameEndsTrigger = noInputElement('trigger', TriggerConfCodes.GAME_ENDS);

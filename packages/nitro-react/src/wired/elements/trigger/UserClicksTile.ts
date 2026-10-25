/**
 * `triggerconfs/§_-Jc§` (USER_CLICKS_TILE) - fires when a user clicks a tile. No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import { noInputElement } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const userClicksTileTrigger = noInputElement('trigger', TriggerConfCodes.USER_CLICKS_TILE);

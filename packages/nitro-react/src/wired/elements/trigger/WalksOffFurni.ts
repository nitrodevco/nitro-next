/**
 * `triggerconfs/§_-z18§` (AVATAR_WALKS_OFF_FURNI) - fires when a user walks off one of the picked furni. No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import { noInputElement } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const walksOffFurniTrigger = noInputElement('trigger', TriggerConfCodes.AVATAR_WALKS_OFF_FURNI);

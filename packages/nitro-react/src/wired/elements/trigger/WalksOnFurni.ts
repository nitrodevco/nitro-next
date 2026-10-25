/**
 * `triggerconfs/§_-a2j§` (AVATAR_WALKS_ON_FURNI) - fires when a user walks onto one of the picked furni. No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import { noInputElement } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const walksOnFurniTrigger = noInputElement('trigger', TriggerConfCodes.AVATAR_WALKS_ON_FURNI);

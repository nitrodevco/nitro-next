/**
 * `triggerconfs/§_-O16§` (USE_STUFF) - fires when one of the picked furni changes state (is used). No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import { noInputElement } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const useStuffTrigger = noInputElement('trigger', TriggerConfCodes.USE_STUFF);

/**
 * `triggerconfs/§_-81g§` (RECEIVE_SIGNAL) - fires when one of the picked antennas receives a signal. No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import { noInputElement } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const receiveSignalTrigger = noInputElement('trigger', TriggerConfCodes.RECEIVE_SIGNAL);

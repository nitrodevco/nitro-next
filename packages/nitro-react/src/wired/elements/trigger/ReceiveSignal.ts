/**
 * `triggerconfs/§_-81g§` (RECEIVE_SIGNAL) - fires when one of the picked antennas receives a signal. No params and no inputs (`INPUTS_TYPE_NONE`).
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const receiveSignalTrigger: WiredElementDefinition<Record<string, never>> = {
    holder: 'trigger',
    code: TriggerConfCodes.RECEIVE_SIGNAL,
    createForm: () => ({}),
};

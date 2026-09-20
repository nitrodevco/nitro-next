/**
 * `triggerconfs/§_-p6§` (TRANSACTION_COMPLETED) - fires when a transaction through the room's
 * wired contracts completes. No params; its only input is the usage info.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const transactionCompletedTrigger: WiredElementDefinition<Record<string, never>> = {
    holder: 'trigger',
    code: TriggerConfCodes.TRANSACTION_COMPLETED,
    createForm: () => ({}),
};

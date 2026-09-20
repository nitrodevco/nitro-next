/**
 * `triggerconfs/§_-aw§` (TRANSACTION_FAILED) - fires when a transaction through the room's wired
 * contracts fails. No params; its inputs are the usage info and a link to the variable that holds
 * the failure reason in the wired menu.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

/** `viewInMenuCallback`'s client link. */
export const TRANSACTION_FAILED_REASON_LINK = 'wiredmenu/open/variable_overview/@event.transaction_failed.reason';

export const transactionFailedTrigger: WiredElementDefinition<Record<string, never>> = {
    holder: 'trigger',
    code: TriggerConfCodes.TRANSACTION_FAILED,
    createForm: () => ({}),
};

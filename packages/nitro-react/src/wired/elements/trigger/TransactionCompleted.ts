/**
 * `triggerconfs/§_-p6§` (TRANSACTION_COMPLETED) - fires when a transaction through the room's
 * wired contracts completes. No params; its only input is the usage info.
 */
import { noInputElement } from '../../WiredElement';
import { TriggerConfCodes } from './triggerCodes';

export const transactionCompletedTrigger = noInputElement('trigger', TriggerConfCodes.TRANSACTION_COMPLETED);

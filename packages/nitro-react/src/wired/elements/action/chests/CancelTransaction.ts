/**
 * `actiontypes/chests/§_-P2m§` (CANCEL_TRANSACTION) - cancels a wired transaction (a contract
 * started by `§_-qN§`, INITIATE_TRANSACTION).
 *
 * Int params: `[ match criteria ]` - `wiredfurni.params.cancel_transaction.match_criteria.0` or
 * `.1`; with 1 the furni selection does not apply and greys out.
 */
import { WIRED_SOURCE_FURNI, type WiredElementDefinition } from '../../../WiredElement';
import { getWiredInt } from '../../../WiredTriggerable';
import { ActionTypeCodes } from '../actionCodes';

/** The match criteria radio's id that ignores the furni selection. */
export const CANCEL_TRANSACTION_IGNORE_FURNI = 1;

export interface CancelTransactionActionForm {
    matchCriteria: number;
}

export const cancelTransactionAction: WiredElementDefinition<CancelTransactionActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.CANCEL_TRANSACTION,
    createForm: triggerable => ({ matchCriteria: getWiredInt(triggerable, 0) }),
    readIntParams: form => [ form.matchCriteria ],
    isInputSourceDisabled: (form, id, sourceType) =>
        (sourceType === WIRED_SOURCE_FURNI) && (id === 0) && (form.matchCriteria === CANCEL_TRANSACTION_IGNORE_FURNI),
};

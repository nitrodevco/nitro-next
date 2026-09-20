// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { ITradeRequirementRule } from '../../Data/ITradeRequirementRule';

/** Flash `WiredTransactionSuccessContents._-F2o`: the success type that carries a reward. */
export const WIRED_TRANSACTION_SUCCESS_REWARD = 2;

/**
 * Flash `WiredTransactionSuccessContents`. Flash also stamps each one with an `internalId` from a
 * counter in the parser, to tell two notifications apart; that is the client's bookkeeping, not
 * part of the packet, and is left to whoever lists them.
 */
export interface IWiredTransactionSuccessContents {
    /** Shown as `wired_transactions.notification.success.<id>`. */
    transactionSuccessTypeId: number;
    /** The three reward fields come with `WIRED_TRANSACTION_SUCCESS_REWARD`, and only when the server sent them. */
    rewardContents?: ITradeRequirementRule;
    rewardText?: string;
    openByDefault?: boolean;
}

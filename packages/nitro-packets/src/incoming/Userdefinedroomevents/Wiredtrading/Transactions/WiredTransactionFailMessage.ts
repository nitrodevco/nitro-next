// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredTransactionFailMessageType = {
    /** Shown as `wired_transactions.notification.fail.<id>`; `WiredTradeCancelledMessage` uses the same ids. */
    transactionFailureTypeId: number;
};

/** A wired transaction was refused. Flash parser `_-G2P._-025`. */
export class WiredTransactionFailMessage implements IIncomingPacket<WiredTransactionFailMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredTransactionFailMessageType {
        const transactionFailureTypeId = wrapper.readInt();

        return { transactionFailureTypeId };
    }
}

// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredTradeCancelledMessageType = {
    /** Why, in the ids `WiredTransactionFailMessage` uses (text `wired_transactions.notification.fail.<id>`). */
    transactionFailureTypeId: number;
};

/** The wired trade was called off. Flash parser `wiredtrading.trade._-Ge`. */
export class WiredTradeCancelledMessage implements IIncomingPacket<WiredTradeCancelledMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredTradeCancelledMessageType {
        const transactionFailureTypeId = wrapper.readInt();

        return { transactionFailureTypeId };
    }
}

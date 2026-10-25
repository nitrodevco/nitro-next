// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type WiredTradeTransactionNotificationMessageType = {
    /** Shown as `wired_transactions.notification.trade_error.<id>`. */
    tradeTransactionNotificationId: number;
};

/** A notice about a wired trade, by id. Flash parser `wiredtrading.trade._-uH`. */
export class WiredTradeTransactionNotificationMessage implements IIncomingPacket<WiredTradeTransactionNotificationMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredTradeTransactionNotificationMessageType {
        const tradeTransactionNotificationId = wrapper.readInt();

        return { tradeTransactionNotificationId };
    }
}

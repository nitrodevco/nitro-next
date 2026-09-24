// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TradeOpenFailedEventPaserMessageType = {
    /** Names the `inventory.trading.openfail.<reason>` text; 7 and 8 are "a trade is already open". */
    reason: number;
    otherUserName: string;
};

/** Flash `TradeOpenFailedParser`. */
export class TradeOpenFailedEventPaserMessage implements IIncomingPacket<TradeOpenFailedEventPaserMessageType> {
    public parse(wrapper: IMessageDataWrapper): TradeOpenFailedEventPaserMessageType {
        return {
            reason: wrapper.readInt(),
            otherUserName: wrapper.readString(),
        };
    }
}

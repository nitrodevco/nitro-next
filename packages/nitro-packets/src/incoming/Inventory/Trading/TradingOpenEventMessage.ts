// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TradingOpenEventMessageType = {
    /** The user the trade opened for - matched against the session's own id to tell the two sides apart. */
    userId: number;
    userCanTrade: boolean;
    otherUserId: number;
    otherUserCanTrade: boolean;
};

/** Flash `TradingOpenParser`: the two sides of a trade that has just opened, each with its trading right. */
export class TradingOpenEventMessage implements IIncomingPacket<TradingOpenEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): TradingOpenEventMessageType {
        return {
            userId: wrapper.readInt(),
            userCanTrade: wrapper.readInt() === 1,
            otherUserId: wrapper.readInt(),
            otherUserCanTrade: wrapper.readInt() === 1,
        };
    }
}

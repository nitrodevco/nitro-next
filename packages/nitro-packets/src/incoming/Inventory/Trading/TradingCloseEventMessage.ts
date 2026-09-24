// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TradingCloseEventMessageType = {
    /** Who closed it: the session's own id means the user did it themselves. */
    userId: number;
    /** `TRADING_CLOSE_REASON_COMMIT_ERROR` is 1; anything else is one side walking away. */
    reason: number;
};

/** Flash `TradingCloseParser`. */
export class TradingCloseEventMessage implements IIncomingPacket<TradingCloseEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): TradingCloseEventMessageType {
        return {
            userId: wrapper.readInt(),
            reason: wrapper.readInt(),
        };
    }
}

// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TradingAcceptEventMessageType = {
    userId: number;
    userAccepts: boolean;
};

/** Flash `TradingAcceptParser`: one side has accepted, or taken its acceptance back. */
export class TradingAcceptEventMessage implements IIncomingPacket<TradingAcceptEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): TradingAcceptEventMessageType {
        return {
            userId: wrapper.readInt(),
            userAccepts: wrapper.readInt() > 0,
        };
    }
}

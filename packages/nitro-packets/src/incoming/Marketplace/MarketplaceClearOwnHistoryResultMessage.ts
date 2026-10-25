// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** Flash `MarketplaceClearOwnHistoryResultEvent` (parser `§_-82t§`). */
export type MarketplaceClearOwnHistoryResultMessageType = {
    success: boolean;
};

export class MarketplaceClearOwnHistoryResultMessage implements IIncomingPacket<MarketplaceClearOwnHistoryResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): MarketplaceClearOwnHistoryResultMessageType {
        const success = wrapper.readBoolean();

        return { success };
    }
}

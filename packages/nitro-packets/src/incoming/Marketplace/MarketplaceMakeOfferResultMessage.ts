// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** Flash `MarketplaceMakeOfferResult` (parser `§_-Kq§`): 1 is success, anything else the `inventory.marketplace.result.<n>` text. */
export type MarketplaceMakeOfferResultMessageType = {
    result: number;
};

export class MarketplaceMakeOfferResultMessage implements IIncomingPacket<MarketplaceMakeOfferResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): MarketplaceMakeOfferResultMessageType {
        const result = wrapper.readInt();

        return { result };
    }
}

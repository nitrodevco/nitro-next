// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseInts } from '@nitrodevco/nitro-api';

/** Flash `MarketplaceCancelAllOffersResultEvent` (parser `§_-a1o§`): the offers taken back, then whether it worked. */
export type MarketplaceCancelAllOffersResultMessageType = {
    offerIds: number[];
    success: boolean;
};

export class MarketplaceCancelAllOffersResultMessage implements IIncomingPacket<MarketplaceCancelAllOffersResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): MarketplaceCancelAllOffersResultMessageType {
        const offerIds = ParseInts(wrapper);
        const success = wrapper.readBoolean();

        return { offerIds, success };
    }
}

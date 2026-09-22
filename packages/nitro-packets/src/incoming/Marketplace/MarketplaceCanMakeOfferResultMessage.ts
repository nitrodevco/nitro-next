// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** Flash `MarketplaceCanMakeOfferResult` (parser `§_-pi§`): what `MarketplaceModel.proceedOfferMaking` switches on. */
export type MarketplaceCanMakeOfferResultMessageType = {
    resultCode: number;
    tokenCount: number;
};

export class MarketplaceCanMakeOfferResultMessage implements IIncomingPacket<MarketplaceCanMakeOfferResultMessageType> {
    public parse(wrapper: IMessageDataWrapper): MarketplaceCanMakeOfferResultMessageType {
        const resultCode = wrapper.readInt();
        const tokenCount = wrapper.readInt();

        return { resultCode, tokenCount };
    }
}

// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** Flash `BuyMarketplaceOfferMessageComposer`: the offer to buy. */
export type BuyMarketplaceOfferComposerType = {
    offerId: number;
};

export class BuyMarketplaceOfferComposer implements IOutgoingPacket<BuyMarketplaceOfferComposerType> {
    public constructor(private params: BuyMarketplaceOfferComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.offerId,
        ];
    }
}

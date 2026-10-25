// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** Flash `CancelMarketplaceOfferMessageComposer`: take an own offer back (`HabboCatalog.redeemExpiredMarketPlaceOffer`). */
export type CancelMarketplaceOfferComposerType = {
    offerId: number;
};

export class CancelMarketplaceOfferComposer implements IOutgoingPacket<CancelMarketplaceOfferComposerType> {
    public constructor(private params: CancelMarketplaceOfferComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.offerId,
        ];
    }
}

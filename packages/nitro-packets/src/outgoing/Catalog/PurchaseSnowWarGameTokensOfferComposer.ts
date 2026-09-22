// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PurchaseSnowWarGameTokensOfferComposerType = {
    offerId: number;
};

/** `PurchaseSnowWarGameTokensOfferComposer`: `HabboCatalog.purchaseGameTokensOffer`. */
export class PurchaseSnowWarGameTokensOfferComposer implements IOutgoingPacket<PurchaseSnowWarGameTokensOfferComposerType> {
    public constructor(private params: PurchaseSnowWarGameTokensOfferComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.offerId,
        ];
    }
}

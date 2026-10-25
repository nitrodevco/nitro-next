// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ShopTargetedOfferViewedComposerType = {
    targetedOfferId: number;
    trackingState: number;
};

export class ShopTargetedOfferViewedComposer implements IOutgoingPacket<ShopTargetedOfferViewedComposerType> {
    public constructor(private params: ShopTargetedOfferViewedComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.targetedOfferId,
            this.params.trackingState,
        ];
    }
}

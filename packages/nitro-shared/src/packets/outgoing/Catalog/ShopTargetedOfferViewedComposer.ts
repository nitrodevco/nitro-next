import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ShopTargetedOfferViewedComposerType = {
    targetedOfferId: number;
    trackingState: number;
};

export class ShopTargetedOfferViewedComposer implements IOutgoingPacket<ShopTargetedOfferViewedComposerType> {
    public constructor(private params: ShopTargetedOfferViewedComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.targetedOfferId,
            this.params.trackingState,
        ];
    }
}

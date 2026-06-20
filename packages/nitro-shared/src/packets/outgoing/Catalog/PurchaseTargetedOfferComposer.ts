import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PurchaseTargetedOfferComposerType = {
    offerId: number;
    quantity: number;
};

export class PurchaseTargetedOfferComposer implements IOutgoingPacket<PurchaseTargetedOfferComposerType> {
    public constructor(private params: PurchaseTargetedOfferComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.offerId,
            this.params.quantity,
        ];
    }
}

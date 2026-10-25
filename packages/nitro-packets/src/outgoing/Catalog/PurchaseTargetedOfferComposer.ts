// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PurchaseTargetedOfferComposerType = {
    offerId: number;
    quantity: number;
};

export class PurchaseTargetedOfferComposer implements IOutgoingPacket<PurchaseTargetedOfferComposerType> {
    public constructor(private params: PurchaseTargetedOfferComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.offerId,
            this.params.quantity,
        ];
    }
}

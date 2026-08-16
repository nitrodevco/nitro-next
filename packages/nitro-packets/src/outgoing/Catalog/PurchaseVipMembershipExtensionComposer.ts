import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PurchaseVipMembershipExtensionComposerType = {
    offerId: number;
};

export class PurchaseVipMembershipExtensionComposer implements IOutgoingPacket<PurchaseVipMembershipExtensionComposerType> {
    public constructor(private params: PurchaseVipMembershipExtensionComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.offerId,
        ];
    }
}

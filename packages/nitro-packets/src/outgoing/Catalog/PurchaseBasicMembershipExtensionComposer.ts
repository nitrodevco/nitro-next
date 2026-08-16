import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PurchaseBasicMembershipExtensionComposerType = {
    offerId: number;
};

export class PurchaseBasicMembershipExtensionComposer implements IOutgoingPacket<PurchaseBasicMembershipExtensionComposerType> {
    public constructor(private params: PurchaseBasicMembershipExtensionComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.offerId,
        ];
    }
}

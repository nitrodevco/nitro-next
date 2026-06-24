import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PurchaseFromCatalogComposerType = {
    pageId: number;
    offerId: number;
    extraParam: string;
    quantity: number;
};

export class PurchaseFromCatalogComposer implements IOutgoingPacket<PurchaseFromCatalogComposerType> {
    public constructor(private params: PurchaseFromCatalogComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.pageId,
            this.params.offerId,
            this.params.extraParam,
            this.params.quantity,
        ];
    }
}

import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PurchaseRoomAdMessageComposerType = {
    pageId: number;
    offerId: number;
    flatId: number;
    name: string;
    extended: boolean;
    description: string;
    categoryId: number;
};

export class PurchaseRoomAdMessageComposer implements IOutgoingPacket<PurchaseRoomAdMessageComposerType> {
    public constructor(private params: PurchaseRoomAdMessageComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.pageId,
            this.params.offerId,
            this.params.flatId,
            this.params.name,
            this.params.extended,
            this.params.description,
            this.params.categoryId,
        ];
    }
}

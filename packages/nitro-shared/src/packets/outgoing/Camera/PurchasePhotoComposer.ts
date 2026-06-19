import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PurchasePhotoComposerType = object;

export class PurchasePhotoComposer implements IOutgoingPacket<PurchasePhotoComposerType> {
    public constructor(private params: PurchasePhotoComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}

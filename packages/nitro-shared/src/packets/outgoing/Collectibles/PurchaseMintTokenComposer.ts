import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PurchaseMintTokenComposerType = object;

export class PurchaseMintTokenComposer implements IOutgoingPacket<PurchaseMintTokenComposerType> {
    public constructor(private params: PurchaseMintTokenComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}

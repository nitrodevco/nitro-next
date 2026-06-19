import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ExtendRentOrBuyoutStripItemComposerType = object;

export class ExtendRentOrBuyoutStripItemComposer implements IOutgoingPacket<ExtendRentOrBuyoutStripItemComposerType> {
    public constructor(private params: ExtendRentOrBuyoutStripItemComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}

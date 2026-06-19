import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ExtendRentOrBuyoutFurniComposerType = object;

export class ExtendRentOrBuyoutFurniComposer implements IOutgoingPacket<ExtendRentOrBuyoutFurniComposerType> {
    public constructor(private params: ExtendRentOrBuyoutFurniComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}

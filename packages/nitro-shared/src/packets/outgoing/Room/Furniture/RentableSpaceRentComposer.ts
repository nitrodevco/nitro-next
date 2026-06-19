import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RentableSpaceRentComposerType = object;

export class RentableSpaceRentComposer implements IOutgoingPacket<RentableSpaceRentComposerType> {
    public constructor(private params: RentableSpaceRentComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}

import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RentableSpaceCancelRentComposerType = object;

export class RentableSpaceCancelRentComposer implements IOutgoingPacket<RentableSpaceCancelRentComposerType> {
    public constructor(private params: RentableSpaceCancelRentComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}

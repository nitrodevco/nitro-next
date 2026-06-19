import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RentableSpaceStatusComposerType = object;

export class RentableSpaceStatusComposer implements IOutgoingPacket<RentableSpaceStatusComposerType> {
    public constructor(private params: RentableSpaceStatusComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}

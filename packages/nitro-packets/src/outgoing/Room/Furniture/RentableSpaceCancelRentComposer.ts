// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RentableSpaceCancelRentComposerType = {
    /** The rentable space in the room. */
    objectId: number;
};

export class RentableSpaceCancelRentComposer implements IOutgoingPacket<RentableSpaceCancelRentComposerType> {
    public constructor(private params: RentableSpaceCancelRentComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
        ];
    }
}

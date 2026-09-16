// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RentableSpaceStatusComposerType = {
    /** The rentable space in the room. */
    objectId: number;
};

export class RentableSpaceStatusComposer implements IOutgoingPacket<RentableSpaceStatusComposerType> {
    public constructor(private params: RentableSpaceStatusComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
        ];
    }
}

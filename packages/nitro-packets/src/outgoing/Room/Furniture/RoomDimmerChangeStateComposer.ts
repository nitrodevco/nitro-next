// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RoomDimmerChangeStateComposerType = {
    objectId: number;
};

export class RoomDimmerChangeStateComposer implements IOutgoingPacket<RoomDimmerChangeStateComposerType> {
    public constructor(private params: RoomDimmerChangeStateComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
        ];
    }
}

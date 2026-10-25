// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ChangeQueueComposerType = {
    /** A `RoomQueueTargetType` - which line to move into. */
    target: number;
};

export class ChangeQueueComposer implements IOutgoingPacket<ChangeQueueComposerType> {
    public constructor(private params: ChangeQueueComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.target,
        ];
    }
}

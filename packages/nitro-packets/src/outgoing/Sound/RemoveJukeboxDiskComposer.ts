// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveJukeboxDiskComposerType = {
    /** The slot to empty; the disk goes back to the inventory it came from. */
    slotNumber: number;
};

export class RemoveJukeboxDiskComposer implements IOutgoingPacket<RemoveJukeboxDiskComposerType> {
    public constructor(private params: RemoveJukeboxDiskComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.slotNumber,
        ];
    }
}

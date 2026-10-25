// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AddJukeboxDiskComposerType = {
    diskId: number;
    /** Where in the playlist it goes. */
    slotNumber: number;
};

export class AddJukeboxDiskComposer implements IOutgoingPacket<AddJukeboxDiskComposerType> {
    public constructor(private params: AddJukeboxDiskComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.diskId,
            this.params.slotNumber,
        ];
    }
}

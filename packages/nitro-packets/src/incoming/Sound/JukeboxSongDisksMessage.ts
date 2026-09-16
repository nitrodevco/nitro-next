// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type JukeboxSongDisksMessageType = {
    /** How many disks the jukebox holds at once. */
    maxLength: number;
    /** What is in it: the slot against the disk sitting in it. */
    songDisks: Record<number, number>;
};

export class JukeboxSongDisksMessage implements IIncomingPacket<JukeboxSongDisksMessageType> {
    public parse(wrapper: IMessageDataWrapper): JukeboxSongDisksMessageType {
        const maxLength = wrapper.readInt();
        const songDisks: Record<number, number> = {};

        let remaining = wrapper.readInt();

        while (remaining > 0) {
            const slotNumber = wrapper.readInt();

            songDisks[slotNumber] = wrapper.readInt();

            remaining--;
        }

        return { maxLength, songDisks };
    }
}

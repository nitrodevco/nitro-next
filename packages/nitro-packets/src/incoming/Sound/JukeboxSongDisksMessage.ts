// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type JukeboxSongDisk = {
    diskId: number;
    songId: number;
};

export type JukeboxSongDisksMessageType = {
    /** How many disks the jukebox holds at once. */
    maxLength: number;
    /**
     * What is in it, in playing order: `JukeboxSongDisksMessageParser` reads disk id then song id,
     * and `JukeboxPlayListController.onJukeboxSongDisksMessage` builds the playlist from them in turn.
     */
    songDisks: JukeboxSongDisk[];
};

export class JukeboxSongDisksMessage implements IIncomingPacket<JukeboxSongDisksMessageType> {
    public parse(wrapper: IMessageDataWrapper): JukeboxSongDisksMessageType {
        const maxLength = wrapper.readInt();
        const songDisks: JukeboxSongDisk[] = [];

        let remaining = wrapper.readInt();

        while (remaining > 0) {
            const diskId = wrapper.readInt();

            songDisks.push({ diskId, songId: wrapper.readInt() });

            remaining--;
        }

        return { maxLength, songDisks };
    }
}

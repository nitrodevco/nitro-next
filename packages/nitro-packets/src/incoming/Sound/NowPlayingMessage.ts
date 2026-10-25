// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NowPlayingMessageType = {
    /** -1 while the jukebox plays nothing. */
    currentSongId: number;
    /** The playing song's index in the jukebox's list (`JukeboxPlayListController.playPosition`). */
    currentPosition: number;
    nextSongId: number;
    /** The next song's index in the list. */
    nextPosition: number;
    /** Milliseconds into the playing song, so a late arrival joins it where it is (`playSong(..., syncCount / 1000, ...)`). */
    syncCount: number;
};

export class NowPlayingMessage implements IIncomingPacket<NowPlayingMessageType> {
    public parse(wrapper: IMessageDataWrapper): NowPlayingMessageType {
        const packet: NowPlayingMessageType = {
            currentSongId: wrapper.readInt(),
            currentPosition: wrapper.readInt(),
            nextSongId: wrapper.readInt(),
            nextPosition: wrapper.readInt(),
            syncCount: wrapper.readInt(),
        };

        return packet;
    }
}

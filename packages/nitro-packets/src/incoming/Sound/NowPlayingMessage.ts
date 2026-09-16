// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type NowPlayingMessageType = {
    currentSongId: number;
    /** Milliseconds into the song, so a late arrival joins it where it is. */
    currentPosition: number;
    nextSongId: number;
    nextPosition: number;
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

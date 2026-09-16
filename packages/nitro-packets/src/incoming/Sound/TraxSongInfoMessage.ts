// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { ITraxSongInfoSong } from './Data/ITraxSongInfoSong';
import { TraxSongInfoSongParser } from './Data/TraxSongInfoSongParser';

export type TraxSongInfoMessageType = {
    songs: ITraxSongInfoSong[];
};

export class TraxSongInfoMessage implements IIncomingPacket<TraxSongInfoMessageType> {
    public parse(wrapper: IMessageDataWrapper): TraxSongInfoMessageType {
        const packet: TraxSongInfoMessageType = {
            songs: ParseArray(wrapper, TraxSongInfoSongParser),
        };

        return packet;
    }
}

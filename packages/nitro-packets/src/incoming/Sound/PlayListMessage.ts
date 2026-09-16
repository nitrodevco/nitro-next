// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IPlayListData } from './Data/IPlayListData';
import { PlayListDataParser } from './Data/PlayListDataParser';

export type PlayListMessageType = {
    /** Bumped every time the music in the room is resynchronised. */
    synchronizationCount: number;
    playList: IPlayListData[];
};

export class PlayListMessage implements IIncomingPacket<PlayListMessageType> {
    public parse(wrapper: IMessageDataWrapper): PlayListMessageType {
        const packet: PlayListMessageType = {
            synchronizationCount: wrapper.readInt(),
            playList: ParseArray(wrapper, PlayListDataParser),
        };

        return packet;
    }
}

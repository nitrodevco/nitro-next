// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IPlayListData } from './Data/IPlayListData';
import { PlayListDataParser } from './Data/PlayListDataParser';

/** `PlayListSongAddedMessageParser`: one `PlayListEntry`, the song a sound machine's list just gained. */
export type PlayListSongAddedMessageType = {
    entry: IPlayListData;
};

export class PlayListSongAddedMessage implements IIncomingPacket<PlayListSongAddedMessageType> {
    public parse(wrapper: IMessageDataWrapper): PlayListSongAddedMessageType {
        const packet: PlayListSongAddedMessageType = {
            entry: PlayListDataParser(wrapper),
        };

        return packet;
    }
}

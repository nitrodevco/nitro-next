// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IYoutubeDisplayPlaylist } from './Data/IYoutubeDisplayPlaylist';

export type YoutubeDisplayPlaylistsMessageType = {
    furniId: number;
    playlists: IYoutubeDisplayPlaylist[];
    /** Which of them the display is set to, or empty when it is set to none. */
    selectedPlaylistId: string;
};

export class YoutubeDisplayPlaylistsMessage implements IIncomingPacket<YoutubeDisplayPlaylistsMessageType> {
    public parse(wrapper: IMessageDataWrapper): YoutubeDisplayPlaylistsMessageType {
        const furniId = wrapper.readInt();
        const playlists: IYoutubeDisplayPlaylist[] = [];

        let remaining = wrapper.readInt();

        while (remaining > 0) {
            playlists.push({
                playlistId: wrapper.readString(),
                title: wrapper.readString(),
                description: wrapper.readString(),
            });

            remaining--;
        }

        return { furniId, playlists, selectedPlaylistId: wrapper.readString() };
    }
}

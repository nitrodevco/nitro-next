import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { IYoutubeDisplayPlaylist, YoutubeDisplayPlaylistsMessage, YoutubeDisplayVideoMessage } from '@nitrodevco/nitro-packets';

import { useRoomWidgetActions } from '#base/context';
import { useMessageListener } from '#base/hooks';

/** What the display has told us about itself. */
export type YoutubeData = {
    furniId: number;
    playlists: IYoutubeDisplayPlaylist[];
    selectedPlaylistId: string;
    videoId: string;
};

/**
 * A video display answers in two parts: the playlists it can be set to, and whatever it happens
 * to be playing. Either can arrive first, so each merges into what the other left.
 */
export const useRoomYoutubeHandler = () => {
    const { mergeRoomWidgetData } = useRoomWidgetActions();

    const merge = (data: Partial<YoutubeData>) => {
        mergeRoomWidgetData<YoutubeData>(RoomObjectWidgetRequestEvent.YOUTUBE, data);
    };

    useMessageListener(YoutubeDisplayPlaylistsMessage, (message) => {
        merge({
            furniId: message.furniId,
            playlists: message.playlists,
            selectedPlaylistId: message.selectedPlaylistId,
        });
    });

    useMessageListener(YoutubeDisplayVideoMessage, (message) => {
        merge({ furniId: message.furniId, videoId: message.videoId });
    });
};

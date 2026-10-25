import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { IYoutubeDisplayPlaylist, YoutubeDisplayPlaylistsMessage, YoutubeDisplayVideoMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

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
export const registerRoomYoutubeHandlers = ({ subscribe }: WebSocketConnection) => {
    const { mergeRoomWidgetData } = roomStore.getState();

    const merge = (data: Partial<YoutubeData>) => {
        mergeRoomWidgetData<YoutubeData>(RoomObjectWidgetRequestEvent.YOUTUBE, data);
    };

    return subscribeAll(subscribe, [
        on(YoutubeDisplayPlaylistsMessage, (data) => {
            merge({
                furniId: data.furniId,
                playlists: data.playlists,
                selectedPlaylistId: data.selectedPlaylistId,
            });
        }),

        on(YoutubeDisplayVideoMessage, (data) => {
            merge({ furniId: data.furniId, videoId: data.videoId });
        }),
    ]);
};

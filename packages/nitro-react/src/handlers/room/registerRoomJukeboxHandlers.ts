import { IRoomWidgetRequest, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { GetSongInfoComposer, ITraxSongInfoSong, JukeboxSongDisksMessage, NowPlayingMessage, PlayListMessage, TraxSongInfoMessage, UserSongDisksInventoryMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/** Everything the playlist editor is told, gathered from the five messages that tell it. */
export type JukeboxData = {
    /** Your own disks: the disk id against the song on it. */
    songDisks: Record<number, number>;
    maxLength: number;
    playList: { id: number; songName: string; creator: string; length: number }[];
    /** Whatever names the client has been told, by song id. */
    songs: Record<number, ITraxSongInfoSong>;
    nowPlayingSongId: number;
};

/**
 * A jukebox keeps nothing on the furni: the disks in it, the disks you own and the names of the
 * songs on them all arrive separately, and the editor needs all of it at once. Each message
 * merges what it knows into the open request, so none of them has to know about the others.
 *
 * A disk only carries the id of its song, so any name the client has not been told yet is asked
 * for as soon as the disk turns up.
 */
export const registerRoomJukeboxHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const getRequest = () => roomStore.getState().openWidgets[RoomObjectWidgetRequestEvent.JUKEBOX_PLAYLIST_EDITOR] as IRoomWidgetRequest<JukeboxData> | undefined;
    const { mergeRoomWidgetData } = roomStore.getState();

    const merge = (data: Partial<JukeboxData> | ((previous: Partial<JukeboxData>) => Partial<JukeboxData>)) => {
        mergeRoomWidgetData<JukeboxData>(RoomObjectWidgetRequestEvent.JUKEBOX_PLAYLIST_EDITOR, data);
    };

    /** Asks for whatever names are still missing, in one request rather than one each. */
    const requestMissingSongs = (songIds: number[]) => {
        const known = getRequest()?.data?.songs ?? {};
        const missing = songIds.filter(songId => !!songId && !known[songId]);

        if (!missing.length) return;

        send(new GetSongInfoComposer({ songIds: [ ...new Set(missing) ] }));
    };

    return subscribeAll(subscribe, [
        on(UserSongDisksInventoryMessage, (message) => {
            merge({ songDisks: message.songDisks });
            requestMissingSongs(Object.values(message.songDisks));
        }),

        on(JukeboxSongDisksMessage, (message) => {
            merge({ maxLength: message.maxLength });
            requestMissingSongs(Object.values(message.songDisks));
        }),

        on(PlayListMessage, (message) => {
            merge({ playList: message.playList });
        }),

        // Names arrive in batches, and two batches can land between renders, so the map is built
        // from what the store holds rather than from what this render happened to see.
        on(TraxSongInfoMessage, (message) => {
            merge((previous) => {
                const songs = { ...previous.songs };

                for (const song of message.songs) songs[song.id] = song;

                return { songs };
            });
        }),

        on(NowPlayingMessage, (message) => {
            merge({ nowPlayingSongId: message.currentSongId });
            requestMissingSongs([ message.currentSongId ]);
        }),
    ]);
};

import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { AddJukeboxDiskComposer, RemoveJukeboxDiskComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { JukeboxData } from '#base/handlers';
import { FurniturePlaylistEditorView, PlaylistEditorSong } from '#base/views/room-widgets/furniture/FurniturePlaylistEditorView';

/**
 * The jukebox playlist editor. Everything on screen comes from `registerRoomJukeboxHandlers`, which
 * the request handler sets going as the furni is used; adding and removing a disk are the only
 * two things the editor itself sends.
 */
export const FurniturePlaylistEditorWidget = () => {
    const request = useRoomWidget<JukeboxData>(RoomObjectWidgetRequestEvent.JUKEBOX_PLAYLIST_EDITOR);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();

    const data = request?.data;

    if (!request || !data) return null;

    // The four messages behind `data` arrive one at a time, so any part of it can still be missing.
    const songs = data.songs ?? {};
    const playList = data.playList ?? [];

    const toSong = (id: number, songId: number): PlaylistEditorSong => ({
        id,
        songName: songs[songId]?.songName ?? '',
        creator: songs[songId]?.creator ?? '',
        length: songs[songId]?.length ?? 0,
    });

    /*
     * A disk in your inventory names a song; the song is what has a title. Until the song's info
     * has arrived the title is blank - `MusicInventoryGridView` builds the item with a null name and
     * `MusicInventoryGridItem` leaves `song_title_text` empty, with no placeholder text.
     */
    const inventory = Object.entries(data.songDisks ?? {}).map(([ diskId, songId ]) => toSong(parseInt(diskId, 10), songId));

    const nowPlaying = data.nowPlayingSongId
        ? (songs[data.nowPlayingSongId]?.songName ?? '')
        : '';

    return (
        <FurniturePlaylistEditorView
            inventory={inventory}
            playList={playList.map(disk => toSong(disk.diskId, disk.songId))}
            maxLength={data.maxLength ?? 0}
            nowPlaying={nowPlaying}
            onAdd={diskId => send(new AddJukeboxDiskComposer({ diskId, slotNumber: playList.length }))}
            onRemove={slotNumber => send(new RemoveJukeboxDiskComposer({ slotNumber }))}
            onClose={() => closeRoomWidget(RoomObjectWidgetRequestEvent.JUKEBOX_PLAYLIST_EDITOR)}
        />
    );
};

import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { AddJukeboxDiskComposer, RemoveJukeboxDiskComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useTranslation } from '#base/context/system';
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
    const t = useTranslation();

    const data = request?.data;

    if (!request || !data) return null;

    /* A disk in your inventory names a song; the song is what has a title. */
    const inventory: PlaylistEditorSong[] = Object.entries(data.songDisks).map(([ diskId, songId ]) => {
        const song = data.songs[songId];

        return {
            id: parseInt(diskId, 10),
            songName: song?.songName ?? t('playlist.editor.unknown.song', ''),
            creator: song?.creator ?? '',
            length: song?.length ?? 0,
        };
    });

    const nowPlaying = data.nowPlayingSongId
        ? (data.songs[data.nowPlayingSongId]?.songName ?? '')
        : '';

    return (
        <FurniturePlaylistEditorView
            inventory={inventory}
            playList={data.playList}
            maxLength={data.maxLength}
            nowPlaying={nowPlaying}
            onAdd={diskId => send(new AddJukeboxDiskComposer({ diskId, slotNumber: data.playList.length }))}
            onRemove={slotNumber => send(new RemoveJukeboxDiskComposer({ slotNumber }))}
            onClose={() => closeRoomWidget(RoomObjectWidgetRequestEvent.JUKEBOX_PLAYLIST_EDITOR)}
        />
    );
};

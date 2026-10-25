import { JukeboxPlayListFullMessage, NowPlayingMessage, PlayListMessage, PlayListSongAddedMessage, TraxSongInfoMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';
import { GetSoundManager, JukeboxPlayListController, SoundMachinePlayListController } from '#base/sound';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * The sound manager's packets - Flash's `HabboMusicController` (`TraxSongInfoMessage`) and the room
 * playlist controller it holds: a jukebox's `JukeboxPlayListController` (`NowPlayingMessage`,
 * `JukeboxPlayListFullMessage`) or a sound machine's `SoundMachinePlayListController`
 * (`PlayListMessage`, `PlayListSongAddedMessage`). Each goes to the controller only while that kind
 * of machine is the room's, as Flash's listeners lived and died with their controller.
 *
 * The music controller asks for song info through this connection (`sendNextSongRequestMessage`),
 * so the socket is handed to the sound manager for as long as the handlers are registered.
 *
 * The jukebox editor reads the same packets from the room store (`registerRoomJukeboxHandlers`);
 * the full-list alert is Flash's `PlayListEditorWidget.alertPlayListFull`, which the jukebox
 * controller's `PLAY_LIST_FULL` reached through `PlayListEditorWidgetHandler`.
 */
export const registerSoundManagerHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const soundManager = GetSoundManager();
    const { musicController } = soundManager;

    soundManager.setConnection(send);

    const unsubscribe = subscribeAll(subscribe, [
        on(TraxSongInfoMessage, data => musicController.onSongInfo(data.songs)),

        on(NowPlayingMessage, (data) => {
            const playlist = musicController.getRoomItemPlaylist();

            if (playlist instanceof JukeboxPlayListController) playlist.onNowPlaying(data);
        }),

        on(JukeboxPlayListFullMessage, () => {
            if (!(musicController.getRoomItemPlaylist() instanceof JukeboxPlayListController)) return;

            const { showAlert, getLocalizationValue } = systemStore.getState();

            showAlert(getLocalizationValue('playlist.editor.alert.playlist.full.title'), getLocalizationValue('playlist.editor.alert.playlist.full'));
        }),

        on(PlayListMessage, (data) => {
            const playlist = musicController.getRoomItemPlaylist();

            if (playlist instanceof SoundMachinePlayListController) playlist.onPlayList(data);
        }),

        on(PlayListSongAddedMessage, (data) => {
            const playlist = musicController.getRoomItemPlaylist();

            if (playlist instanceof SoundMachinePlayListController) playlist.onPlayListSongAdded(data.entry);
        }),
    ]);

    return () => {
        unsubscribe();
        soundManager.setConnection(undefined);
    };
};

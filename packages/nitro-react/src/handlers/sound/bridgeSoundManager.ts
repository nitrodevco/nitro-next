import { roomStore } from '#base/context/room';
import { userStore } from '#base/context/user';
import { bindSoundUnlock, GetSoundManager, SoundMachinePlayListController } from '#base/sound';

/**
 * What the sound manager hears from the stores, where Flash's heard it from the room engine's
 * events and its own message listeners:
 *
 * - the three volumes of `UserSoundSettingsSlice` - `HabboSoundManagerFlash10.onSoundSettingsEvent`
 *   and the sound settings window's `previewVolume` both end in `updateVolumeSetting`;
 * - the room's jukebox or sound machine (`RoomSoundSlice.roomMusic`, which the furniture action
 *   handler sets from the machines' `RoomEngineSoundMachineEvent`s): a machine announcing itself is
 *   `HabboMusicController.onJukeboxInit` / `onSoundMachineInit`, its going away `onJukeboxDispose` /
 *   `onSoundMachineDispose`, and a sound machine switched on or off is
 *   `SoundMachinePlayListController.onSoundMachinePlayEvent` / `onSoundMachineStopEvent`;
 * - the room changing, which lets go of every sound block's sample (`FurniSamplePlaybackManager.reset`);
 * - the page's first press or key, which lets the browser start the audio (`bindSoundUnlock`).
 *
 * Its teardown stands for `HabboSoundManagerFlash10.dispose`, as far as the connection's end reaches:
 * the room's playlist controller and every sound block's sample go; the song cache stays.
 */
export const bridgeSoundManager = () => {
    const soundManager = GetSoundManager();
    const applyVolumes = () => {
        const { uiVolume, furniVolume, traxVolume } = userStore.getState();

        soundManager.updateVolumeSetting(uiVolume, furniVolume, traxVolume);
    };

    applyVolumes();

    const unbindUnlock = bindSoundUnlock();

    const unsubscribeUser = userStore.subscribe((state, previous) => {
        if ((state.uiVolume === previous.uiVolume) && (state.furniVolume === previous.furniVolume) && (state.traxVolume === previous.traxVolume)) return;

        applyVolumes();
    });

    const unsubscribeRoom = roomStore.subscribe((state, previous) => {
        if (state.room !== previous.room) soundManager.furniSamplePlaybackManager.reset();

        const music = state.roomMusic;
        const was = previous.roomMusic;

        if (music === was) return;

        const { musicController } = soundManager;

        if (!music) {
            musicController.disposeRoomPlaylist();

            return;
        }

        if (!was || (was.objectId !== music.objectId) || (was.kind !== music.kind)) {
            if (music.kind === 'jukebox') musicController.onJukeboxInit();
            else musicController.onSoundMachineInit();
        }

        const playlist = musicController.getRoomItemPlaylist();

        if (!(playlist instanceof SoundMachinePlayListController) || (music.playing === playlist.isPlaying)) return;

        if (music.playing) playlist.startPlaying();
        else playlist.stopPlaying();
    });

    // The connection going away takes the room with it, but the room store may be cleared after this
    // bridge has stopped listening: the machine's music and the blocks' samples are let go here.
    return () => {
        unsubscribeUser();
        unsubscribeRoom();
        unbindUnlock();
        soundManager.musicController.disposeRoomPlaylist();
        soundManager.furniSamplePlaybackManager.reset();
    };
};

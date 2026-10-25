/**
 * What the client's windows ask of the sound manager - here the catalogue's song disk preview,
 * `SongDiskProductViewCatalogWidget.onClickPlay` and its `closed` / `dispose`. The preview plays at
 * `PRIORITY_PURCHASE_PREVIEW`, over the room's jukebox or sound machine, which resumes when it ends.
 */
import { GetSoundManager, HabboMusicPrioritiesEnum } from '#base/sound';

/** `SongDiskProductViewCatalogWidget.onClickPlay`: 40 seconds from 15 in, half a second in, two out. */
const PREVIEW_START_SECONDS = 15;
const PREVIEW_LENGTH_SECONDS = 40;
const PREVIEW_FADE_IN_SECONDS = 0.5;
const PREVIEW_FADE_OUT_SECONDS = 2;

/** `forceNoFadeoutOnPlayingSong`: the song at `priority` stops dead instead of fading under the preview. */
const forceNoFadeOutOnPlayingSong = (priority: number) => {
    const { musicController } = GetSoundManager();
    const songId = musicController.getSongIdPlayingAtPriority(priority);

    if (songId === -1) return;

    const sound = musicController.getSongInfo(songId)?.soundObject;

    if (sound) sound.fadeOutSeconds = 0;
};

export const playSongDiskPreview = (songId: number) => {
    forceNoFadeOutOnPlayingSong(HabboMusicPrioritiesEnum.PRIORITY_ROOM_PLAYLIST);
    forceNoFadeOutOnPlayingSong(HabboMusicPrioritiesEnum.PRIORITY_PURCHASE_PREVIEW);

    GetSoundManager().musicController.playSong(songId, HabboMusicPrioritiesEnum.PRIORITY_PURCHASE_PREVIEW, PREVIEW_START_SECONDS, PREVIEW_LENGTH_SECONDS, PREVIEW_FADE_IN_SECONDS, PREVIEW_FADE_OUT_SECONDS);
};

/** The page closing or going away: `musicController.stop(3)`. */
export const stopSongDiskPreview = () => GetSoundManager().musicController.stop(HabboMusicPrioritiesEnum.PRIORITY_PURCHASE_PREVIEW);

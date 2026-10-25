import { NowPlayingMessageType } from '@nitrodevco/nitro-packets';

import { HabboMusicPrioritiesEnum } from '../HabboMusicPrioritiesEnum';
import type { HabboMusicController } from './HabboMusicController';

/**
 * A room's jukebox - Flash's `JukeboxPlayListController`. The server keeps the jukebox's list and
 * says what it plays (`NowPlayingMessage`), and the controller plays that song at the room
 * priority from where the room is in it, asking ahead for the info (and samples) of the next.
 *
 * Only the playback half is here. The disk list Flash kept on this controller
 * (`JukeboxSongDisksMessage`, `JukeboxPlayListFullMessage`, the `PlayListStatusEvent`s) feeds the
 * playlist editor, which reads it from the room store (`registerRoomJukeboxHandlers`).
 */
export class JukeboxPlayListController {
    private _disposed = false;
    private _isPlaying = false;
    private _nowPlayingSongId = -1;
    private _playPosition = -1;

    constructor(private readonly _musicController: HabboMusicController) {}

    public get priority(): number {
        return HabboMusicPrioritiesEnum.PRIORITY_ROOM_PLAYLIST;
    }

    public get nowPlayingSongId(): number {
        return this._nowPlayingSongId;
    }

    public get playPosition(): number {
        return this._playPosition;
    }

    public get isPlaying(): boolean {
        return this._isPlaying;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) return;

        this.stopPlaying();
        this._disposed = true;
    }

    public stopPlaying(): void {
        this._musicController.stop(this.priority);
        this._nowPlayingSongId = -1;
        this._playPosition = -1;
        this._isPlaying = false;
    }

    /** `onSongFinishedPlayingEvent`: nothing - the server says what comes next. */
    public onSongFinishedPlaying(): void {
        // The jukebox's next song arrives as a NowPlayingMessage.
    }

    /** `onNowPlayingMessage`: Flash takes the start position from `syncCount`, in milliseconds. */
    public onNowPlaying(data: NowPlayingMessageType): void {
        this._isPlaying = (data.currentSongId !== -1);

        if (data.currentSongId >= 0) {
            this._musicController.playSong(data.currentSongId, HabboMusicPrioritiesEnum.PRIORITY_ROOM_PLAYLIST, data.syncCount / 1000, 0, 1, 1);
            this._nowPlayingSongId = data.currentSongId;
        } else {
            this.stopPlaying();
        }

        if (data.nextSongId >= 0) this._musicController.addSongInfoRequest(data.nextSongId);

        this._playPosition = data.currentPosition;
    }
}

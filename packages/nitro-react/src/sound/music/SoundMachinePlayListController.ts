import { GetSoundMachinePlayListComposer, IPlayListData, PlayListMessageType } from '@nitrodevco/nitro-packets';

import { HabboMusicPrioritiesEnum } from '../HabboMusicPrioritiesEnum';
import type { HabboSoundManager } from '../HabboSoundManager';
import type { HabboMusicController } from './HabboMusicController';
import { SongDataEntry } from './SongDataEntry';

/**
 * A room's trax sound machine - Flash's `SoundMachinePlayListController`. The machine's list comes
 * from the server (`PlayListMessage`, one song at a time after that with `PlayListSongAddedMessage`)
 * and the client plays it round and round itself while the machine is switched on: the list's
 * `synchronizationCount` (milliseconds since the machine started) says which song the room is in
 * and how far, and each song that ends starts the next.
 *
 * The song-info half (`SongInfoReceivedEvent` refreshing an entry's name for the editor) and the
 * `PlayListStatusEvent`s are left out: the port's playlist editor reads the room store.
 */
export class SoundMachinePlayListController {
    private _disposed = false;
    private _isPlaying = false;
    private _nowPlayingSongId = -1;
    private _entries: SongDataEntry[] = [];

    constructor(
        private readonly _soundManager: HabboSoundManager,
        private readonly _musicController: HabboMusicController,
    ) {}

    public get priority(): number {
        return HabboMusicPrioritiesEnum.PRIORITY_ROOM_PLAYLIST;
    }

    public get nowPlayingSongId(): number {
        return this._nowPlayingSongId;
    }

    public get isPlaying(): boolean {
        return this._isPlaying;
    }

    public get length(): number {
        return this._entries.length;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) return;

        if (this._isPlaying) this.stopPlaying();

        this._entries = [];
        this._disposed = true;
    }

    /**
     * `onSoundMachinePlayEvent` / `startPlaying`: a machine switched on with no list yet asks for
     * it (`requestPlayList`) and plays once it arrives; one that has a list starts it from the top.
     */
    public startPlaying(): void {
        if (this._isPlaying) return;

        if (!this._entries.length) {
            this.requestPlayList();
            this._isPlaying = true;

            return;
        }

        this.stopPlaying();
        this._nowPlayingSongId = -1;
        this._isPlaying = true;
        this.playNextSong();
    }

    /** `requestPlayList`. */
    public requestPlayList(): void {
        this._soundManager.send(new GetSoundMachinePlayListComposer({}));
    }

    /** `onSoundMachineStopEvent` / `stopPlaying`. */
    public stopPlaying(): void {
        this._nowPlayingSongId = -1;
        this._isPlaying = false;
        this._musicController.stop(HabboMusicPrioritiesEnum.PRIORITY_ROOM_PLAYLIST);
    }

    /** `onSongFinishedPlayingEvent`. */
    public onSongFinishedPlaying(songId: number): void {
        if (songId === this._nowPlayingSongId) this.playNextSong();
    }

    /** `onPlayListMessage`: finds the song and position the machine is at, and plays it if switched on. */
    public onPlayList(data: PlayListMessageType): void {
        const entries = data.playList.map(entry => this.toEntry(entry));

        if (!entries.length) return;

        this._entries = entries;

        const total = entries.reduce((sum, entry) => sum + entry.length, 0);
        // AS3's `int %= 0` is 0, where JavaScript's `% 0` is NaN: a list of zero-length songs starts at its top.
        let position = (total > 0) ? (Math.max(0, data.synchronizationCount) % total) : 0;
        let current: SongDataEntry | null = null;

        for (const entry of entries) {
            if (position > entry.length) {
                position -= entry.length;

                continue;
            }

            this._nowPlayingSongId = entry.id;
            entry.startPlayHeadPos = position / 1000;
            current = entry;

            break;
        }

        if (current && this._isPlaying) this.playCurrentSongAndNotify(current.id);
    }

    /** `onPlayListSongAddedMessage`. */
    public onPlayListSongAdded(entry: IPlayListData): void {
        const song = this.toEntry(entry);

        this._entries.push(song);

        if (!this._isPlaying) return;

        if (this._entries.length === 1) this.playCurrentSongAndNotify(song.id);
        else this.checkSongPlayState(song.id);
    }

    private checkSongPlayState(songId: number): void {
        if (this._nowPlayingSongId !== songId) return;

        this.playCurrentSongAndNotify(this._nowPlayingSongId);

        const next = this.getNextEntry();

        if (next) this._musicController.addSongInfoRequest(next.id);
    }

    private playNextSong(): void {
        const next = this.getNextEntry();

        if (!next) return;

        this._nowPlayingSongId = next.id;
        this.playCurrentSongAndNotify(this._nowPlayingSongId);
    }

    private playCurrentSongAndNotify(songId: number): void {
        const entry = this.getEntryWithId(songId);

        if (!entry) return;

        const startPlayHeadPos = entry.startPlayHeadPos;

        entry.startPlayHeadPos = 0;
        this._musicController.playSong(songId, HabboMusicPrioritiesEnum.PRIORITY_ROOM_PLAYLIST, startPlayHeadPos, 0, 0, 0);
    }

    private getNextEntry(): SongDataEntry | null {
        if (!this._entries.length) return null;

        let index = 0;

        for (let i = 0; i < this._entries.length; i++) {
            if (this._entries[i].id === this._nowPlayingSongId) index = i + 1;
        }

        if (index >= this._entries.length) index = 0;

        return this._entries[index] ?? null;
    }

    private getEntryWithId(songId: number): SongDataEntry | null {
        return this._entries.find(entry => entry.id === songId) ?? null;
    }

    /** `convertParserPlayList`. */
    private toEntry(entry: IPlayListData): SongDataEntry {
        return new SongDataEntry(entry.id, entry.length, entry.songName, entry.creator, null);
    }
}

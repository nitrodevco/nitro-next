import { GetSongInfoComposer, ITraxSongInfoSong } from '@nitrodevco/nitro-packets';

import { HabboMusicPrioritiesEnum } from '../HabboMusicPrioritiesEnum';
import type { HabboSoundManager } from '../HabboSoundManager';
import { JukeboxPlayListController } from './JukeboxPlayListController';
import { SongDataEntry } from './SongDataEntry';
import { SongStartRequestData } from './SongStartRequestData';
import { SoundMachinePlayListController } from './SoundMachinePlayListController';

/** `SKIP_POSITION_SET`: a request with no start position. */
const SKIP_POSITION_SET = -1;
/** `MAXIMUM_NOTIFY_PRIORITY`: only the room's music raises the "now playing" bubble. */
const MAXIMUM_NOTIFY_PRIORITY = HabboMusicPrioritiesEnum.PRIORITY_ROOM_PLAYLIST;
/** `sendNextSongRequestMessage`'s timer: song info is asked for once a second, in one batch. */
const SONG_REQUEST_INTERVAL_MS = 1000;
/** `notifySongPlaying`: a song shorter than this, or the same one again within it, raises no bubble. */
const NOTIFY_MIN_MS = 8000;

/**
 * Trax music - Flash's `HabboMusicController`. It keeps every song the client has been told about
 * (`TraxSongInfoMessage`), four request slots by `HabboMusicPrioritiesEnum` of which the highest
 * holding a request plays, and the room's playlist controller: a jukebox's
 * (`JukeboxPlayListController`) or a sound machine's (`SoundMachinePlayListController`), whichever
 * announced itself last (`onJukeboxInit` / `onSoundMachineInit`).
 *
 * `playSong` records the request and plays it as soon as the song's info and samples are in: a song
 * the client has no info for is asked for (with its samples, `addSongInfoRequest`), the batch going
 * out once a second; the info's arrival starts the sequencer's sample downloads, and their end
 * (`onSongLoaded`) plays whatever is requested at the top. A song stopping - played out, or faded
 * out because another took its place - hands over to the next request down
 * (`onSongFinishedPlayingEvent`).
 *
 * Left out: the user's song disk inventory (`UserSongDisksInventoryMessage`, which Flash kept here
 * for the inventory and the jukebox editor - the port's editor reads it from the room store) and the
 * `NowPlayingEvent`s, which only Flash's own widgets listened to.
 */
export class HabboMusicController {
    private readonly _songs = new Map<number, SongDataEntry>();
    /** Song id -> whether its samples were wanted when its info was asked for. */
    private readonly _songRequests = new Map<number, boolean>();
    private _songRequestQueue: number[] = [];
    private readonly _requests: (SongStartRequestData | null)[] = new Array(HabboMusicPrioritiesEnum.PRIORITY_COUNT).fill(null);
    private readonly _requestCounts: number[] = new Array(HabboMusicPrioritiesEnum.PRIORITY_COUNT).fill(0);
    private _priorityPlaying = -1;
    private _songIdPlaying = -1;
    private _requestCountPlaying = -1;
    private _notifiedSongId = -1;
    private _notifiedAt = -1;
    private _roomPlaylist: JukeboxPlayListController | SoundMachinePlayListController | null = null;
    private _requestTimer: ReturnType<typeof setInterval> | null;
    private _disposed = false;

    constructor(private readonly _soundManager: HabboSoundManager) {
        this._requestTimer = setInterval(() => this.sendNextSongRequestMessage(), SONG_REQUEST_INTERVAL_MS);
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) return;

        this.disposeRoomPlaylist();

        for (const entry of this._songs.values()) {
            entry.soundObject?.dispose();
            entry.soundObject = null;
        }

        this._songs.clear();
        this._songRequests.clear();
        this._songRequestQueue = [];

        if (this._requestTimer) clearInterval(this._requestTimer);

        this._requestTimer = null;
        this._disposed = true;
    }

    public getRoomItemPlaylist(): JukeboxPlayListController | SoundMachinePlayListController | null {
        return this._roomPlaylist;
    }

    /** `playSong(songId, priority, startPos, playLength, fadeIn, fadeOut)`: seconds throughout. */
    public playSong(songId: number, priority: number, startPos: number = 0, playLength: number = 0, fadeInSeconds: number = 0.5, fadeOutSeconds: number = 0.5): boolean {
        if (!this.addSongStartRequest(priority, songId, startPos, playLength, fadeInSeconds, fadeOutSeconds)) return false;

        if (!this.processSongEntryForPlaying(songId)) return false;

        if (priority >= this._priorityPlaying) this.playSongObject(priority, songId);

        return true;
    }

    public stop(priority: number): void {
        const isPlaying = (priority === this._priorityPlaying);
        const isTop = (this.getTopRequestPriority() === priority);

        this.resetSongStartRequest(priority);

        if (isPlaying) this.stopSongAtPriority(priority);
        else if (isTop) this.reRequestSongAtPriority(this._priorityPlaying);
    }

    public getSongIdPlayingAtPriority(priority: number): number {
        return (priority !== this._priorityPlaying) ? -1 : this._songIdPlaying;
    }

    /** `getSongInfo`: the entry, asking for it (without samples) when there is none. */
    public getSongInfo(songId: number): SongDataEntry | null {
        const entry = this.getSongDataEntry(songId);

        if (!entry) this.requestSongInfoWithoutSamples(songId);

        return entry;
    }

    public addSongInfoRequest(songId: number): void {
        this.requestSong(songId, true);
    }

    public requestSongInfoWithoutSamples(songId: number): void {
        this.requestSong(songId, false);
    }

    public updateVolume(volume: number): void {
        for (let priority = 0; priority < HabboMusicPrioritiesEnum.PRIORITY_COUNT; priority++) {
            const songId = this.getSongIdPlayingAtPriority(priority);

            if (songId < 0) continue;

            const sound = this.getSongDataEntry(songId)?.soundObject;

            if (sound) sound.volume = volume;
        }
    }

    /** `onSongLoaded`: a song's samples are in; it plays if it is what the top request wants. */
    public onSongLoaded(songId: number): void {
        const priority = this.getTopRequestPriority();

        if (priority < 0) return;

        if (songId === this.getSongIdRequestedAtPriority(priority)) this.playSongObject(priority, songId);
    }

    /** `onSongFinishedPlayingEvent`, then the room playlist's own. */
    public onSongFinishedPlaying(songId: number): void {
        if (this.getSongIdPlayingAtPriority(this._priorityPlaying) === songId) {
            if ((this.getTopRequestPriority() === this._priorityPlaying) && (this.getSongRequestCountAtPriority(this._priorityPlaying) === this._requestCountPlaying)) this.resetSongStartRequest(this._priorityPlaying);

            this.playSongWithHighestPriority();
        }

        this._roomPlaylist?.onSongFinishedPlaying(songId);
    }

    /** `samplesUnloaded`: a sequencer that used a purged sample is dropped, to be rebuilt when next wanted. */
    public samplesUnloaded(sampleIds: number[]): void {
        for (const entry of this._songs.values()) {
            const sound = entry.soundObject;

            if ((entry.id === this._songIdPlaying) || !sound || !sound.ready) continue;

            const used = sound.traxData.getSampleIds();

            if (!sampleIds.some(sampleId => used.includes(sampleId))) continue;

            entry.soundObject = null;
            sound.dispose();
        }
    }

    /** `samplesIdsInUse`: every sample a requested song needs. */
    public samplesIdsInUse(): number[] {
        const ids: number[] = [];

        for (const request of this._requests) {
            if (!request) continue;

            const sound = this._songs.get(request.songId)?.soundObject;

            if (sound) ids.push(...sound.traxData.getSampleIds());
        }

        return ids;
    }

    /** `onSongInfoMessage`. */
    public onSongInfo(songs: ITraxSongInfoSong[]): void {
        for (const song of songs) {
            if (this.getSongDataEntry(song.id)) continue;

            const sound = this.areSamplesRequested(song.id) ? this._soundManager.loadTraxSong(song.id, song.data) : null;
            const entry = new SongDataEntry(song.id, song.length, song.songName, song.creator, sound);

            entry.songData = song.data;
            this._songs.set(song.id, entry);

            const priority = this.getTopRequestPriority();

            if (sound?.ready && (song.id === this.getSongIdRequestedAtPriority(priority))) this.playSongObject(priority, song.id);
        }
    }

    public onJukeboxInit(): void {
        this.disposeRoomPlaylist();
        this._roomPlaylist = new JukeboxPlayListController(this);
    }

    public onSoundMachineInit(): void {
        this.disposeRoomPlaylist();
        this._roomPlaylist = new SoundMachinePlayListController(this._soundManager, this);
    }

    /** `onJukeboxDispose` / `onSoundMachineDispose`. */
    public disposeRoomPlaylist(): void {
        this._roomPlaylist?.dispose();
        this._roomPlaylist = null;
    }

    private getSongDataEntry(songId: number): SongDataEntry | null {
        return this._songs.get(songId) ?? null;
    }

    private addSongStartRequest(priority: number, songId: number, startPos: number, playLength: number, fadeInSeconds: number, fadeOutSeconds: number): boolean {
        if ((priority < 0) || (priority >= HabboMusicPrioritiesEnum.PRIORITY_COUNT)) return false;

        this._requests[priority] = new SongStartRequestData(songId, startPos, playLength, fadeInSeconds, fadeOutSeconds);
        this._requestCounts[priority]++;

        return true;
    }

    private getSongStartRequest(priority: number): SongStartRequestData | null {
        return this._requests[priority] ?? null;
    }

    private getSongIdRequestedAtPriority(priority: number): number {
        if ((priority < 0) || (priority >= HabboMusicPrioritiesEnum.PRIORITY_COUNT)) return -1;

        return this._requests[priority]?.songId ?? -1;
    }

    private getSongRequestCountAtPriority(priority: number): number {
        if ((priority < 0) || (priority >= HabboMusicPrioritiesEnum.PRIORITY_COUNT)) return -1;

        return this._requestCounts[priority];
    }

    private getTopRequestPriority(): number {
        for (let priority = this._requests.length - 1; priority >= 0; priority--) {
            if (this._requests[priority]) return priority;
        }

        return -1;
    }

    private resetSongStartRequest(priority: number): void {
        if ((priority >= 0) && (priority < HabboMusicPrioritiesEnum.PRIORITY_COUNT)) this._requests[priority] = null;
    }

    private reRequestSongAtPriority(priority: number): void {
        if ((priority >= 0) && (priority < HabboMusicPrioritiesEnum.PRIORITY_COUNT)) this._requestCounts[priority]++;
    }

    /** Whether the song can play now: its info asked for if missing, its sequencer made if not yet. */
    private processSongEntryForPlaying(songId: number): boolean {
        const entry = this.getSongDataEntry(songId);

        if (!entry) {
            this.addSongInfoRequest(songId);

            return false;
        }

        entry.soundObject ??= this._soundManager.loadTraxSong(entry.id, entry.songData);

        return entry.soundObject.ready;
    }

    private playSongWithHighestPriority(): void {
        this._priorityPlaying = -1;
        this._songIdPlaying = -1;
        this._requestCountPlaying = -1;

        for (let priority = this.getTopRequestPriority(); priority >= 0; priority--) {
            const songId = this.getSongIdRequestedAtPriority(priority);

            if ((songId >= 0) && this.playSongObject(priority, songId)) return;
        }
    }

    private stopSongAtPriority(priority: number): boolean {
        if ((priority !== this._priorityPlaying) || (this._priorityPlaying < 0)) return false;

        const songId = this.getSongIdPlayingAtPriority(priority);

        if (songId < 0) return false;

        this.getSongDataEntry(songId)?.soundObject?.stop();

        return true;
    }

    /**
     * `playSongObject`. When another song is playing it is stopped first and this one waits: the
     * stopped song's end (at once, or after its fade-out) plays the top request.
     */
    private playSongObject(priority: number, songId: number): boolean {
        if ((songId === -1) || (priority < 0) || (priority >= HabboMusicPrioritiesEnum.PRIORITY_COUNT)) return false;

        const stopped = this.stopSongAtPriority(this._priorityPlaying);
        const entry = this.getSongDataEntry(songId);

        if (!entry) return false;

        const sound = entry.soundObject;

        if (!sound || !sound.ready) return false;

        if (stopped) return true;

        sound.volume = this._soundManager.traxVolume;

        const request = this.getSongStartRequest(priority);
        let startPos = request ? request.startPos : SKIP_POSITION_SET;

        if (startPos >= (entry.length / 1000)) return false;

        if (startPos === SKIP_POSITION_SET) startPos = 0;

        sound.fadeInSeconds = request ? request.fadeInSeconds : 2;
        sound.fadeOutSeconds = request ? request.fadeOutSeconds : 1;
        sound.position = startPos;
        sound.play(request ? request.playLength : 0);

        this._priorityPlaying = priority;
        this._requestCountPlaying = this.getSongRequestCountAtPriority(priority);
        this._songIdPlaying = songId;

        if (this._priorityPlaying <= MAXIMUM_NOTIFY_PRIORITY) this.notifySongPlaying(entry);

        return true;
    }

    private notifySongPlaying(entry: SongDataEntry): void {
        const now = performance.now();

        if ((entry.length < NOTIFY_MIN_MS) || ((this._notifiedSongId === entry.id) && (now <= (this._notifiedAt + NOTIFY_MIN_MS)))) return;

        this._soundManager.notifyPlayedSong(entry.name, entry.creator);
        this._notifiedSongId = entry.id;
        this._notifiedAt = now;
    }

    private areSamplesRequested(songId: number): boolean {
        return this._songRequests.get(songId) ?? false;
    }

    private requestSong(songId: number, withSamples: boolean): void {
        if (this._songRequests.has(songId)) return;

        this._songRequests.set(songId, withSamples);
        this._songRequestQueue.push(songId);
    }

    private sendNextSongRequestMessage(): void {
        if (!this._songRequestQueue.length) return;

        if (!this._soundManager.send(new GetSongInfoComposer({ songIds: this._songRequestQueue }))) return;

        this._songRequestQueue = [];
    }
}

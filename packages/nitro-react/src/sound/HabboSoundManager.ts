import { IOutgoingPacket, NitroLogger } from '@nitrodevco/nitro-api';
import { GetAssetManager } from '@nitrodevco/nitro-renderer';

import { Send } from '#base/context/communication';
import { notificationStore } from '#base/context/notifications';
import { configBoolean, systemStore } from '#base/context/system';
import { loadAssetBundle } from '#base/utils';

import { FurniSamplePlaybackManager } from './furni/FurniSamplePlaybackManager';
import { HabboSoundBase } from './HabboSoundBase';
import { HabboSoundTypesEnum } from './HabboSoundTypesEnum';
import { HabboSoundWithPitch } from './HabboSoundWithPitch';
import { HabboMusicController } from './music/HabboMusicController';
import { TraxSampleManager } from './music/TraxSampleManager';
import { decodeSound, isSoundContextRunning } from './soundContext';
import { TraxData } from './trax/TraxData';
import { TraxSequencer } from './trax/TraxSequencer';

/** The bundle `build-asset-bundles.ts` packs `public/assets/sounds` into. */
const SOUND_BUNDLE = 'sounds';
/** `playSound`: the same sound asked for again within this many milliseconds is not replayed. */
const REPLAY_GUARD_MS = 200;

/** `getSoundBySoundId`: the embedded asset each sound id plays; an id not here is unknown. */
const SOUND_ASSETS: Record<string, string> = {
    [HabboSoundTypesEnum.SOUND_CALL_FOR_HELP]: 'sound_call_for_help',
    [HabboSoundTypesEnum.SOUND_GUIDE_INVITATION]: 'sound_guide_received_invitation',
    [HabboSoundTypesEnum.SOUND_GUIDE_REQUEST]: 'sound_guide_help_requested',
    [HabboSoundTypesEnum.SOUND_MESSAGE_RECEIVED]: 'sound_console_new_message',
    [HabboSoundTypesEnum.SOUND_MESSAGE_SENT]: 'sound_console_message_sent',
    [HabboSoundTypesEnum.SOUND_DUCKET_BALANCE]: 'sound_catalogue_duckets',
    [HabboSoundTypesEnum.SOUND_CREDIT_BALANCE]: 'sound_catalogue_cash',
    [HabboSoundTypesEnum.SOUND_RESPECT]: 'sound_respect_received',
    [HabboSoundTypesEnum.CAMERA_SHUTTER]: 'sound_camera_shutter',
    [HabboSoundTypesEnum.GAMES_SW_GET_SNOWBALL]: HabboSoundTypesEnum.GAMES_SW_GET_SNOWBALL,
    [HabboSoundTypesEnum.GAMES_SW_HIT1]: HabboSoundTypesEnum.GAMES_SW_HIT1,
    [HabboSoundTypesEnum.GAMES_SW_HIT2]: HabboSoundTypesEnum.GAMES_SW_HIT2,
    [HabboSoundTypesEnum.GAMES_SW_HIT3]: HabboSoundTypesEnum.GAMES_SW_HIT3,
    [HabboSoundTypesEnum.GAMES_SW_MAKE_SNOWBALL]: HabboSoundTypesEnum.GAMES_SW_MAKE_SNOWBALL,
    [HabboSoundTypesEnum.GAMES_SW_MISS]: HabboSoundTypesEnum.GAMES_SW_MISS,
    [HabboSoundTypesEnum.GAMES_SW_THROW]: HabboSoundTypesEnum.GAMES_SW_THROW,
    [HabboSoundTypesEnum.GAMES_SW_WALK]: HabboSoundTypesEnum.GAMES_SW_WALK,
    [HabboSoundTypesEnum.GAMES_IG_COUNTDOWN]: HabboSoundTypesEnum.GAMES_IG_COUNTDOWN,
    [HabboSoundTypesEnum.GAMES_IG_WINNING]: HabboSoundTypesEnum.GAMES_IG_WINNING,
    [HabboSoundTypesEnum.GAMES_IG_LOSING]: HabboSoundTypesEnum.GAMES_IG_LOSING,
    [HabboSoundTypesEnum.FURNITURE_SOUND_CUCKOO_CLOCK]: HabboSoundTypesEnum.FURNITURE_SOUND_CUCKOO_CLOCK,
};

/**
 * The client's sound - Flash's `HabboSoundManagerFlash10`, played through Web Audio
 * (`soundContext.ts`). It owns the three volumes, the client's own sounds (`playSound`, and
 * `playSoundAtPitch` for the cuckoo clock), the furni sound blocks (`FurniSamplePlaybackManager`),
 * the trax samples (`TraxSampleManager`) and the music (`HabboMusicController`), and loads one trax
 * song's samples at a time, queueing the rest (`loadTraxSong`, `loadNextSong`).
 *
 * Flash wired itself to the room engine's events and the connection; here the handlers do it:
 * `registerSoundManagerHandlers` hands over the socket and the sound packets, `bridgeSoundManager`
 * the volumes of `UserSoundSettingsSlice` (which `AccountPreferencesEventMessage` and the sound
 * settings window write, as Flash's `onSoundSettingsEvent` and `previewVolume` did) and the room's
 * machine, and the room hooks the furni events.
 *
 * The client's own sounds were embedded in the SWF; here they are the `sounds` bundle, fetched and
 * decoded the first time one is played - so the very first sound of a session starts as late as
 * that takes. Not ported: `mute`, which only Flash's video offers used.
 *
 * `playSoundAtPitch` differs from Flash on purpose: Flash's `HabboSoundWithPitch` starts its channel
 * silent and relies on a frame receiver to bring the volume up, and `playSoundAtPitch` never
 * registered one, so the cuckoo clock played at volume 0. Here it gets the fade-in the class was
 * written for.
 */
export class HabboSoundManager {
    private _genericVolume = 1;
    private _traxVolume = 1;
    private _furniVolume = 1;
    private readonly _genericSamples = new Map<string, HabboSoundBase>();
    private readonly _lastPlayed = new Map<string, number>();
    private readonly _decodedAssets = new Map<string, Promise<AudioBuffer | undefined>>();
    private _loadingSong: TraxSequencer | null = null;
    private _loadingSongId = -1;
    private readonly _songsToLoad = new Map<number, TraxSequencer>();
    private _send: Send | undefined;

    public readonly musicController: HabboMusicController;
    public readonly furniSamplePlaybackManager: FurniSamplePlaybackManager;
    private readonly _traxSampleManager: TraxSampleManager;

    constructor() {
        this.musicController = new HabboMusicController(this);
        this.furniSamplePlaybackManager = new FurniSamplePlaybackManager();
        this._traxSampleManager = new TraxSampleManager({
            getLoadingSongId: () => this._loadingSongId,
            onTraxLoadComplete: songId => this.onTraxLoadComplete(songId),
            onSampleLoadError: () => this.onSampleLoadError(),
            samplesIdsInUse: () => this.musicController.samplesIdsInUse(),
            samplesUnloaded: sampleIds => this.musicController.samplesUnloaded(sampleIds),
        }, configBoolean('trax.player.sample.memory.purge.enabled'));
    }

    public get genericVolume(): number {
        return this._genericVolume;
    }

    public get traxVolume(): number {
        return this._traxVolume;
    }

    public get furniVolume(): number {
        return this._furniVolume;
    }

    public get loadingSongId(): number {
        return this._loadingSongId;
    }

    /** The socket the music controller asks for song info through, while there is one. */
    public setConnection(send: Send | undefined): void {
        this._send = send;
    }

    /** Sends through the connection; false when there is none (the request waits for the next try). */
    public send(composer: IOutgoingPacket<object>): boolean {
        if (!this._send) return false;

        this._send(composer);

        return true;
    }

    /** `updateVolumeSetting`: every volume 0..1, applied to what is playing. */
    public updateVolumeSetting(genericVolume: number, furniVolume: number, traxVolume: number): void {
        this._genericVolume = genericVolume;
        this._furniVolume = furniVolume;
        this._traxVolume = traxVolume;

        this.musicController.updateVolume(traxVolume);
        this.furniSamplePlaybackManager.updateVolume(furniVolume);
    }

    /** `playSound`: one of the client's own sounds at the generic volume, `loops` times over. */
    public playSound(soundId: string, loops: number = 0): void {
        const now = performance.now();
        const last = this._lastPlayed.get(soundId);

        if ((last !== undefined) && ((now - last) <= REPLAY_GUARD_MS)) return;

        const asset = SOUND_ASSETS[soundId];

        if (!asset) {
            NitroLogger.log(`HabboSoundManager: Unknown sound request: ${soundId}`);

            return;
        }

        this._lastPlayed.set(soundId, now);

        // Heard only once the page has been interacted with: one asked for before is dropped, not queued.
        if (!isSoundContextRunning()) return;

        const existing = this._genericSamples.get(soundId);

        if (existing) {
            existing.volume = this._genericVolume;
            existing.play();

            return;
        }

        void this.getSoundByAssetName(asset).then((buffer) => {
            if (!buffer) return;

            let sound = this._genericSamples.get(soundId);

            if (!sound) {
                sound = new HabboSoundBase(buffer, loops);
                this._genericSamples.set(soundId, sound);
            }

            sound.volume = this._genericVolume;
            sound.play();
        });
    }

    /** `playSoundAtPitch`: a new sound each time, at the generic volume. */
    public playSoundAtPitch(soundId: string, pitch: number): void {
        const asset = SOUND_ASSETS[soundId];

        if (!asset) {
            NitroLogger.log(`HabboSoundManager: Unknown sound request: ${soundId}`);

            return;
        }

        if (!isSoundContextRunning()) return;

        void this.getSoundByAssetName(asset).then((buffer) => {
            if (!buffer) return;

            const sound = new HabboSoundWithPitch(buffer, pitch);

            sound.volume = this._genericVolume;
            sound.play();
        });
    }

    public stopSound(soundId: string): void {
        this._genericSamples.get(soundId)?.stop();
    }

    /**
     * `loadTraxSong`: the song's sequencer, loading its samples when nothing else is loading, or
     * queued behind the song that is (`addTraxSongForDownload`).
     */
    public loadTraxSong(songId: number, songData: string): TraxSequencer {
        if (this._loadingSong) return this.addTraxSongForDownload(songId, songData);

        const sequencer = this.createTraxInstance(songId, songData, true);

        if (!sequencer.ready) {
            this._loadingSong = sequencer;
            this._loadingSongId = songId;
        }

        return sequencer;
    }

    /** `notifyPlayedSong`: the "now playing" bubble, when the text exists. */
    public notifyPlayedSong(name: string, creator: string): void {
        const key = 'soundmachine.notification.playing';
        const { localizations, getLocalizationValue } = systemStore.getState();

        if (localizations[key] === undefined) return;

        notificationStore.getState().addNotification(getLocalizationValue(key, '', { songname: name, songauthor: creator }), 'soundmachine');
    }

    private addTraxSongForDownload(songId: number, songData: string): TraxSequencer {
        const sequencer = this.createTraxInstance(songId, songData, false);

        if (!sequencer.ready) this._songsToLoad.set(songId, sequencer);

        return sequencer;
    }

    /** `createTraxInstance`: Flash starts it at the generic volume; the music controller sets the trax volume when it plays. */
    private createTraxInstance(songId: number, songData: string, loadSamples: boolean): TraxSequencer {
        const sequencer = new TraxSequencer(songId, new TraxData(songData), this._traxSampleManager.traxSamples, completed => this.musicController.onSongFinishedPlaying(completed));

        sequencer.volume = this._genericVolume;
        this.validateSampleAvailability(sequencer, loadSamples);

        return sequencer;
    }

    private validateSampleAvailability(sequencer: TraxSequencer, loadSamples: boolean): void {
        let missing = false;

        for (const sampleId of sequencer.traxData.getSampleIds()) {
            if (this._traxSampleManager.traxSamples.has(sampleId)) continue;

            if (loadSamples) this._traxSampleManager.loadSample(sampleId);

            missing = true;
        }

        sequencer.ready = !missing;
    }

    /** `onTraxLoadComplete`. */
    private onTraxLoadComplete(songId: number): void {
        if (!this._loadingSong) return;

        this._loadingSong.ready = true;
        this.musicController.onSongLoaded(songId);
        this._loadingSong = null;
        this._loadingSongId = -1;

        this.loadNextSong();
    }

    private onSampleLoadError(): void {
        this._loadingSongId = -1;
        this._loadingSong = null;

        this.loadNextSong();
    }

    /**
     * `loadNextSong`, which Flash ran every frame: the next queued song once none is loading. A
     * queued song whose samples all came in with another is announced as loaded at once. Flash
     * dispatched `TRAX_LOAD_COMPLETE` for it too, but its `onTraxLoadComplete` ignores a completion
     * while no song is marked loading, so a request waiting on that song was never played; the port
     * tells the music controller.
     */
    private loadNextSong(): void {
        while (!this._loadingSong && this._songsToLoad.size) {
            const [ songId, sequencer ] = this._songsToLoad.entries().next().value as [ number, TraxSequencer ];

            this._songsToLoad.delete(songId);

            if (sequencer.disposed) continue;

            this.validateSampleAvailability(sequencer, true);

            if (sequencer.ready) {
                this.musicController.onSongLoaded(songId);

                continue;
            }

            this._loadingSong = sequencer;
            this._loadingSongId = songId;
        }
    }

    /** `getSoundByAssetName`: the embedded sound, decoded once from the `sounds` bundle. */
    private getSoundByAssetName(asset: string): Promise<AudioBuffer | undefined> {
        let decoded = this._decodedAssets.get(asset);

        if (!decoded) {
            decoded = (async () => {
                if (!await loadAssetBundle(SOUND_BUNDLE)) return undefined;

                const bytes = GetAssetManager().getBundleBinary(SOUND_BUNDLE, `${asset}.mp3`);

                return bytes ? decodeSound(bytes) : undefined;
            })();

            this._decodedAssets.set(asset, decoded);
        }

        return decoded;
    }
}

let instance: HabboSoundManager | undefined;

/** The one sound manager, made on first use. */
export const GetSoundManager = (): HabboSoundManager => (instance ??= new HabboSoundManager());

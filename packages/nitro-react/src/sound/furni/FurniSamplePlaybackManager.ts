import { HabboSoundWithPitch } from '../HabboSoundWithPitch';
import { loadSound } from '../soundContext';
import { getSoundSampleUrl } from '../soundSampleUrl';

/**
 * The sound blocks' samples - Flash's `FurniSamplePlaybackManager`. A furni whose logic carries a
 * `soundSample` announces it when it lands in the room (`ROOM_OBJECT_INITIALIZED`, with the pitch
 * its height gives), plays it when its state changes (`PLAY_SAMPLE`), re-pitches it when it is
 * moved up or down (`CHANGE_PITCH`) and lets it go when it leaves (`ROOM_OBJECT_DISPOSED`). Each
 * furni gets its own `HabboSoundWithPitch` at the furni volume.
 *
 * Written the way Sulake's JavaScript build of the class is (`habbo-js`), which fixes two things the
 * AS3 gets wrong: it keys the loading sounds by sample and the objects waiting on each, so ten
 * blocks of one sample share one download and one decode instead of the AS3's
 * `_loadingSamples.getValues().indexOf(sampleId)` (a lookup among object ids) deciding it; and a
 * decoded sample is kept, so a block placed later plays at once.
 *
 * Port only: `reset`, which the room bridge calls when the room changes. Flash's objects all
 * announced their disposal before the room went; here the room's event handler is gone by then, and
 * object ids start over in the next room, where a stale sample would answer for a new block.
 */
export class FurniSamplePlaybackManager {
    private _disposed = false;
    private _volume = 1;
    /** Object id -> its sound, once the sample is in. */
    private _loadedSamples = new Map<number, HabboSoundWithPitch>();
    /** Sample id -> the objects waiting for it, while it downloads. */
    private _waiting = new Map<number, number[]>();
    /** Sample id -> the decoded sample. */
    private _decoded = new Map<number, AudioBuffer>();
    /** Object id -> the sample it asked for. */
    private _sampleOfObject = new Map<number, number>();
    /** Object id -> the pitch it announced itself with. */
    private _pitchOfObject = new Map<number, number>();

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) return;

        this.reset();
        this._decoded.clear();
        this._disposed = true;
    }

    /** Every furni's sound let go; the decoded samples are kept for the next room. */
    public reset(): void {
        for (const sound of this._loadedSamples.values()) sound.dispose();

        this._loadedSamples.clear();
        this._waiting.clear();
        this._sampleOfObject.clear();
        this._pitchOfObject.clear();
    }

    public updateVolume(volume: number): void {
        this._volume = volume;

        for (const sound of this._loadedSamples.values()) sound.volume = volume;
    }

    /** `onRoomObjectInitializedEvent`. */
    public onRoomObjectInitialized(objectId: number, sampleId: number, pitch: number): void {
        if (this._disposed || (sampleId === -1)) return;

        this._pitchOfObject.set(objectId, pitch);
        this.addSampleForFurni(objectId, sampleId);
    }

    /** `onRoomObjectDisposedEvent`. */
    public onRoomObjectDisposed(objectId: number): void {
        this.removeSampleForFurni(objectId);
    }

    /** `onRoomObjectPlaySampleEvent`: a block whose sample is still downloading stays silent. */
    public onRoomObjectPlaySample(objectId: number): void {
        const sound = this._loadedSamples.get(objectId);

        if (!sound) return;

        sound.stop();
        sound.play();
    }

    /** `onRoomObjectChangeSamplePitchEvent`. */
    public onRoomObjectChangeSamplePitch(objectId: number, pitch: number): void {
        this._loadedSamples.get(objectId)?.setPitch(pitch);
    }

    private addSampleForFurni(objectId: number, sampleId: number): void {
        if (this._loadedSamples.has(objectId)) return;

        this._sampleOfObject.set(objectId, sampleId);

        const decoded = this._decoded.get(sampleId);

        if (decoded) {
            this.createSound(objectId, sampleId, decoded);

            return;
        }

        const waiting = this._waiting.get(sampleId);

        if (waiting) {
            if (!waiting.includes(objectId)) waiting.push(objectId);

            return;
        }

        this._waiting.set(sampleId, [ objectId ]);
        void this.loadSample(sampleId);
    }

    private removeSampleForFurni(objectId: number): void {
        const sound = this._loadedSamples.get(objectId);
        const sampleId = this._sampleOfObject.get(objectId);

        if (sound) {
            sound.dispose();
            this._loadedSamples.delete(objectId);
        }

        if (sampleId !== undefined) {
            const waiting = this._waiting.get(sampleId);
            const index = waiting?.indexOf(objectId) ?? -1;

            if (waiting && (index >= 0)) waiting.splice(index, 1);
        }

        this._sampleOfObject.delete(objectId);
        this._pitchOfObject.delete(objectId);
    }

    /** `loadSample` / `onSampleLoadComplete` / `ioErrorHandler`. */
    private async loadSample(sampleId: number): Promise<void> {
        const buffer = await loadSound(getSoundSampleUrl(sampleId));

        if (this._disposed) return;

        const waiting = this._waiting.get(sampleId) ?? [];

        this._waiting.delete(sampleId);

        if (!buffer) return;

        this._decoded.set(sampleId, buffer);

        for (const objectId of waiting) this.createSound(objectId, sampleId, buffer);
    }

    private createSound(objectId: number, sampleId: number, buffer: AudioBuffer): void {
        if ((this._sampleOfObject.get(objectId) !== sampleId) || this._loadedSamples.has(objectId)) return;

        const sound = new HabboSoundWithPitch(buffer, this._pitchOfObject.get(objectId) ?? 1);

        sound.volume = this._volume;

        this._loadedSamples.set(objectId, sound);
    }
}

import { loadSound } from '../soundContext';
import { getSoundSampleUrl } from '../soundSampleUrl';
import { TraxSample } from '../trax/TraxSample';

/** `SAMPLE_LENGTH_MEMORY_LIMIT`: frames of samples kept before the least used are let go. */
const SAMPLE_LENGTH_MEMORY_LIMIT = 25165823;
/** `SAMPLE_LENGTH_PURGE_TO`: what a purge brings them down to. */
const SAMPLE_LENGTH_PURGE_TO = 16777215;

/** What the manager needs from the sound manager and its music controller. */
export interface TraxSampleManagerHost {
    /** The song whose samples are downloading, -1 for none. */
    getLoadingSongId(): number;
    /** `TraxSongLoadEvent.TRAX_LOAD_COMPLETE`. */
    onTraxLoadComplete(songId: number): void;
    /** `onSampleLoadError`, which Flash called beside `TRAX_LOAD_FAILED`. */
    onSampleLoadError(): void;
    /** `HabboMusicController.samplesIdsInUse`. */
    samplesIdsInUse(): number[];
    /** `HabboMusicController.samplesUnloaded`. */
    samplesUnloaded(sampleIds: number[]): void;
}

/**
 * The trax songs' samples - Flash's `TraxSampleManager`: downloads each `sound_machine_sample_<n>`
 * a song names, keeps it as a `TraxSample`, and tells the sound manager when the song being loaded
 * has all of its samples. With `trax.player.sample.memory.purge.enabled` the samples the playing
 * songs do not use are let go, least used and oldest first, once they pass 24 Mi frames.
 *
 * Flash queued the decoded sounds and converted them 60 ms' worth per frame; the port converts
 * each as its decode resolves, which is already off the frame. A sample that fails to download is
 * dropped from the loading set here - Flash kept it there, so no song after a failed sample ever
 * finished loading again.
 */
export class TraxSampleManager {
    private readonly _loadingSamples = new Set<number>();
    private readonly _traxSamples = new Map<number, TraxSample>();
    private _disposed = false;

    constructor(
        private readonly _host: TraxSampleManagerHost,
        private readonly _purgeEnabled: boolean,
    ) {}

    public get traxSamples(): Map<number, TraxSample> {
        return this._traxSamples;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) return;

        for (const sample of this._traxSamples.values()) sample.dispose();

        this._traxSamples.clear();
        this._loadingSamples.clear();
        this._disposed = true;
    }

    public loadSample(sampleId: number): void {
        if (this._loadingSamples.has(sampleId)) return;

        this._loadingSamples.add(sampleId);

        void loadSound(getSoundSampleUrl(sampleId)).then((buffer) => {
            if (this._disposed) return;

            this._loadingSamples.delete(sampleId);

            if (!buffer) {
                this._host.onSampleLoadError();

                return;
            }

            if (!this._traxSamples.has(sampleId)) this._traxSamples.set(sampleId, new TraxSample(buffer.getChannelData(0), sampleId));

            this.processLoadedSamples();
        });
    }

    /** `processLoadedSamples`'s ending: the song being loaded has everything once nothing is loading. */
    private processLoadedSamples(): void {
        if (this._loadingSamples.size || (this._host.getLoadingSongId() === -1)) return;

        this._host.onTraxLoadComplete(this._host.getLoadingSongId());

        if (this._purgeEnabled) this.processSampleMemoryUsage();
    }

    private processSampleMemoryUsage(): void {
        const inUse = this._host.samplesIdsInUse();
        const purgeable: TraxSample[] = [];
        let total = 0;

        for (const [ sampleId, sample ] of this._traxSamples) {
            if ((sample.usageCount !== 0) && !inUse.includes(sampleId)) purgeable.push(sample);

            total += sample.length;
        }

        if (total <= SAMPLE_LENGTH_MEMORY_LIMIT) return;

        purgeable.sort((a, b) => (a.usageCount - b.usageCount) || (a.usageTimeStamp - b.usageTimeStamp));

        const purged: number[] = [];
        let freed = 0;

        for (const sample of purgeable) {
            if (freed >= (total - SAMPLE_LENGTH_PURGE_TO)) break;

            freed += sample.length;
            purged.push(sample.id);
        }

        for (const sampleId of purged) {
            this._traxSamples.get(sampleId)?.dispose();
            this._traxSamples.delete(sampleId);
        }

        this._host.samplesUnloaded(purged);
    }
}

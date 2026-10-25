import { IHabboSound } from '../IHabboSound';
import { getSoundContext, SOUND_SAMPLE_RATE } from '../soundContext';
import { TraxData } from './TraxData';
import { TraxChannelSample, TraxSample } from './TraxSample';

/** `SAMPLES_PER_SECOND`. */
const SAMPLES_PER_SECOND = SOUND_SAMPLE_RATE;
/** `BUFFER_LENGTH`: frames mixed per pass. */
const BUFFER_LENGTH = 8192;
/** `SAMPLES_BAR_LENGTH`: where a bar starts, in frames. */
const SAMPLES_BAR_LENGTH = 88000;
/** `SAMPLES_PER_BAR`: how long a bar is, for measuring a sample in bars. */
const SAMPLES_PER_BAR = 88200;
/** `ROUND_UP_THRESHOLD_BIAS`: a sample 1/8 of a bar short of a whole bar still counts as one. */
const ROUND_UP_THRESHOLD_BIAS = 0.875;
/** `1 / 32768`: a mixed 16-bit frame back to -1..1. */
const FRAME_SCALE = 1 / 32768;

/** One channel's score: bar-start frames against the sample that starts there. */
interface ChannelSequence {
    keys: number[];
    samples: TraxSample[];
}

/**
 * Plays one trax song - Flash's `TraxSequencer`, written the way Sulake's JavaScript build does
 * it (`habbo-js`): `prepare` lays each channel's samples out along the song in frames, and `play`
 * mixes everything from the play head to the end (or `length` seconds of it) into one buffer, with
 * the fade-in and fade-out applied, and plays that. The AS3 fed the same mix to a `SampleDataEvent`
 * 8192 frames at a time; the frames that come out are the same.
 *
 * The mix is Flash's frame for frame: channels are summed from the last down, the last writing and
 * the others adding, each sample cut where the next one on its channel starts. A "cut mode" song
 * of the old editor (`meta` with `c,1`) is laid out by `prepareLegacySequence`, which rounds a
 * sample's bars instead of biasing them up and lets a sample that overruns its item be cut by the
 * next.
 *
 * `stop` fades out over `fadeOutSeconds` (a 50 ms timer lowering the channel's volume in Flash, a
 * gain ramp here) and then reports the song complete, as a song that plays to its end does -
 * `onComplete` stands for the `SoundCompleteEvent.TRAX_SONG_COMPLETE` Flash dispatched on the sound
 * manager's events.
 *
 * Unlike a one-shot sound, a song is started even while the page has not been interacted with yet:
 * the context holds it until the first press and it starts then, from where the song was asked to.
 * A sample shorter than an eighth of a bar measures 0 bars, which Flash divided by; such an item
 * is laid out as nothing here rather than looping forever.
 */
export class TraxSequencer implements IHabboSound {
    private static readonly MIXING_BUFFER = new Float64Array(BUFFER_LENGTH);

    private _disposed = false;
    private _volume = 1;
    private _ready = true;
    private _prepared = false;
    private _useCutMode = false;
    private _isFinished = true;
    private _sequences: ChannelSequence[] = [];
    private _lengthSamples = 0;
    /** The play head, in frames. */
    private _playHead = 0;
    /** How many frames `play` was asked for; 0 for all. */
    private _playLength = 0;
    private _fadeInSamples = 0;
    private _fadeOutSamples = 0;
    /** Where the buffer playing now started in the song, in frames. */
    private _startedAt = 0;
    private _source: AudioBufferSourceNode | null = null;
    private _gain: GainNode | null = null;
    private _playStartTime = 0;
    private _fadeOutTimer: ReturnType<typeof setTimeout> | null = null;

    constructor(
        private readonly _songId: number,
        private _traxData: TraxData,
        private _samples: Map<number, TraxSample>,
        private readonly _onComplete: (songId: number) => void,
    ) {}

    public get traxData(): TraxData {
        return this._traxData;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (this._disposed) return;

        this.removeFadeOutTimer();
        this.stopImmediately();
        this._sequences = [];
        this._disposed = true;
    }

    public get ready(): boolean {
        return this._ready;
    }

    public set ready(ready: boolean) {
        this._ready = ready;
    }

    public get finished(): boolean {
        return this._isFinished;
    }

    public get volume(): number {
        return this._volume;
    }

    public set volume(volume: number) {
        this._volume = volume;

        const audio = getSoundContext();

        if (this._gain && audio && !this._fadeOutTimer) this._gain.gain.setValueAtTime(volume, audio.currentTime);
    }

    /** Seconds; where the next `play` starts, or how far the one playing has got. */
    public get position(): number {
        const audio = getSoundContext();

        if (this._source && audio) return (this._startedAt / SAMPLES_PER_SECOND) + (audio.currentTime - this._playStartTime);

        return this._playHead / SAMPLES_PER_SECOND;
    }

    public set position(seconds: number) {
        this._playHead = Math.max(0, Math.floor(seconds * SAMPLES_PER_SECOND));
    }

    /** Seconds; known once the song is prepared. */
    public get length(): number {
        return this._lengthSamples / SAMPLES_PER_SECOND;
    }

    public get fadeOutSeconds(): number {
        return this._fadeOutSamples / SAMPLES_PER_SECOND;
    }

    public set fadeOutSeconds(seconds: number) {
        this._fadeOutSamples = Math.floor(seconds * SAMPLES_PER_SECOND);
    }

    public get fadeInSeconds(): number {
        return this._fadeInSamples / SAMPLES_PER_SECOND;
    }

    public set fadeInSeconds(seconds: number) {
        this._fadeInSamples = Math.floor(seconds * SAMPLES_PER_SECOND);
    }

    public prepare(): boolean {
        if (!this._ready) return false;

        if (this._prepared) return true;

        this._useCutMode = this._traxData.hasMetaData && this._traxData.metaCutMode;

        return this._useCutMode ? this.prepareLegacySequence() : this.prepareSequence();
    }

    private prepareSequence(): boolean {
        const now = Date.now();

        for (const channel of this._traxData.channels) {
            const sequence: ChannelSequence = { keys: [], samples: [] };
            let start = 0;
            let bars = 0;

            for (let i = 0; i < channel.itemCount; i++) {
                const item = channel.getItem(i);
                const sample = item ? this._samples.get(item.id) : undefined;

                if (!item || !sample) return false;

                sample.setUsageFromSong(this._songId, now);

                const sampleBars = this.getSampleBars(sample.length);
                const repeats = (sampleBars > 0) ? Math.floor(item.length / sampleBars) : 0;

                for (let j = 0; j < repeats; j++) {
                    if (item.id !== 0) {
                        sequence.keys.push(start);
                        sequence.samples.push(sample);
                    }

                    bars += sampleBars;
                    start = bars * SAMPLES_BAR_LENGTH;
                }

                if (this._lengthSamples < start) this._lengthSamples = start;
            }

            this._sequences.push(sequence);
        }

        this._prepared = true;

        return true;
    }

    private prepareLegacySequence(): boolean {
        const now = Date.now();

        for (const channel of this._traxData.channels) {
            const sequence: ChannelSequence = { keys: [], samples: [] };
            let itemStart = 0;
            let itemBars = 0;
            let cut = false;

            for (let i = 0; i < channel.itemCount; i++) {
                const item = channel.getItem(i);
                const sample = item ? this._samples.get(item.id) : undefined;

                if (!item || !sample) return false;

                sample.setUsageFromSong(this._songId, now);

                let bars = itemBars;
                let start = itemStart;
                const sampleBars = this.getSampleBars(sample.length);

                while ((sampleBars > 0) && (bars < (itemBars + item.length))) {
                    if ((item.id !== 0) || cut) {
                        sequence.keys.push(start);
                        sequence.samples.push(sample);
                        cut = false;
                    }

                    bars += sampleBars;
                    start = bars * SAMPLES_BAR_LENGTH;

                    if (bars > (itemBars + item.length)) cut = true;
                }

                itemBars += item.length;
                itemStart = itemBars * SAMPLES_BAR_LENGTH;

                if (this._lengthSamples < itemStart) this._lengthSamples = itemStart;
            }

            this._sequences.push(sequence);
        }

        this._prepared = true;

        return true;
    }

    /** `play(length)`: from the play head, for `length` seconds (0 to the end). */
    public play(length: number = 0): boolean {
        if (!this.prepare()) return false;

        this.removeFadeOutTimer();

        if (this._source) this.stopImmediately();

        this._isFinished = false;
        this._playLength = Math.floor(length * SAMPLES_PER_SECOND);

        const startedAt = this._playHead;
        const frames = this.render();

        this._playHead = startedAt;
        this._startedAt = startedAt;

        const audio = getSoundContext();

        if (!frames.length) {
            this.onPlayingComplete();

            return true;
        }

        // No Web Audio at all: the song counts as playing and never ends, as a muted Flash channel would not.
        if (!audio) return true;

        const buffer = audio.createBuffer(1, frames.length, SAMPLES_PER_SECOND);

        buffer.copyToChannel(frames, 0);

        const source = audio.createBufferSource();
        const gain = audio.createGain();

        source.buffer = buffer;
        gain.gain.value = this._volume;
        source.connect(gain).connect(audio.destination);
        source.onended = () => this.onPlayingComplete();
        source.start();

        this._source = source;
        this._gain = gain;
        this._playStartTime = audio.currentTime;

        return true;
    }

    public stop(): boolean {
        if ((this._fadeOutSamples > 0) && !this._isFinished) this.stopWithFadeOut();
        else this.playingComplete();

        return true;
    }

    private stopImmediately(): void {
        if (!this._source) return;

        this._source.onended = null;

        try {
            this._source.stop();
        } catch {
            // Never started.
        }

        this._source.disconnect();
        this._gain?.disconnect();
        this._source = null;
        this._gain = null;
    }

    /** `stopWithFadeout` / `onFadeOutComplete`: down from the channel's volume to nothing, then complete. */
    private stopWithFadeOut(): void {
        if (this._fadeOutTimer) return;

        const audio = getSoundContext();
        const seconds = Math.max(1, Math.floor(this._fadeOutSamples / (SAMPLES_PER_SECOND / 1000))) / 1000;

        if (audio && this._gain) {
            const now = audio.currentTime;

            this._gain.gain.cancelScheduledValues(now);
            this._gain.gain.setValueAtTime(this._gain.gain.value, now);
            this._gain.gain.linearRampToValueAtTime(0, now + seconds);
        }

        this._fadeOutTimer = setTimeout(() => {
            this._fadeOutTimer = null;
            this.playingComplete();
        }, seconds * 1000);
    }

    private removeFadeOutTimer(): void {
        if (!this._fadeOutTimer) return;

        clearTimeout(this._fadeOutTimer);
        this._fadeOutTimer = null;
    }

    private onPlayingComplete(): void {
        if (this._isFinished) return;

        this._isFinished = true;
        this.playingComplete();
    }

    private playingComplete(): void {
        this._isFinished = true;
        this.removeFadeOutTimer();
        this.stopImmediately();

        if (!this._disposed) this._onComplete(this._songId);
    }

    /** `getSampleBars`: a sample's length in bars. */
    private getSampleBars(frames: number): number {
        const bars = frames / SAMPLES_PER_BAR;

        return this._useCutMode ? Math.round(bars) : Math.floor(bars + ROUND_UP_THRESHOLD_BIAS);
    }

    /** For each channel, the index of the sample playing at the play head (-1 before its first). */
    private getChannelSequenceOffsets(): number[] {
        return this._sequences.map((sequence) => {
            let index = 0;

            while ((index < sequence.keys.length) && (sequence.keys[index] < this._playHead)) index++;

            return index - 1;
        });
    }

    /** `mixChannelsIntoBuffer`: the next `BUFFER_LENGTH` frames from the play head. */
    private mixChannelsIntoBuffer(): void {
        const buffer = TraxSequencer.MIXING_BUFFER;
        const offsets = this.getChannelSequenceOffsets();
        const channels = this._sequences.length;

        for (let channel = channels - 1; channel >= 0; channel--) {
            const sequence = this._sequences[channel];
            let index = offsets[channel] ?? -1;
            let playing: TraxChannelSample | null = null;

            const current = sequence.samples[index];

            if (current) {
                const into = this._playHead - sequence.keys[index];

                if ((current.id !== 0) && (into >= 0)) playing = new TraxChannelSample(current, into);
            }

            let count = BUFFER_LENGTH;

            if ((this._lengthSamples - this._playHead) < count) count = this._lengthSamples - this._playHead;

            let position = 0;

            while (position < count) {
                let span = count;

                if (index < (sequence.keys.length - 1)) {
                    const next = sequence.keys[index + 1];

                    if ((count + this._playHead) >= next) span = next - this._playHead;
                }

                if (span > (count - position)) span = count - position;

                if (channel === (channels - 1)) {
                    if (playing) {
                        playing.setSample(buffer, position, span);
                        position += span;
                    } else {
                        for (let i = 0; i < span; i++) buffer[position++] = 0;
                    }
                } else {
                    playing?.addSample(buffer, position, span);
                    position += span;
                }

                if (position < count) {
                    const next = sequence.samples[++index];

                    playing = (!next || (next.id === 0)) ? null : new TraxChannelSample(next, 0);
                }
            }
        }
    }

    /** The mix from the play head to the end of what was asked for, faded in and out. */
    private render(): Float32Array<ArrayBuffer> {
        const start = this._playHead;
        const end = (this._playLength > 0) ? Math.min(this._lengthSamples, start + this._playLength) : this._lengthSamples;
        const total = Math.max(0, end - start);
        const frames = new Float32Array(total);
        let written = 0;

        while (this._playHead < end) {
            this.mixChannelsIntoBuffer();

            let count = BUFFER_LENGTH;

            if ((end - this._playHead) < count) count = end - this._playHead;

            if (count <= 0) break;

            for (let i = 0; i < count; i++) {
                let value = TraxSequencer.MIXING_BUFFER[i] * FRAME_SCALE;
                const frame = written + i;

                if ((this._fadeInSamples > 0) && (frame < this._fadeInSamples)) value *= frame / this._fadeInSamples;

                if (this._fadeOutSamples > 0) {
                    const left = total - frame;

                    if (left <= this._fadeOutSamples) value *= Math.max(0, left / this._fadeOutSamples);
                }

                frames[frame] = value;
            }

            written += count;
            this._playHead += BUFFER_LENGTH;
        }

        return frames;
    }
}

import { getSoundContext, isSoundContextRunning } from './soundContext';

/** `SILENCE_MS`: how long a replayed sample stays silent, so its click from the last play is not heard. */
const SILENCE_MS = 50;
/** `FADEIN_MS`: when the sample reaches its volume. */
const FADEIN_MS = 175;

/**
 * A furni sample played at a pitch - Flash's `HabboSoundWithPitch`, used by the sound blocks
 * (`FurniSamplePlaybackManager`) and by `HabboSoundManager.playSoundAtPitch` (the cuckoo clock).
 *
 * Flash took the left channel of the decoded sound (`extractMonoSamples`) and resampled it by
 * stepping through it `pitch` frames at a time (`setPitch`), so a pitch of 2 plays an octave up in
 * half the time - which is a source node's `playbackRate`. The channel is started silent and
 * `update` (a frame receiver) brings it up: nothing for 50 ms, then `volume * t / 175` until 175 ms,
 * then the volume. That envelope is scheduled on the gain here instead of stepped per frame.
 *
 * A pitch change reaches the next play: Flash re-rendered the sound object, not the channel that
 * was already playing it.
 */
export class HabboSoundWithPitch {
    private _mono: AudioBuffer | null;
    private _pitch: number;
    private _volume = 1;
    private _source: AudioBufferSourceNode | null = null;
    private _gain: GainNode | null = null;
    private _envelopeEnd = 0;

    constructor(buffer: AudioBuffer, pitch: number = 1) {
        this._mono = HabboSoundWithPitch.extractMonoSamples(buffer);
        this._pitch = pitch;
    }

    /** `extractMonoSamples`: the left channel only, which Flash then wrote to both. */
    private static extractMonoSamples(buffer: AudioBuffer): AudioBuffer | null {
        if (buffer.numberOfChannels === 1) return buffer;

        const audio = getSoundContext();

        if (!audio) return null;

        const mono = audio.createBuffer(1, buffer.length, buffer.sampleRate);

        mono.copyToChannel(buffer.getChannelData(0), 0);

        return mono;
    }

    public get disposed(): boolean {
        return !this._mono;
    }

    public dispose(): void {
        this.stop();

        this._mono = null;
    }

    public play(): boolean {
        this.stop();

        const audio = getSoundContext();

        if (!audio || !this._mono || !isSoundContextRunning()) return true;

        const source = audio.createBufferSource();
        const gain = audio.createGain();
        const now = audio.currentTime;

        source.buffer = this._mono;
        source.playbackRate.value = this._pitch;

        gain.gain.setValueAtTime(0, now);
        gain.gain.setValueAtTime(this._volume * (SILENCE_MS / FADEIN_MS), now + (SILENCE_MS / 1000));
        gain.gain.linearRampToValueAtTime(this._volume, now + (FADEIN_MS / 1000));

        source.connect(gain).connect(audio.destination);
        source.start();

        this._source = source;
        this._gain = gain;
        this._envelopeEnd = now + (FADEIN_MS / 1000);

        return true;
    }

    public stop(): boolean {
        if (this._source) {
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

        return true;
    }

    public setPitch(pitch: number): void {
        this._pitch = pitch;
    }

    public get pitch(): number {
        return this._pitch;
    }

    public get volume(): number {
        return this._volume;
    }

    /** `HabboSoundBase.volume`: straight onto the channel, unless the fade-in is still bringing it up. */
    public set volume(volume: number) {
        this._volume = volume;

        const audio = getSoundContext();

        if (!audio || !this._gain) return;

        if (audio.currentTime >= this._envelopeEnd) {
            this._gain.gain.cancelScheduledValues(audio.currentTime);
            this._gain.gain.setValueAtTime(volume, audio.currentTime);
        } else {
            this._gain.gain.cancelScheduledValues(this._envelopeEnd);
            this._gain.gain.linearRampToValueAtTime(volume, this._envelopeEnd);
        }
    }
}

import { IHabboSound } from './IHabboSound';
import { getSoundContext, isSoundContextRunning } from './soundContext';

/**
 * One of the client's own sounds - Flash's `HabboSoundBase`: a decoded file played whole, `loops`
 * times over (`Sound.play(0, loops)`), at the volume last set. `HabboSoundManager.playSound` keeps
 * one per sound id and replays it, so a sound asked for again restarts on a new channel beside the
 * old one, as Flash's did.
 */
export class HabboSoundBase implements IHabboSound {
    private _buffer: AudioBuffer | null;
    private _loops: number;
    private _volume = 1;
    private _source: AudioBufferSourceNode | null = null;
    private _gain: GainNode | null = null;
    private _complete = false;

    constructor(buffer: AudioBuffer, loops: number = 0) {
        this._buffer = buffer;
        this._loops = loops;
    }

    public dispose(): void {
        this.stop();

        this._source = null;
        this._gain = null;
        this._buffer = null;
    }

    public play(): boolean {
        const audio = getSoundContext();

        this._complete = false;

        // Asked for before the page was interacted with: nothing would be heard until the first click.
        if (!audio || !this._buffer || !isSoundContextRunning()) return true;

        const source = audio.createBufferSource();
        const gain = audio.createGain();

        source.buffer = this._buffer;
        gain.gain.value = this._volume;

        source.connect(gain).connect(audio.destination);

        // `loops` is how many times the sound plays over: 0 and 1 both play it once.
        if (this._loops > 1) {
            source.loop = true;

            const repeats = Math.min(this._loops, Math.ceil(86400 / Math.max(this._buffer.duration, 0.001)));

            source.start(0, 0, this._buffer.duration * repeats);
        } else {
            source.start();
        }

        source.onended = () => {
            if (this._source === source) this._complete = true;
        };

        this._source = source;
        this._gain = gain;

        return true;
    }

    public stop(): boolean {
        if (this._source) {
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

        return true;
    }

    public get volume(): number {
        return this._volume;
    }

    public set volume(volume: number) {
        this._volume = volume;

        if (this._gain) this._gain.gain.value = volume;
    }

    public get position(): number {
        return 0;
    }

    public set position(_position: number) {
        // Flash's setter did nothing either.
    }

    public get length(): number {
        return this._buffer?.duration ?? 0;
    }

    public get ready(): boolean {
        return !!this._buffer;
    }

    /** Flash's getter answers `!complete` - true while it plays. Kept as Flash has it. */
    public get finished(): boolean {
        return !this._complete;
    }

    public get fadeOutSeconds(): number {
        return 0;
    }

    public set fadeOutSeconds(_seconds: number) {
        // No fades on a plain sound.
    }

    public get fadeInSeconds(): number {
        return 0;
    }

    public set fadeInSeconds(_seconds: number) {
        // No fades on a plain sound.
    }
}

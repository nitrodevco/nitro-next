/** `FADEOUT_LENGTH`: frames at a sample's end faded to nothing, so a cut does not click. */
const FADEOUT_LENGTH = 32;
/** `OFFSET_16BIT`: a stored frame's zero. */
const OFFSET_16BIT = 32767;
/** How many frames Flash packed into one stored int at 16 bits - reads and writes move in pairs. */
const FRAMES_PER_UNIT = 2;
/** The 16-bit scale: `(value + 1) / (1 / 32768)`, clamped to 0..65535. */
const SCALE = 65536;

/**
 * One sound machine sample, ready to be mixed - Flash's `TraxSample`. The decoded file's left
 * channel is quantised to 16 bits with its last 32 frames faded out; `setSample` copies it into a
 * mixing buffer and `addSample` adds it in, each from an offset into the sample, returning the
 * offset reached.
 *
 * Flash packs two 16-bit frames into each stored int and so reads and writes whole pairs: an offset
 * or a count is rounded down to an even number of frames. The port stores the frames unpacked but
 * keeps that pairing, so the mix comes out frame for frame as Flash's. `TraxSampleManager` only
 * ever builds 44.1 kHz, 16-bit samples, so the 22/11 kHz and 8-bit variants of the class are not
 * carried.
 */
export class TraxSample {
    private _frames: Int32Array | null;
    private _songs: number[] = [];
    private _usageTimeStamp = 0;

    constructor(channel: Float32Array, public readonly id: number) {
        const count = Math.floor(channel.length / FRAMES_PER_UNIT) * FRAMES_PER_UNIT;
        const frames = new Int32Array(count);

        for (let i = 0; i < count; i++) {
            let value = channel[i];

            if (i >= (count - 1 - FADEOUT_LENGTH)) value *= (count - i - 1) / FADEOUT_LENGTH;

            let quantised = Math.trunc((value + 1) * (SCALE / 2));

            if (quantised < 0) quantised = 0;
            else if (quantised >= SCALE) quantised = SCALE - 1;

            frames[i] = quantised - OFFSET_16BIT;
        }

        this._frames = frames;
    }

    /** Frames. */
    public get length(): number {
        return this._frames?.length ?? 0;
    }

    public get usageCount(): number {
        return this._songs.length;
    }

    public get usageTimeStamp(): number {
        return this._usageTimeStamp;
    }

    public get disposed(): boolean {
        return !this._frames;
    }

    public dispose(): void {
        this._frames = null;
        this._songs = [];
    }

    /** Writes `count` frames from `offset` into `buffer` at `position`, zero past the sample's end. */
    public setSample(buffer: Float64Array, position: number, count: number, offset: number): number {
        if (!this._frames) return offset;

        const frames = this._frames;
        const units = frames.length / FRAMES_PER_UNIT;
        let unit = Math.floor(offset / FRAMES_PER_UNIT);

        if (position < 0) {
            count += position;
            position = 0;
        }

        if (count > (buffer.length - position)) count = buffer.length - position;

        let copy = Math.floor(count / FRAMES_PER_UNIT);
        let silence = 0;

        if (copy > (units - unit)) {
            silence = (copy - (units - unit)) * FRAMES_PER_UNIT;
            copy = units - unit;

            if (silence > (buffer.length - position)) silence = buffer.length - position;
        }

        while (copy-- > 0) {
            buffer[position++] = frames[unit * 2];
            buffer[position++] = frames[(unit * 2) + 1];
            unit++;
        }

        while ((silence-- > 0) && (position < buffer.length)) buffer[position++] = 0;

        return unit * FRAMES_PER_UNIT;
    }

    /** Adds `count` frames from `offset` into `buffer` at `position`, stopping at the sample's end. */
    public addSample(buffer: Float64Array, position: number, count: number, offset: number): number {
        if (!this._frames) return offset;

        const frames = this._frames;
        const units = frames.length / FRAMES_PER_UNIT;
        let unit = Math.floor(offset / FRAMES_PER_UNIT);

        if (position < 0) {
            count += position;
            position = 0;
        }

        if (count > (buffer.length - position)) count = buffer.length - position;

        let copy = Math.floor(count / FRAMES_PER_UNIT);

        if (copy > (units - unit)) copy = units - unit;

        while (copy-- > 0) {
            buffer[position++] += frames[unit * 2];
            buffer[position++] += frames[(unit * 2) + 1];
            unit++;
        }

        return unit * FRAMES_PER_UNIT;
    }

    public setUsageFromSong(songId: number, timeStamp: number): void {
        if (!this._songs.includes(songId)) this._songs.push(songId);

        this._usageTimeStamp = timeStamp;
    }

    public isUsedFromSong(songId: number): boolean {
        return this._songs.includes(songId);
    }
}

/** `TraxChannelSample`: a sample playing on one channel, and how far into it the mix has got. */
export class TraxChannelSample {
    constructor(private readonly _sample: TraxSample, private _offset: number) {}

    public setSample(buffer: Float64Array, position: number, count: number): void {
        this._offset = this._sample.setSample(buffer, position, count, this._offset);
    }

    public addSample(buffer: Float64Array, position: number, count: number): void {
        this._offset = this._sample.addSample(buffer, position, count, this._offset);
    }
}

/** An RGB colour that linearly fades to its target over a fixed duration. */
export class AnimatedColor {
    private _durationMs: number;
    private _startColor: number = 0;
    private _startTime: number = 0;
    private _target: number = 0;
    private _value: number = 0;

    constructor(durationMs: number) {
        this._durationMs = Math.max(0, durationMs);
    }

    public get value(): number {
        return this._value;
    }

    public snapTo(color: number, time: number): void {
        const normalized = color & 0xffffff;

        this._startColor = normalized;
        this._startTime = time;
        this._target = normalized;
        this._value = normalized;
    }

    public setTarget(color: number, time: number): void {
        this.update(time);

        this._startColor = this._value;
        this._startTime = time;
        this._target = color & 0xffffff;
    }

    public needsUpdate(_time: number): boolean {
        return this._value !== this._target;
    }

    public update(time: number): boolean {
        const previous = this._value;

        if (this._durationMs === 0 || time >= this._startTime + this._durationMs) {
            this._value = this._target;

            return previous !== this._value;
        }

        const ratio = Math.max(0, (time - this._startTime) / this._durationMs);

        this._value = (this.interpolateChannel((this._startColor >> 16) & 0xff, (this._target >> 16) & 0xff, ratio) << 16)
            | (this.interpolateChannel((this._startColor >> 8) & 0xff, (this._target >> 8) & 0xff, ratio) << 8)
            | this.interpolateChannel(this._startColor & 0xff, this._target & 0xff, ratio);

        return previous !== this._value;
    }

    private interpolateChannel(from: number, to: number, ratio: number): number {
        return Math.round(from + (to - from) * ratio);
    }
}

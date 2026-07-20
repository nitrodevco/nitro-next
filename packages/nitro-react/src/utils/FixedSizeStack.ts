export class FixedSizeStack {
    private _data: number[] = [];
    private _index = 0;

    constructor(private readonly _maxSize: number) {
    }

    public reset(): void {
        this._data = [];
        this._index = 0;
    }

    public addValue(value: number): void {
        if (this._data.length < this._maxSize) {
            this._data.push(value);
        }
        else {
            this._data[this._index] = value;
        }

        this._index = (this._index + 1) % this._maxSize;
    }

    public getMax(): number {
        return this._data.length > 0 ? Math.max(...this._data) : -Infinity;
    }

    public getMin(): number {
        return this._data.length > 0 ? Math.min(...this._data) : Infinity;
    }
}
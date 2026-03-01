export class NumberBank {
    private _reservedNumbers: number[] = [];
    private _freeNumbers: number[] = [];

    constructor(count: number) {
        if (count < 0) count = 0;

        let i = 0;

        while (i < count) {
            this._freeNumbers.push(i);

            i++;
        }
    }

    public dispose(): void {
        this._reservedNumbers = [];
        this._freeNumbers = [];
    }

    public reserveNumber(): number {
        if (this._freeNumbers.length > 0) {
            const num = this._freeNumbers.pop();

            if (num !== undefined) {
                this._reservedNumbers.push(num);

                return num;
            }
        }

        return -1;
    }

    public freeNumber(num: number): void {
        const i = this._reservedNumbers.indexOf(num);

        if (i >= 0) {
            this._reservedNumbers.splice(i, 1);

            this._freeNumbers.push(num);
        }
    }
}

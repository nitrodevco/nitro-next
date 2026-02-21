export class DirectionalOffsetData {
    private _offsetX: Map<number, number> = new Map();
    private _offsetY: Map<number, number> = new Map();

    public getXOffset(direction: number, defaultX: number): number {
        return this._offsetX.get(direction) ?? defaultX;
    }

    public getYOffset(direction: number, defaultY: number): number {
        return this._offsetY.get(direction) ?? defaultY;
    }

    public setDirection(direction: number, offsetX: number, offsetY: number): void {
        this._offsetX.set(direction, offsetX);
        this._offsetY.set(direction, offsetY);
    }
}

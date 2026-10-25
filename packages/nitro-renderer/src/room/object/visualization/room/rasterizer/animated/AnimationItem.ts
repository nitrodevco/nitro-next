import { Point, Texture } from 'pixi.js';

/**
 * One moving bitmap of a landscape's animation layer - a cloud. Its `x` / `y` are fractions of the
 * whole landscape and its speeds are landscape units per second, so a cloud keeps its pace however
 * wide the room's windows make the landscape. Ports Flash `AnimationItem`.
 */
export class AnimationItem {
    private _x: number;
    private _y: number;
    private _speedX: number;
    private _speedY: number;
    private _bitmapData: Texture | undefined;

    constructor(x: number, y: number, speedX: number, speedY: number, bitmapData: Texture) {
        this._x = isNaN(x) ? 0 : x;
        this._y = isNaN(y) ? 0 : y;
        this._speedX = isNaN(speedX) ? 0 : speedX;
        this._speedY = isNaN(speedY) ? 0 : speedY;
        this._bitmapData = bitmapData;
    }

    public get bitmapData(): Texture | undefined {
        return this._bitmapData;
    }

    public dispose(): void {
        this._bitmapData = undefined;
    }

    /** The item's pixel position in a landscape `maxX` x `maxY` pixels (`maxXUnits` x `maxYUnits` units) at `timeSinceStartMs`. */
    public getPosition(maxX: number, maxY: number, maxXUnits: number, maxYUnits: number, timeSinceStartMs: number): Point {
        let x = this._x;
        let y = this._y;

        if (maxXUnits > 0) x += ((this._speedX / maxXUnits) * timeSinceStartMs) / 1000;
        if (maxYUnits > 0) y += ((this._speedY / maxYUnits) * timeSinceStartMs) / 1000;

        return new Point(Math.trunc((x % 1) * maxX), Math.trunc((y % 1) * maxY));
    }
}

import type { IFurnitureStackingHeightMap } from '@nitrodevco/nitro-api';

export class FurnitureStackingHeightMap implements IFurnitureStackingHeightMap {
    private _width: number;
    private _height: number;
    private _heights: number[] = [];
    private _isNotStackable: boolean[] = [];
    private _isRoomTile: boolean[] = [];

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
        this._heights = [];
        this._isNotStackable = [];
        this._isRoomTile = [];

        let total = width * height;

        while (total > 0) {
            this._heights.push(0);
            this._isNotStackable.push(false);
            this._isRoomTile.push(false);

            total--;
        }
    }

    public dispose(): void {
        this._width = 0;
        this._height = 0;
        this._heights = [];
        this._isNotStackable = [];
        this._isRoomTile = [];
    }

    private validPosition(x: number, y: number): boolean {
        return x >= 0 && x < this._width && y >= 0 && y < this._height;
    }

    public getTileHeight(x: number, y: number): number {
        return this.validPosition(x, y) ? this._heights[y * this._width + x] : 0;
    }

    public setTileHeight(x: number, y: number, height: number): void {
        if (this.validPosition(x, y)) this._heights[y * this._width + x] = height;
    }

    public setStackingBlocked(x: number, y: number, isNotStackable: boolean): void {
        if (this.validPosition(x, y)) this._isNotStackable[y * this._width + x] = isNotStackable;
    }

    public setIsRoomTile(x: number, y: number, isRoomTile: boolean): void {
        if (this.validPosition(x, y)) this._isRoomTile[y * this._width + x] = isRoomTile;
    }

    public validateLocation(
        x: number,
        y: number,
        sizeX: number,
        sizeY: number,
        prevX: number,
        prevY: number,
        prevSizeX: number,
        prevSizeY: number,
        alwaysStackable: boolean,
        height: number = -1,
    ): boolean {
        if (!this.validPosition(x, y) || !this.validPosition(x + sizeX - 1, y + sizeY - 1)) return false;

        if (prevX < 0 || prevX >= this._width) prevX = 0;

        if (prevY < 0 || prevY >= this._height) prevY = 0;

        prevSizeX = Math.min(prevSizeX, this._width - prevX);
        prevSizeY = Math.min(prevSizeY, this._height - prevY);

        if (height === -1) height = this.getTileHeight(x, y);

        let tileY = y;

        while (tileY < y + sizeY) {
            let tileX = x;

            while (tileX < x + sizeX) {
                if (
                    tileX < prevX ||
                    tileX >= prevX + prevSizeX ||
                    tileY < prevY ||
                    tileY >= prevY + prevSizeY
                ) {
                    const tileIndex = tileY * this._width + tileX;

                    if (alwaysStackable) {
                        if (!this._isRoomTile[tileIndex]) return false;
                    } else if (
                        this._isNotStackable[tileIndex] ||
                        !this._isRoomTile[tileIndex] ||
                        Math.abs(this._heights[tileIndex] - height) > 0.01
                    )
                        return false;
                }

                tileX++;
            }

            tileY++;
        }

        return true;
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }
}

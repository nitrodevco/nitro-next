import { IRoomObject, ITileObjectMap, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

/**
 * `TileObjectMap`: the topmost floor object on each tile of the stacking height map, so the tile
 * cursor can ask what it stands on (`RoomObjectEventHandler.handleMouseOverTile`). An object
 * covers its footprint, turned with its direction; on a shared tile the highest one wins.
 */
export class TileObjectMap implements ITileObjectMap {
    private _tiles: (IRoomObject | undefined)[][];
    private _width: number;
    private _height: number;

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;
        this._tiles = Array.from({ length: height }, () => new Array<IRoomObject | undefined>(width).fill(undefined));
    }

    public clear(): void {
        for (const row of this._tiles) row.fill(undefined);
    }

    public populate(objects: IRoomObject[]): void {
        this.clear();

        for (const object of objects) this.addRoomObject(object);
    }

    public dispose(): void {
        this._tiles = [];
        this._width = 0;
        this._height = 0;
    }

    public getObjectIntTile(x: number, y: number): IRoomObject | undefined {
        if ((x >= 0) && (x < this._width) && (y >= 0) && (y < this._height)) return this._tiles[y][x];

        return undefined;
    }

    public setObjectInTile(x: number, y: number, object: IRoomObject): void {
        if (!object.isReady) return;

        if ((x >= 0) && (x < this._width) && (y >= 0) && (y < this._height)) this._tiles[y][x] = object;
    }

    public addRoomObject(object: IRoomObject): void {
        if (!object?.model || !object.isReady) return;

        const location = object.getLocation();
        const direction = object.getDirection();

        if (!location || !direction) return;

        let sizeX = Math.trunc(object.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeX)) || 0;
        let sizeY = Math.trunc(object.model.getValue<number>(RoomObjectVariableEnum.FurnitureSizeY)) || 0;

        if (sizeX < 1) sizeX = 1;
        if (sizeY < 1) sizeY = 1;

        const quarter = Math.trunc(((direction.x + 45) % 360) / 90);

        if ((quarter === 1) || (quarter === 3)) [ sizeX, sizeY ] = [ sizeY, sizeX ];

        const startX = Math.trunc(location.x);
        const startY = Math.trunc(location.y);

        for (let y = startY; y < (location.y + sizeY); y++) {
            for (let x = startX; x < (location.x + sizeX); x++) {
                const existing = this.getObjectIntTile(x, y);

                if (!existing || ((existing !== object) && (existing.getLocation().z <= location.z))) this.setObjectInTile(x, y, object);
            }
        }
    }
}

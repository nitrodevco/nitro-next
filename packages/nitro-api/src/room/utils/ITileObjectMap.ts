import type { IRoomObject } from '../object';

export interface ITileObjectMap {
    clear(): void;
    populate(k: IRoomObject[]): void;
    dispose(): void;
    getObjectIntTile(k: number, _arg_2: number): IRoomObject | undefined;
    setObjectInTile(k: number, _arg_2: number, _arg_3: IRoomObject): void;
    addRoomObject(k: IRoomObject): void;
}

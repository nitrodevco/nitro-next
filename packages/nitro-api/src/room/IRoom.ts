import type { Container } from 'pixi.js';

import type { IRoomGeometry } from './IRoomGeometry';
import type { IRoomMapData, RoomObjectVariableEnum } from './object';

export interface IRoom {
    prepareRoom(roomMap: IRoomMapData): Promise<boolean>;
    getRoomDisplay(canvasId: number, width: number, height: number, scale: number): Container | undefined;
    getGeometry(canvasId: number): IRoomGeometry | undefined;
    getRoomValue<T>(key: RoomObjectVariableEnum): T;
    update(time: number, update?: boolean): void;
}

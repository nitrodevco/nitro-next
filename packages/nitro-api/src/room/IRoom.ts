import type { Container, PointData } from 'pixi.js';

import type { IVector3D } from '../utils';
import type { IRoomGeometry } from './IRoomGeometry';
import type { IRoomInstance } from './IRoomInstance';
import type {
    IObjectData,
    IRoomMapData,
    IRoomObject,
    IRoomObjectController,
    RoomObjectCategoryEnum,
    RoomObjectVariableEnum,
} from './object';

export interface IRoom {
    prepareRoom(): Promise<boolean>;
    getRoomDisplay(width: number, height: number, scale: number): Container | undefined;
    applyRoomMap(roomMap: IRoomMapData): Promise<void>;
    dispatchMouseEvent(
        x: number,
        y: number,
        type: string,
        altKey: boolean,
        ctrlKey: boolean,
        shiftKey: boolean,
        buttonDown: boolean,
    ): void;
    getGeometry(): IRoomGeometry | undefined;
    getRoomObject(objectId: number, category: RoomObjectCategoryEnum): IRoomObjectController;
    removeRoomObject(objectId: number, category: number): void;
    createRoomObjectFloor(id: number, type: string): Promise<IRoomObject | undefined>;
    updateRoomObjectFloor(
        objectId: number,
        location: IVector3D,
        direction: IVector3D,
        state: number,
        data: IObjectData,
        extra?: number,
    ): boolean;
    updateRoomObjectFloorHeight(objectId: number, height: number): boolean;
    addFurnitureByTypeId(
        id: number,
        typeId: number,
        location: IVector3D,
        direction: IVector3D,
        state: number,
        objectData: IObjectData,
        extra?: number,
        expires?: number,
        usagePolicy?: number,
        ownerId?: number,
        ownerName?: string,
        synchronized?: boolean,
        realRoomObject?: boolean,
        sizeZ?: number,
    ): Promise<boolean>;
    addFurnitureFloorByTypeName(
        id: number,
        typeName: string,
        location: IVector3D,
        direction: IVector3D,
        state: number,
        objectData: IObjectData,
        extra?: number,
        expires?: number,
        usagePolicy?: number,
        ownerId?: number,
        ownerName?: string,
        synchronized?: boolean,
        realRoomObject?: boolean,
        sizeZ?: number,
        typeId?: number,
    ): Promise<boolean>;
    removeRoomObjectFloor(objectId: number, userId?: number, _arg_4?: boolean): void;
    getRoomObjectScreenLocation(objectId: number, category: RoomObjectCategoryEnum): PointData | undefined;
    getRoomValue<T>(key: RoomObjectVariableEnum): T;
    update(time: number, update?: boolean): void;
    readonly roomId: number;
    readonly modelName: string;
    readonly instance: IRoomInstance;
    readonly isDecorating: boolean;
}

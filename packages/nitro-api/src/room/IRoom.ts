import type { Container, PointData } from 'pixi.js';

import type { IEventDispatcher } from '../events';
import type { IVector3D } from '../utils';
import type { IRoomEventHandler } from './IRoomEventHandler';
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
import type { IRoomAreaSelectionManager } from './utils';

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
    ): Promise<void>;
    getGeometry(): IRoomGeometry | undefined;
    getRoomObject(objectId: number, category: RoomObjectCategoryEnum): IRoomObjectController;
    getRoomObjectsForCategory(category: RoomObjectCategoryEnum): IRoomObject[];
    removeRoomObject(objectId: number, category: RoomObjectCategoryEnum): void;
    createRoomObjectAndInitalize(
        objectId: number,
        type: string,
        category: RoomObjectCategoryEnum,
    ): Promise<IRoomObject | undefined>;
    createRoomObjectFloor(id: number, type: string): Promise<IRoomObject | undefined>;
    createRoomObjectWall(id: number, type: string): Promise<IRoomObject | undefined>;
    createRoomObjectUser(id: number, type: string): Promise<IRoomObject | undefined>;
    updateRoomObjectFloor(
        objectId: number,
        location: IVector3D,
        direction: IVector3D,
        state: number,
        data?: IObjectData,
        extra?: number,
    ): boolean;
    updateRoomObjectWall(
        objectId: number,
        location: IVector3D,
        direction: IVector3D,
        state: number,
        data?: IObjectData,
        extra?: number,
    ): boolean;
    updateRoomObjectFloorHeight(objectId: number, height: number): boolean;
    updateRoomObjectMask(objectId: number, add?: boolean): void;
    addFurnitureByTypeId(
        id: number,
        typeId: number,
        location: IVector3D,
        direction: IVector3D,
        state: number,
        objectData?: IObjectData,
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
        objectData?: IObjectData,
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
    addFurnitureWallByTypeId(
        id: number,
        typeId: number,
        location: IVector3D,
        direction: IVector3D,
        state: number,
        extra?: number,
        expires?: number,
        usagePolicy?: number,
        ownerId?: number,
        ownerName?: string,
        synchronized?: boolean,
        realRoomObject?: boolean,
        sizeZ?: number,
    ): Promise<boolean>;
    addRoomObjectUser(
        objectId: number,
        location: IVector3D,
        direction: IVector3D,
        headDirection: number,
        type: number,
        figure: string,
    ): Promise<boolean>;
    removeRoomObjectFloor(objectId: number, userId?: number, _arg_4?: boolean): void;
    removeRoomObjectWall(objectId: number, userId?: number): void;
    getRoomObjectScreenLocation(objectId: number, category: RoomObjectCategoryEnum): PointData | undefined;
    getRoomValue<T>(key: RoomObjectVariableEnum): T;
    update(time: number, update?: boolean): void;
    getRoomObjectRoom(): IRoomObjectController;
    getRoomObjectCursor(): IRoomObjectController;
    getRoomObjectSelectionArrow(): IRoomObjectController;
    readonly roomId: number;
    readonly modelName: string;
    readonly instance: IRoomInstance;
    readonly eventDispatcher: IEventDispatcher;
    readonly eventHandler: IRoomEventHandler;
    readonly areaSelection: IRoomAreaSelectionManager;
    readonly isAreaSelectionMode: boolean;
    readonly isDecorating: boolean;
}

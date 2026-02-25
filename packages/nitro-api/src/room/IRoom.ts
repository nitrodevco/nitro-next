import type { Container } from 'pixi.js';

import type { IVector3D } from '../utils';
import type { IRoomGeometry } from './IRoomGeometry';
import type {
    IObjectData,
    IRoomMapData,
    IRoomObjectController,
    RoomObjectCategoryEnum,
    RoomObjectVariableEnum,
} from './object';
import type {
    IFurnitureStackingHeightMap,
    ILegacyWallGeometry,
    ISelectedRoomObjectData,
    ITileObjectMap,
} from './utils';

export interface IRoom {
    prepareRoom(): Promise<boolean>;
    getRoomDisplay(canvasId: number, width: number, height: number, scale: number): Container | undefined;
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
    getGeometry(canvasId: number): IRoomGeometry | undefined;
    getRoomObject(objectId: number, category: RoomObjectCategoryEnum): IRoomObjectController;
    removeRoomObject(objectId: number, category: number): void;
    setSelectedObject(data: ISelectedRoomObjectData): void;
    setPlacedObject(data: ISelectedRoomObjectData): void;
    setFurnitureStackingHeightMap(heightMap: IFurnitureStackingHeightMap): void;
    addButtonMouseCursorOwner(k: string): boolean;
    removeButtonMouseCursorOwner(k: string): boolean;
    hasButtonMouseCursorOwners(): boolean;
    getRoomValue<T>(key: RoomObjectVariableEnum): T;
    update(time: number, update?: boolean): void;
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
    roomId: number;
    modelName: string;
    legacyGeometry: ILegacyWallGeometry;
    tileObjectMap: ITileObjectMap;
    selectedObject: ISelectedRoomObjectData;
    placedObject: ISelectedRoomObjectData;
    furnitureStackingHeightMap: IFurnitureStackingHeightMap;
}

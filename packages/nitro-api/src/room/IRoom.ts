import type { Container, ImageLike, PointData, Rectangle } from 'pixi.js';

import type { IEventDispatcher, INitroEvent } from '../events';
import type { IPetCustomPart } from '../session';
import type { IVector3D } from '../utils';
import type { RoomGeometryScaleType } from './enum';
import type { IRoomEventHandler } from './IRoomEventHandler';
import type { IRoomGeometry } from './IRoomGeometry';
import type { IRoomInstance } from './IRoomInstance';
import type { IRoomRenderingCanvas } from './IRoomRenderingCanvas';
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
    prepareRoom(): boolean;
    getRoomCanvas(width: number, height: number, scale: number): IRoomRenderingCanvas;
    applyRoomMap(roomMap: IRoomMapData): void;
    getRoomObjectBoundingRectangle(objectId: number, category: RoomObjectCategoryEnum): Rectangle | undefined;
    setRoomInstanceRenderingCanvasOffset(point: PointData): boolean;
    getGeometry(): IRoomGeometry | undefined;
    getRoomObject(objectId: number, category: RoomObjectCategoryEnum): IRoomObjectController;
    getRoomObjectsForCategory(category: RoomObjectCategoryEnum): IRoomObject[];
    getRoomObjectCategoryForType(type: string): RoomObjectCategoryEnum;
    removeRoomObject(objectId: number, category: RoomObjectCategoryEnum): void;
    createRoomObjectAndInitalize(
        objectId: number,
        type: string,
        category: RoomObjectCategoryEnum,
    ): IRoomObject | undefined;
    objectInitialized(objectId: number, category: RoomObjectCategoryEnum): void;
    reinitializeRoomObjectsByType(type: string): void;
    createRoomObjectFloor(id: number, type: string): IRoomObject | undefined;
    createRoomObjectWall(id: number, type: string): IRoomObject | undefined;
    createRoomObjectUser(id: number, type: string): IRoomObject | undefined;
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
    addFurnitureFloorByTypeId(
        objectId: number,
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
    ): boolean;
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
    ): boolean;
    addFurnitureWallByTypeId(
        objectId: number,
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
    ): boolean;
    addFurnitureWallByTypeName(
        objectId: number,
        typeName: string,
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
        typeId?: number
    ): boolean;
    addRoomObjectUser(
        objectId: number,
        location: IVector3D,
        direction: IVector3D,
        headDirection: number,
        type: number,
        figure: string,
    ): boolean;
    removeRoomObjectFloor(objectId: number, isOwner?: boolean, _arg_4?: boolean): void;
    removeRoomObjectWall(objectId: number, isOwner?: boolean): void;
    getRoomObjectScreenLocation(objectId: number, category: RoomObjectCategoryEnum): PointData | undefined;
    getRoomObjectImage(objectId: number, category: RoomObjectCategoryEnum, direction: IVector3D, scale: RoomGeometryScaleType): Promise<ImageLike | undefined>;
    getRoomObjectPetImage(typeId: number, paletteId: number, color: number, direction: IVector3D, scale: RoomGeometryScaleType, headOnly?: boolean, customParts?: IPetCustomPart[], posture?: string): Promise<ImageLike | undefined>;
    setRoomOverlayIconSprite(id: number, category: RoomObjectCategoryEnum, realRoomObject: boolean, extra?: string, posture?: string): Promise<void>;
    setRoomOverlayIconSpriteVisibility(flag: boolean): void
    removeRoomOverlayIconSprite(): void;
    getRoomValue<T>(key: RoomObjectVariableEnum): T;
    getRoomObjectRoom(): IRoomObjectController;
    getRoomObjectCursor(): IRoomObjectController;
    getRoomObjectSelectionArrow(): IRoomObjectController;
    getRoomOverlay(): Container | undefined;
    getRoomOverlayIconSprite(): Container | undefined;
    dispatchEvent(event: INitroEvent): void;
    readonly roomId: number;
    readonly modelName: string;
    readonly instance: IRoomInstance;
    readonly eventDispatcher: IEventDispatcher;
    readonly eventHandler: IRoomEventHandler;
    readonly areaSelection: IRoomAreaSelectionManager;
    readonly isAreaSelectionMode: boolean;
}

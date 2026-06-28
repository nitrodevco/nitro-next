import type { Container, ImageLike, PointData, Rectangle } from 'pixi.js';

import type { IEventDispatcher, INitroEvent } from '../events';
import type { IPetCustomPart } from '../session';
import type { IVector3D } from '../utils';
import type { FurnitureUsagePolicyEnum, RoomGeometryScaleType, RoomThicknessType } from './enum';
import type { IRoomEventHandler } from './IRoomEventHandler';
import type { IRoomGeometry } from './IRoomGeometry';
import type { IRoomObjectManager } from './IRoomObjectManager';
import type { IRoomRenderingCanvas } from './IRoomRenderingCanvas';
import type {
    IObjectData,
    IRoomMapData,
    IRoomObject,
    IRoomObjectController,
    RoomObjectCategoryEnum,
    RoomObjectUserType,
    RoomObjectVariableEnum,
} from './object';
import type { ILegacyWallGeometry, IRoomAreaSelectionManager } from './utils';

export interface IRoom {
    dispose(): void;
    getRoomCanvas(width: number, height: number, scale: RoomGeometryScaleType): IRoomRenderingCanvas;
    resizeRoomCanvas(width: number, height: number, scale: RoomGeometryScaleType): void;
    applyRoomMap(roomMap: IRoomMapData): void;
    update(time: number, update?: boolean): void;
    getRoomObjectBoundingRectangle(objectId: number, category: RoomObjectCategoryEnum): Rectangle | undefined;
    setRoomInstanceRenderingCanvasOffset(point: PointData): boolean;
    getRoomObjectManager(category: number): IRoomObjectManager | undefined;
    getTotalObjectsForManager(category: RoomObjectCategoryEnum): number;
    getObjectInstanceId(object: IRoomObject): number;
    getRoomObject(objectId: number, category: RoomObjectCategoryEnum): IRoomObjectController | undefined;
    getRoomObjectByIndex(index: number, category: RoomObjectCategoryEnum): IRoomObject | undefined;
    getRoomObjectByInstanceId(instanceId: number): IRoomObject | undefined;
    getRoomObjectsForCategory(category: RoomObjectCategoryEnum): IRoomObject[];
    getRoomObjectCategoryForType(type: string): RoomObjectCategoryEnum;
    hasUninitializedRoomObjects(): boolean;
    removeAllRoomObjectManagers(): void;
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
    addFurnitureFloorByTypeId(
        objectId: number,
        typeId: number,
        location: IVector3D,
        direction: IVector3D,
        state: number,
        objectData?: IObjectData,
        extra?: number,
        expires?: number,
        usagePolicy?: FurnitureUsagePolicyEnum,
        ownerId?: number,
        ownerName?: string,
        realRoomObject?: boolean,
        sizeZ?: number,
    ): boolean;
    addFurnitureFloorByTypeName(
        objectId: number,
        typeName: string,
        location: IVector3D,
        direction: IVector3D,
        state: number,
        objectData?: IObjectData,
        extra?: number,
        expires?: number,
        usagePolicy?: FurnitureUsagePolicyEnum,
        ownerId?: number,
        ownerName?: string,
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
        data: string,
        expires?: number,
        usagePolicy?: number,
        ownerId?: number,
        ownerName?: string,
        realRoomObject?: boolean,
    ): boolean;
    addRoomObjectUser(
        objectId: number,
        location: IVector3D,
        direction: IVector3D,
        headDirection: number,
        type: RoomObjectUserType,
        figure: string,
    ): boolean;
    updateRoomObjectFloor(
        objectId: number,
        location: IVector3D | undefined,
        direction: IVector3D | undefined,
        state: number,
        data?: IObjectData,
        extra?: number,
    ): boolean;
    updateRoomObjectWall(
        objectId: number,
        location: IVector3D | undefined,
        direction: IVector3D | undefined,
        state: number,
        data: string
    ): boolean
    updateRoomObjectWallState(
        objectId: number,
        state: number,
        data: string
    ): boolean;
    updateRoomObjectWallItemData(
        objectId: number,
        data: string
    ): boolean;
    updateRoomObjectFloorHeight(objectId: number, height: number): boolean;
    updateRoomObjectMask(objectId: number, add?: boolean): boolean;
    updateRoomPlaneType(floorType: string | undefined, wallType: string | undefined, landscapeType: string | undefined): boolean;
    updateRoomPlaneVisibilities(wallVisible: boolean, floorVisible?: boolean): boolean;
    updateRoomPlaneThickness(wallThickness: RoomThicknessType, floorThickness: RoomThicknessType): boolean;
    updateRoomObjectFloorExpiration(objectId: number, expires: number): boolean;
    updateRoomObjectWallExpiration(objectId: number, expires: number): boolean;
    updateRoomObjectUser(objectId: number, location: IVector3D, target: IVector3D, canStandUp?: boolean, baseY?: number, direction?: IVector3D | undefined, headDirection?: number, animationTime?: number): boolean;
    updateRoomObjectUserOwn(objectId: number): boolean;
    updateRoomObjectUserAction(objectId: number, action: RoomObjectVariableEnum, value: number, parameter?: string): boolean;
    updateRoomObjectUserFigure(objectId: number, figure: string, gender?: string, subType?: string, isRiding?: boolean): boolean;
    updateRoomObjectUserFlatControl(objectId: number, level: string): boolean;
    updateRoomObjectUserEffect(objectId: number, effectId: number, delay?: number): boolean;
    updateRoomObjectUserGesture(objectId: number, gestureId: number): boolean;
    updateRoomObjectUserPetGesture(objectId: number, gesture: string): boolean;
    updateRoomObjectUserPosture(objectId: number, type: string, parameter?: string): boolean;
    removeRoomObjectFloor(objectId: number, isOwner?: boolean): void;
    removeRoomObjectWall(objectId: number, isOwner?: boolean): void;
    getRoomObjectScreenLocation(objectId: number, category: RoomObjectCategoryEnum): PointData | undefined;
    getRoomObjectImage(objectId: number, category: RoomObjectCategoryEnum, direction: IVector3D, scale: RoomGeometryScaleType): Promise<ImageLike | undefined>;
    getRoomObjectPetImage(typeId: number, paletteId: number, color: number, direction: IVector3D, scale: RoomGeometryScaleType, headOnly?: boolean, customParts?: IPetCustomPart[], posture?: string): Promise<ImageLike | undefined>;
    setRoomOverlayIconSprite(id: number, category: RoomObjectCategoryEnum, realRoomObject: boolean, extra?: string, posture?: string): Promise<void>;
    setRoomOverlayIconSpriteVisibility(flag: boolean): void
    removeRoomOverlayIconSprite(): void;
    setLegacyGeometry(geometry: ILegacyWallGeometry): void;
    getRoomValue<T>(key: RoomObjectVariableEnum): T;
    setRoomValue<T>(key: RoomObjectVariableEnum, value: T): void;
    getGeometry(): IRoomGeometry | undefined;
    getRoomObjectRoom(): IRoomObjectController | undefined;
    getRoomObjectCursor(): IRoomObjectController | undefined;
    getRoomObjectSelectionArrow(): IRoomObjectController | undefined;
    getRoomOverlay(): Container | undefined;
    getRoomOverlayIconSprite(): Container | undefined;
    getPetTypeId(figure: string): number;
    dispatchEvent(event: INitroEvent): void;
    readonly disposed: boolean;
    readonly roomId: number;
    readonly eventDispatcher: IEventDispatcher;
    readonly canvas: IRoomRenderingCanvas | undefined;
    readonly eventHandler: IRoomEventHandler;
    readonly objects: Map<number, IRoomObject>;
    readonly managers: Map<RoomObjectCategoryEnum, IRoomObjectManager>;
    readonly areaSelection: IRoomAreaSelectionManager;
    readonly isAreaSelectionMode: boolean;
    readonly legacyGeometry: ILegacyWallGeometry | undefined;
}

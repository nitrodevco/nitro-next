import type { RoomGeometryScaleType } from './enum';
import type { IRoomObjectManager } from './IRoomObjectManager';
import type { IRoomRenderingCanvas } from './IRoomRenderingCanvas';
import type { IRoomObject, IRoomObjectModel, RoomObjectCategoryEnum } from './object';
import type {
    IFurnitureStackingHeightMap,
    ILegacyWallGeometry,
    ISelectedRoomObjectData,
    ITileObjectMap,
} from './utils';

export interface IRoomInstance {
    dispose(): void;
    createCanvas(width: number, height: number, scale: RoomGeometryScaleType): IRoomRenderingCanvas;
    getObjectManager(category: number): IRoomObjectManager | undefined;
    getTotalObjectsForManager(category: RoomObjectCategoryEnum): number;
    getObjectInstanceId(object: IRoomObject): number;
    getRoomObject(id: number, category: RoomObjectCategoryEnum): IRoomObject | undefined;
    getRoomObjectByIndex(index: number, category: RoomObjectCategoryEnum): IRoomObject | undefined;
    getRoomObjectsForCategory(category: RoomObjectCategoryEnum): IRoomObject[];
    getRoomObjectByInstanceId(instanceId: number): IRoomObject | undefined;
    createRoomObject(
        id: number,
        stateCount: number,
        type: string,
        category: RoomObjectCategoryEnum,
    ): IRoomObject | undefined;
    removeRoomObject(id: number, category: RoomObjectCategoryEnum): void;
    removeAllManagers(): void;
    addUpdateCategory(category: RoomObjectCategoryEnum): void;
    removeUpdateCategory(category: RoomObjectCategoryEnum): void;
    update(time: number, update?: boolean): void;
    hasUninitializedObjects(): boolean;
    setLegacyGeometry(geometry: ILegacyWallGeometry);
    setSelectedObject(data: ISelectedRoomObjectData | undefined): void;
    setPlacedObject(data: ISelectedRoomObjectData | undefined): void;
    setFurnitureStackingHeightMap(heightMap: IFurnitureStackingHeightMap): void;
    readonly id: number;
    readonly canvas: IRoomRenderingCanvas | undefined;
    readonly objects: Map<number, IRoomObject>;
    readonly managers: Map<RoomObjectCategoryEnum, IRoomObjectManager>;
    readonly model: IRoomObjectModel;
    roomObjectVariableAccurateZ: string;
    legacyGeometry: ILegacyWallGeometry;
    tileObjectMap: ITileObjectMap;
    readonly selectedObject: ISelectedRoomObjectData | undefined;
    readonly placedObject: ISelectedRoomObjectData | undefined;
    furnitureStackingHeightMap: IFurnitureStackingHeightMap;
}

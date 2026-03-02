import type { IRoomObjectManager } from './IRoomObjectManager';
import type { IRoomObject, IRoomObjectModel, RoomObjectCategoryEnum } from './object';
import type { IRoomRenderer } from './renderer';
import type {
    IFurnitureStackingHeightMap,
    ILegacyWallGeometry,
    ISelectedRoomObjectData,
    ITileObjectMap,
} from './utils';

export interface IRoomInstance {
    dispose(): void;
    setRenderer(renderer: IRoomRenderer): void;
    getObjectManager(category: number): IRoomObjectManager | undefined;
    getTotalObjectsForManager(category: RoomObjectCategoryEnum): number;
    getRoomObject(id: number, category: RoomObjectCategoryEnum): IRoomObject | undefined;
    getRoomObjectByIndex(index: number, category: RoomObjectCategoryEnum): IRoomObject | undefined;
    getRoomObjectsForCategory(category: RoomObjectCategoryEnum): IRoomObject[];
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
    setSelectedObject(data: ISelectedRoomObjectData): void;
    setPlacedObject(data: ISelectedRoomObjectData): void;
    setFurnitureStackingHeightMap(heightMap: IFurnitureStackingHeightMap): void;
    addButtonMouseCursorOwner(key: string): boolean;
    removeButtonMouseCursorOwner(key: string): boolean;
    hasButtonMouseCursorOwners(): boolean;
    readonly id: number;
    readonly renderer: IRoomRenderer;
    readonly managers: Map<RoomObjectCategoryEnum, IRoomObjectManager>;
    readonly model: IRoomObjectModel;
    legacyGeometry: ILegacyWallGeometry;
    tileObjectMap: ITileObjectMap;
    selectedObject: ISelectedRoomObjectData;
    placedObject: ISelectedRoomObjectData;
    furnitureStackingHeightMap: IFurnitureStackingHeightMap;
}

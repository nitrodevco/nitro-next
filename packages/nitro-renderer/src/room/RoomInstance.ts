import type {
    IFurnitureStackingHeightMap,
    ILegacyWallGeometry,
    IRoomInstance,
    IRoomObject,
    IRoomObjectController,
    IRoomObjectManager,
    IRoomObjectModel,
    IRoomRenderer,
    ISelectedRoomObjectData,
    ITileObjectMap,
    RoomObjectCategoryEnum,
} from '@nitrodevco/nitro-api';

import { RoomObjectModel } from './object';
import { RoomObjectManager } from './RoomObjectManager';
import { TileObjectMap } from './utils';

export class RoomInstance implements IRoomInstance {
    private _id: number;
    private _renderer: IRoomRenderer;
    private _managers: Map<RoomObjectCategoryEnum, IRoomObjectManager> = new Map();
    private _updateCategories: RoomObjectCategoryEnum[] = [];
    private _model: IRoomObjectModel = new RoomObjectModel();

    private _legacyGeometry: ILegacyWallGeometry;
    private _tileObjectMap: ITileObjectMap;
    private _selectedObject: ISelectedRoomObjectData;
    private _placedObject: ISelectedRoomObjectData;
    private _furnitureStackingHeightMap: IFurnitureStackingHeightMap;
    private _mouseButtonCursorOwners: string[] = [];

    constructor(id: number) {
        this._id = id;
    }

    public dispose(): void {
        this.removeAllManagers();

        this.destroyRenderer();

        this._model.dispose();
    }

    public setRenderer(renderer: IRoomRenderer): void {
        if (renderer === this._renderer) return;

        if (this._renderer) this.destroyRenderer();

        this._renderer = renderer;

        if (!this._renderer) return;

        this._renderer.reset();

        if (this._managers.size) {
            for (const manager of this._managers.values()) {
                if (!manager) continue;

                const objects = manager.objects;

                if (!objects.length) continue;

                for (const object of objects.getValues()) {
                    if (!object) continue;

                    this._renderer.addObject(object);
                }
            }
        }
    }

    private destroyRenderer(): void {
        if (!this._renderer) return;

        this._renderer.dispose();

        this._renderer = null!;
    }

    public getObjectManager(category: RoomObjectCategoryEnum): IRoomObjectManager {
        let manager = this._managers.get(category);

        if (!manager) {
            manager = new RoomObjectManager();

            this._managers.set(category, manager);
        }

        return manager;
    }

    public getTotalObjectsForManager(category: RoomObjectCategoryEnum): number {
        return this.getObjectManager(category).totalObjects;
    }

    public getRoomObject(id: number, category: RoomObjectCategoryEnum): IRoomObject | undefined {
        return this.getObjectManager(category).getObject(id);
    }

    public getRoomObjectByIndex(index: number, category: RoomObjectCategoryEnum): IRoomObject | undefined {
        return this.getObjectManager(category)?.getObjectByIndex(index);
    }

    public getRoomObjectsForCategory(category: RoomObjectCategoryEnum): IRoomObject[] {
        return this.getObjectManager(category).objects.getValues() ?? [];
    }

    public createRoomObject(
        id: number,
        stateCount: number,
        type: string,
        category: number,
    ): IRoomObjectController | undefined {
        const object = this.getObjectManager(category).createObject(id, stateCount, type);

        if (object && this._renderer) this._renderer.addObject(object);

        return object;
    }

    public removeRoomObject(id: number, category: number): void {
        const manager = this.getObjectManager(category);

        if (!manager) return;

        const object = manager.getObject(id);

        if (!object) return;

        object.tearDown();

        if (this._renderer) this._renderer.removeObject(object);

        manager.removeObject(id);
    }

    public removeAllManagers(): void {
        for (const manager of this._managers.values()) {
            if (!manager) continue;

            if (this._renderer) {
                const objects = manager.objects;

                if (objects.length) {
                    for (const object of objects.getValues()) {
                        if (!object) continue;

                        this._renderer.removeObject(object);
                    }
                }
            }

            manager.dispose();
        }

        this._managers.clear();
    }

    public addUpdateCategory(category: number): void {
        const index = this._updateCategories.indexOf(category);

        if (index >= 0) return;

        this._updateCategories.push(category);
    }

    public removeUpdateCategory(category: number): void {
        const index = this._updateCategories.indexOf(category);

        if (index === -1) return;

        this._updateCategories.splice(index, 1);
    }

    public update(time: number, update: boolean = false): void {
        for (const category of this._updateCategories) {
            const objects = this.getObjectManager(category)?.objects;

            if (!objects || !objects.length) continue;

            for (const object of objects.getValues()) object?.logic?.update(time);
        }

        this._renderer?.update(time, update);
    }

    public hasUninitializedObjects(): boolean {
        for (const manager of this._managers.values()) {
            if (!manager) continue;

            for (const object of manager.objects.getValues()) {
                if (!object) continue;

                if (!object.isReady) return true;
            }
        }

        return false;
    }

    public setSelectedObject(data: ISelectedRoomObjectData): void {
        if (this._selectedObject) {
            this._selectedObject.dispose();
        }

        this._selectedObject = data;
    }

    public setPlacedObject(data: ISelectedRoomObjectData): void {
        if (this._placedObject) {
            this._placedObject.dispose();
        }

        this._placedObject = data;
    }

    public setFurnitureStackingHeightMap(heightMap: IFurnitureStackingHeightMap): void {
        if (this._furnitureStackingHeightMap) this._furnitureStackingHeightMap.dispose();

        this._furnitureStackingHeightMap = heightMap;

        if (this._tileObjectMap) this._tileObjectMap.dispose();

        if (this._furnitureStackingHeightMap) {
            this._tileObjectMap = new TileObjectMap(
                this._furnitureStackingHeightMap.width,
                this._furnitureStackingHeightMap.height,
            );
        }
    }

    public addButtonMouseCursorOwner(key: string): boolean {
        const i = this._mouseButtonCursorOwners.indexOf(key);

        if (i === -1) {
            this._mouseButtonCursorOwners.push(key);

            return true;
        }

        return false;
    }

    public removeButtonMouseCursorOwner(key: string): boolean {
        const i = this._mouseButtonCursorOwners.indexOf(key);

        if (i > -1) {
            this._mouseButtonCursorOwners.splice(i, 1);

            return true;
        }

        return false;
    }

    public hasButtonMouseCursorOwners(): boolean {
        return this._mouseButtonCursorOwners.length > 0;
    }

    public get id(): number {
        return this._id;
    }

    public get renderer(): IRoomRenderer {
        return this._renderer;
    }

    public get managers(): Map<number, IRoomObjectManager> {
        return this._managers;
    }

    public get model(): IRoomObjectModel {
        return this._model;
    }

    public get legacyGeometry(): ILegacyWallGeometry {
        return this._legacyGeometry;
    }

    public get tileObjectMap(): ITileObjectMap {
        return this._tileObjectMap;
    }

    public get selectedObject(): ISelectedRoomObjectData {
        return this._selectedObject;
    }

    public get placedObject(): ISelectedRoomObjectData {
        return this._placedObject;
    }

    public get furnitureStackingHeightMap(): IFurnitureStackingHeightMap {
        return this._furnitureStackingHeightMap;
    }
}

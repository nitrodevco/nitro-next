import type {
    IFurnitureStackingHeightMap,
    ILegacyWallGeometry,
    IRoomInstance,
    IRoomObject,
    IRoomObjectController,
    IRoomObjectManager,
    IRoomObjectModel,
    IRoomRenderingCanvas,
    ISelectedRoomObjectData,
    ITileObjectMap,
    RoomObjectCategoryEnum,
} from '@nitrodevco/nitro-api';

import { RoomObjectModel } from './object';
import { RoomObjectManager } from './RoomObjectManager';
import { RoomSpriteCanvas } from './RoomSpriteCanvas';
import { TileObjectMap } from './utils';

export class RoomInstance implements IRoomInstance {
    private _id: number;
    private _canvas: IRoomRenderingCanvas | undefined = undefined;
    private _objects: Map<number, IRoomObject> = new Map();
    private _managers: Map<RoomObjectCategoryEnum, IRoomObjectManager> = new Map();
    private _updateCategories: RoomObjectCategoryEnum[] = [];
    private _model: IRoomObjectModel = new RoomObjectModel();

    private _legacyGeometry: ILegacyWallGeometry;
    private _tileObjectMap: ITileObjectMap;
    private _selectedObject: ISelectedRoomObjectData;
    private _placedObject: ISelectedRoomObjectData;
    private _furnitureStackingHeightMap: IFurnitureStackingHeightMap;
    private _mouseButtonCursorOwners: string[] = [];
    private _roomObjectVariableAccurateZ: string = '';

    constructor(id: number) {
        this._id = id;
    }

    public dispose(): void {
        this.removeAllManagers();

        if (this._canvas) {
            this._canvas.dispose();

            this._canvas = undefined;
        }

        this._model.dispose();
    }

    public createCanvas(width: number, height: number, scale: number): IRoomRenderingCanvas {
        if (this._canvas) {
            this._canvas.initialize(width, height);

            if (this._canvas.geometry) this._canvas.geometry.scale = scale;
        } else {
            this._canvas = new RoomSpriteCanvas(1, this, width, height, scale);
        }

        return this._canvas;
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

    public getObjectInstanceId(object: IRoomObject): number {
        return object?.instanceId ?? -1;
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

    public getRoomObjectByInstanceId(instanceId: number): IRoomObject | undefined {
        return this._objects.get(instanceId);
    }

    public createRoomObject(
        id: number,
        stateCount: number,
        type: string,
        category: number,
    ): IRoomObjectController | undefined {
        const object = this.getObjectManager(category).createObject(id, stateCount, type);

        if (object) this._objects.set(this.getObjectInstanceId(object), object);

        return object;
    }

    public removeRoomObject(id: number, category: number): void {
        const manager = this.getObjectManager(category);

        if (!manager) return;

        const object = manager.getObject(id);

        if (!object) return;

        const instanceId = this.getObjectInstanceId(object);

        object.tearDown();

        this._objects.delete(instanceId);
        this._canvas?.removeFromCache(instanceId.toString());

        manager.removeObject(id);
    }

    public removeAllManagers(): void {
        for (const manager of this._managers.values()) {
            if (!manager) continue;

            for (const object of manager.objects.getValues()) {
                if (!object) continue;

                const instanceId = this.getObjectInstanceId(object);

                object.tearDown();

                this._objects.delete(instanceId);
                this._canvas?.removeFromCache(instanceId.toString());
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

        this._canvas?.render(time, update);
        this._canvas?.update();
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

    public get canvas(): IRoomRenderingCanvas | undefined {
        return this._canvas;
    }

    public get objects(): Map<number, IRoomObject> {
        return this._objects;
    }

    public get managers(): Map<number, IRoomObjectManager> {
        return this._managers;
    }

    public get model(): IRoomObjectModel {
        return this._model;
    }

    public get roomObjectVariableAccurateZ(): string {
        return this._roomObjectVariableAccurateZ;
    }

    public set roomObjectVariableAccurateZ(z: string) {
        this._roomObjectVariableAccurateZ = z;
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

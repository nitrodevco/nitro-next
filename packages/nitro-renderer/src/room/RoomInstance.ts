import type {
    IRoomInstance,
    IRoomInstanceContainer,
    IRoomObject,
    IRoomObjectController,
    IRoomObjectManager,
    IRoomObjectModel,
    IRoomRendererBase,
} from '@nitrodevco/nitro-api';

import { RoomObjectModel } from './object';

export class RoomInstance implements IRoomInstance {
    private _id: string;
    private _container: IRoomInstanceContainer;
    private _renderer: IRoomRendererBase;
    private _managers: Map<number, IRoomObjectManager> = new Map();
    private _updateCategories: number[] = [];
    private _model: IRoomObjectModel = new RoomObjectModel();

    constructor(id: string, container: IRoomInstanceContainer) {
        this._id = id;
        this._container = container;
    }

    public dispose(): void {
        this.removeAllManagers();

        this.destroyRenderer();

        this._container = undefined!;

        this._model.dispose();
    }

    public setRenderer(renderer: IRoomRendererBase): void {
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

    public getManager(category: number): IRoomObjectManager | undefined {
        return this._managers.get(category);
    }

    private getManagerOrCreate(category: number): IRoomObjectManager {
        let manager = this.getManager(category);

        if (!manager) {
            manager = this._container.createRoomObjectManager(category);

            this._managers.set(category, manager);
        }

        return manager;
    }

    public getTotalObjectsForManager(category: number): number {
        const manager = this.getManager(category);

        if (!manager) return 0;

        return manager.totalObjects;
    }

    public getRoomObject(id: number, category: number): IRoomObject | undefined {
        return this.getManager(category)?.getObject(id);
    }

    public getRoomObjectsForCategory(category: number): IRoomObject[] {
        return this.getManager(category)?.objects.getValues() ?? [];
    }

    public getRoomObjectByIndex(index: number, category: number): IRoomObject | undefined {
        return this.getManager(category)?.getObjectByIndex(index);
    }

    public createRoomObject(
        id: number,
        stateCount: number,
        type: string,
        category: number,
    ): IRoomObjectController | undefined {
        const object = this.getManagerOrCreate(category)?.createObject(id, stateCount, type);

        if (object && this._renderer) this._renderer.addObject(object);

        return object;
    }

    public createRoomObjectAndInitalize(objectId: number, type: string, category: number): IRoomObject {
        return this._container.createRoomObjectAndInitalize(this._id, objectId, type, category);
    }

    public removeRoomObject(id: number, category: number): void {
        const manager = this.getManager(category);

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
            const objects = this.getManager(category)?.objects;

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

    public get id(): string {
        return this._id;
    }

    public get container(): IRoomInstanceContainer {
        return this._container;
    }

    public get renderer(): IRoomRendererBase {
        return this._renderer;
    }

    public get managers(): Map<number, IRoomObjectManager> {
        return this._managers;
    }

    public get model(): IRoomObjectModel {
        return this._model;
    }
}

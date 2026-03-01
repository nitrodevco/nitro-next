import type { IAdvancedMap, IRoomObjectController, IRoomObjectManager } from '@nitrodevco/nitro-api';
import { AdvancedMap } from '@nitrodevco/nitro-shared';

import { RoomObject } from './object';

export class RoomObjectManager implements IRoomObjectManager {
    private _objects: IAdvancedMap<number, IRoomObjectController> = new AdvancedMap();
    private _objectsPerType: IAdvancedMap<string, IAdvancedMap<number, IRoomObjectController>> = new AdvancedMap();

    public dispose(): void {
        this.removeAllObjects();
    }

    public getObject(id: number): IRoomObjectController | undefined {
        return this._objects.getValue(id);
    }

    public getObjectByIndex(index: number): IRoomObjectController | undefined {
        return this._objects.getWithIndex(index);
    }

    public createObject(id: number, stateCount: number, type: string): IRoomObjectController | undefined {
        return this.addObject(id, type, new RoomObject(id, stateCount, type));
    }

    public removeObject(id: number): void {
        const removed = this._objects.remove(id);

        if (!removed) return;

        this.getTypeMap(removed.type)?.remove(removed.id);

        removed.dispose();
    }

    public removeAllObjects(): void {
        let i = 0;

        while (i < this._objects.length) {
            this._objects.getWithIndex(i)?.dispose();

            i++;
        }

        this._objects.reset();

        i = 0;

        while (i < this._objectsPerType.length) {
            this._objectsPerType.getWithIndex(i)?.dispose();

            i++;
        }

        this._objectsPerType.reset();
    }

    private addObject(id: number, type: string, object: IRoomObjectController): IRoomObjectController | undefined {
        if (this._objects.getValue(id)) {
            object.dispose();

            return undefined;
        }

        this._objects.add(id, object);

        this.getTypeMap(type).add(id, object);

        return object;
    }

    private getTypeMap(type: string): IAdvancedMap<number, IRoomObjectController> {
        let existing = this._objectsPerType.getValue(type);

        if (!existing) {
            existing = new AdvancedMap();

            this._objectsPerType.add(type, existing);
        }

        return existing;
    }

    public get objects(): IAdvancedMap<number, IRoomObjectController> {
        return this._objects;
    }

    public get totalObjects(): number {
        return this._objects.length;
    }
}

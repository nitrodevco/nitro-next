import type { IAdvancedMap } from '../utils';
import type { IRoomObjectController } from './object';

export interface IRoomObjectManager {
    dispose(): void;
    getObject(id: number): IRoomObjectController;
    getObjectByIndex(index: number): IRoomObjectController;
    createObject(id: number, stateCount: number, type: string): IRoomObjectController;
    removeObject(id: number): void;
    removeAllObjects(): void;
    objects: IAdvancedMap<number, IRoomObjectController>;
    totalObjects: number;
}

import type { IAdvancedMap } from '../utils';
import type { IRoomObjectController } from './object';

export interface IRoomObjectManager {
    dispose(): void;
    getObject(id: number): IRoomObjectController | undefined;
    getObjectByIndex(index: number): IRoomObjectController | undefined;
    createObject(id: number, stateCount: number, type: string): IRoomObjectController | undefined;
    removeObject(id: number): void;
    removeAllObjects(): void;
    objects: IAdvancedMap<number, IRoomObjectController>;
    totalObjects: number;
}

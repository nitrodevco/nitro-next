import { IAdvancedMap } from '../utils';
import { IRoomObjectController } from './object';

export interface IRoomObjectManager {
    dispose(): void;
    getObject(id: number): IRoomObjectController | undefined;
    getObjectByIndex(index: number): IRoomObjectController | undefined;
    getObjectsByType(type: string): IAdvancedMap<number, IRoomObjectController>;
    createObject(id: number, stateCount: number, type: string): IRoomObjectController | undefined;
    removeObject(id: number): void;
    removeAllObjects(): void;
    objects: IAdvancedMap<number, IRoomObjectController>;
    totalObjects: number;
}

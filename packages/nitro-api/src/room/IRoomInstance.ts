import type { IRoomInstanceContainer } from './IRoomInstanceContainer';
import type { IRoomObjectManager } from './IRoomObjectManager';
import type { IRoomObject, IRoomObjectModel } from './object';
import type { IRoomRendererBase } from './renderer';

export interface IRoomInstance {
    dispose(): void;
    setRenderer(renderer: IRoomRendererBase): void;
    getManager(category: number): IRoomObjectManager | undefined;
    getTotalObjectsForManager(category: number): number;
    getRoomObject(id: number, category: number): IRoomObject | undefined;
    getRoomObjectsForCategory(category: number): IRoomObject[];
    getRoomObjectByIndex(index: number, category: number): IRoomObject | undefined;
    createRoomObject(id: number, stateCount: number, type: string, category: number): IRoomObject | undefined;
    createRoomObjectAndInitalize(objectId: number, type: string, category: number): Promise<IRoomObject | undefined>;
    removeRoomObject(id: number, category: number): void;
    removeAllManagers(): void;
    addUpdateCategory(category: number): void;
    removeUpdateCategory(category: number): void;
    update(time: number, update?: boolean): void;
    id: string;
    container: IRoomInstanceContainer;
    renderer: IRoomRendererBase;
    managers: Map<number, IRoomObjectManager>;
    model: IRoomObjectModel;
}

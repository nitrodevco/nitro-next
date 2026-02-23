import type { IRoomObjectManager } from './IRoomObjectManager';
import type { IRoomObject } from './object';

export interface IRoomInstanceContainer {
    createRoomObjectAndInitalize(
        roomId: string,
        objectId: number,
        type: string,
        category: number,
    ): Promise<IRoomObject | undefined>;
    createRoomObjectManager(category: number): IRoomObjectManager;
}

import type { IRoomObject } from './object';

export interface IRoomInstanceContainer {
    createRoomObjectAndInitalize(
        roomId: number,
        objectId: number,
        type: string,
        category: number,
    ): Promise<IRoomObject | undefined>;
}

import type { IRoomInstance } from './IRoomInstance';
import type { IRoomManagerListener } from './IRoomManagerListener';
import type { IRoomObject } from './object';

export interface IRoomManager {
    init(listener: IRoomManagerListener): Promise<void>;
    update(time: number, update?: boolean): void;
    getRoomInstance(roomId: string): IRoomInstance | undefined;
    createRoomInstance(roomId: string): IRoomInstance | undefined;
    removeRoomInstance(roomId: string): boolean;
    addUpdateCategory(category: number): void;
    removeUpdateCategory(category: number): void;
    createRoomObjectAndInitalize(
        roomId: string,
        objectId: number,
        type: string,
        category: number,
    ): Promise<IRoomObject | undefined>;
    processPendingContentTypes(time: number): void;
    rooms: Map<string, IRoomInstance>;
}

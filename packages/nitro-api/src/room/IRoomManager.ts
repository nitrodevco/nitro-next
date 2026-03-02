import type { IRoomInstance } from './IRoomInstance';
import type { IRoomManagerListener } from './IRoomManagerListener';
import type { RoomObjectCategoryEnum } from './object';

export interface IRoomManager {
    init(listener: IRoomManagerListener): Promise<void>;
    update(time: number, update?: boolean): void;
    getRoomInstance(roomId: number): IRoomInstance | undefined;
    createRoomInstance(roomId: number): IRoomInstance | undefined;
    removeRoomInstance(roomId: number): boolean;
    addUpdateCategory(category: RoomObjectCategoryEnum): void;
    removeUpdateCategory(category: RoomObjectCategoryEnum): void;
    processPendingContentTypes(time: number): void;
    readonly rooms: Map<number, IRoomInstance>;
}

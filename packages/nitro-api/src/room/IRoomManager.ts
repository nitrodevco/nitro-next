import type { IRoomInstance } from './IRoomInstance';
import type { RoomObjectCategoryEnum } from './object';

export interface IRoomManager {
    getRoomInstance(roomId: number): IRoomInstance | undefined;
    createRoomInstance(roomId: number): IRoomInstance | undefined;
    removeRoomInstance(roomId: number): boolean;
    addUpdateCategory(category: RoomObjectCategoryEnum): void;
    removeUpdateCategory(category: RoomObjectCategoryEnum): void;
    readonly rooms: Map<number, IRoomInstance>;
}

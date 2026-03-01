import type { IRoomInstance } from './IRoomInstance';
import type { IRoomManagerListener } from './IRoomManagerListener';
import type { IRoomObject, RoomObjectCategoryEnum } from './object';

export interface IRoomManager {
    init(listener: IRoomManagerListener): Promise<void>;
    update(time: number, update?: boolean): void;
    getRoomInstance(roomId: number): IRoomInstance | undefined;
    createRoomInstance(roomId: number): IRoomInstance | undefined;
    removeRoomInstance(roomId: number): boolean;
    addUpdateCategory(category: RoomObjectCategoryEnum): void;
    removeUpdateCategory(category: RoomObjectCategoryEnum): void;
    createRoomObjectAndInitalize(
        roomId: number,
        objectId: number,
        type: string,
        category: RoomObjectCategoryEnum,
    ): Promise<IRoomObject | undefined>;
    processPendingContentTypes(time: number): void;
    readonly rooms: Map<number, IRoomInstance>;
}

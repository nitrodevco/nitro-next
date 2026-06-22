import type { IRoomInstance } from './IRoomInstance';

export interface IRoomManager {
    getRoomInstance(roomId: number): IRoomInstance | undefined;
    createRoomInstance(roomId: number): IRoomInstance | undefined;
    removeRoomInstance(roomId: number): boolean;
    readonly rooms: Map<number, IRoomInstance>;
}

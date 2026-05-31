import type { IRoom } from './IRoom';

export interface IRoomEngine {
    init(): Promise<void>;
    createRoom(roomId: number): IRoom;
    whereYouClickIsWhereYouGo(): boolean;
    moveBlocked: boolean;
}

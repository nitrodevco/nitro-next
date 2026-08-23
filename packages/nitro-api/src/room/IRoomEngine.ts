import type { IRoom } from './IRoom';

export interface IRoomEngine {
    init(): Promise<void>;
    createRoom(roomId: number): IRoom;
    getFurnitureFloorIconUrl(typeId: number): string | undefined;
    getFurnitureWallIconUrl(typeId: number, extra?: string): string | undefined;
}

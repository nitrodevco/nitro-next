import { IRoom } from './IRoom';

export interface IRoomEngine {
    init(): Promise<void>;
    /** Starts/stops the shared tick that advances every room with a canvas each frame (started by `init`). */
    start(): void;
    stop(): void;
    update(time: number): void;
    createRoom(roomId: number): IRoom;
    getFurnitureFloorIconUrl(typeId: number): string | undefined;
    getFurnitureWallIconUrl(typeId: number, extra?: string): string | undefined;
}

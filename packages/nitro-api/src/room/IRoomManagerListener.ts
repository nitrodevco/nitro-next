import type { RoomObjectCategoryEnum } from './object';

export interface IRoomManagerListener {
    objectInitialized(roomId: number, objectId: number, category: RoomObjectCategoryEnum): void;
    initalizeTemporaryObjectsByType(type: string, _arg_2: boolean): void;
}

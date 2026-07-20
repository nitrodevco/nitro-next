import { RoomObjectCategoryEnum } from "../room";

export interface IRoomObjectData {
    readonly id: number;
    readonly objectId: number;
    readonly category: RoomObjectCategoryEnum;
}
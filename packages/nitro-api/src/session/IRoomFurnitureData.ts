import { FurnitureUsagePolicyEnum, IObjectData, RoomObjectCategoryEnum } from "../room";
import { IFurnitureData } from "./IFurnitureData";
import { IRoomObjectData } from "./IRoomObjectData";

export interface IRoomFurnitureData extends IRoomObjectData {
    category: RoomObjectCategoryEnum;
    name: string;
    description: string;
    extraParam: string | undefined;
    stuffData: IObjectData;
    furnitureData: IFurnitureData | undefined;
    isWallItem: boolean;
    isStickie: boolean;
    ownerId: number;
    ownerName: string;
    usagePolicy: FurnitureUsagePolicyEnum;
    groupId: number;
}
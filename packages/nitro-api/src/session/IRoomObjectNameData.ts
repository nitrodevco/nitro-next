import { RoomObjectCategoryEnum, RoomObjectUserType } from "../room";
import { IRoomObjectData } from "./IRoomObjectData";

export interface IRoomObjectNameData extends IRoomObjectData {
    readonly name: string;
    readonly userType: RoomObjectUserType;
}
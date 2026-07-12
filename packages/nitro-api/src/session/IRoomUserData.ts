import { AvatarGenderType } from "../avatar";
import { RoomObjectUserType } from "../room";
import { IRoomObjectData } from "./IRoomObjectData";

export interface IRoomUserData extends IRoomObjectData {
    objectId: number;
    name: string;
    type: RoomObjectUserType;
    gender: AvatarGenderType;
    figure: string;
    custom: string;
    webID: number;
    activityPoints: number;
    groupId: number;
    groupName: string;
    groupStatus: number;
    ownerId: number;
    ownerName: string;
    rarityLevel: number;
    hasSaddle: boolean;
    isRiding: boolean;
    canBreed: boolean;
    canHarvest: boolean;
    canRevive: boolean;
    hasBreedingPermission: boolean;
    petLevel: number;
    petPosture: string;
    botSkills: number[];
    isModerator: boolean;
}

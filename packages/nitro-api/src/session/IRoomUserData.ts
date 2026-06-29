import { RoomObjectUserType } from "../room";

export interface IRoomUserData {
    objectId: number;
    name: string;
    type: RoomObjectUserType;
    sex: string;
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

import type { UserTypeEnum } from "./enum";

export interface IRoomUserData {
    roomIndex: number;
    activityPoints: number;
    name: string;
    type: UserTypeEnum;
    sex: string;
    figure: string;
    custom: string;
    webID: number;
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
    botSkills: number[];
    isModerator: boolean;
}

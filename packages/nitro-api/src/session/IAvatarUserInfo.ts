import { AvatarActionStateType, AvatarGenderType } from '../avatar';
import { RoomControllerLevelEnum, RoomObjectUserType } from '../room';

export interface IAvatarUserInfo {
    objectId: number;
    name: string;
    motto: string;
    figure: string;
    gender: AvatarGenderType;
    achievementScore: number;
    webId: number;
    userType: RoomObjectUserType;
    carryItem: number;
    effectId: number;
    posture: AvatarActionStateType;
    canStandUp: boolean;
    controllerLevel: RoomControllerLevelEnum;
    canBeMuted: boolean;
    canBeKicked: boolean;
    canBeBanned: boolean;
    canTrade: boolean;
    isOwnUser: boolean;
    isIgnored: boolean;
}

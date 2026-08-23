import { AvatarGenderType } from '../avatar';

export interface IUserInfo {
    userId: number;
    name: string;
    figure: string;
    sex: AvatarGenderType;
    customData: string;
    realName: string;
    directMail: boolean;
    respectTotal: number;
    respectLeft: number;
    petRespectLeft: number;
    streamPublishingAllowed: boolean;
    lastAccessDate: string;
    nameChangeAllowed: boolean;
    accountSafetyLocked: boolean;
}

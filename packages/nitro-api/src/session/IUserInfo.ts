export interface IUserInfo {
    userId: number | undefined;
    name: string | undefined;
    figure: string | undefined;
    sex: string | undefined;
    customData: string | undefined;
    realName: string | undefined;
    directMail: boolean;
    respectTotal: number;
    respectLeft: number;
    petRespectLeft: number;
    streamPublishingAllowed: boolean;
    lastAccessDate: string;
    nameChangeAllowed: boolean;
    accountSafetyLocked: boolean;
}

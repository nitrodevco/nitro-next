import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IModeratorUserInfoData {
    userId: number;
    userName: string;
    figure: string;
    registrationAgeInMinutes: number;
    minutesSinceLastLogin: number;
    online: boolean;
    cfhCount: number;
    abusiveCfhCount: number;
    cautionCount: number;
    banCount: number;
    tradingLockCount: number;
    tradingExpiryDate: string;
    lastPurchaseDate: string;
    identityId: number;
    identityRelatedBanCount: number;
    primaryEmailAddress: string;
    userClassification: string;
    lastSanctionTime: string;
    sanctionAgeHours: number;
}

export const ModeratorUserInfoDataParser = (wrapper: IMessageDataWrapper): IModeratorUserInfoData => {
    const data: IModeratorUserInfoData = {
        userId: 0,
        userName: '',
        figure: '',
        registrationAgeInMinutes: 0,
        minutesSinceLastLogin: 0,
        online: false,
        cfhCount: 0,
        abusiveCfhCount: 0,
        cautionCount: 0,
        banCount: 0,
        tradingLockCount: 0,
        tradingExpiryDate: '',
        lastPurchaseDate: '',
        identityId: 0,
        identityRelatedBanCount: 0,
        primaryEmailAddress: '',
        userClassification: '',
        lastSanctionTime: '',
        sanctionAgeHours: 0,
    };

    data.userId = wrapper.readInt();
    data.userName = wrapper.readString();
    data.figure = wrapper.readString();
    data.registrationAgeInMinutes = wrapper.readInt();
    data.minutesSinceLastLogin = wrapper.readInt();
    data.online = wrapper.readBoolean();
    data.cfhCount = wrapper.readInt();
    data.abusiveCfhCount = wrapper.readInt();
    data.cautionCount = wrapper.readInt();
    data.banCount = wrapper.readInt();
    data.tradingLockCount = wrapper.readInt();
    data.tradingExpiryDate = wrapper.readString();
    data.lastPurchaseDate = wrapper.readString();
    data.identityId = wrapper.readInt();
    data.identityRelatedBanCount = wrapper.readInt();
    data.primaryEmailAddress = wrapper.readString();
    data.userClassification = wrapper.readString();
    if (wrapper.bytesAvailable) {
        data.lastSanctionTime = wrapper.readString();
        data.sanctionAgeHours = wrapper.readInt();
    }

    return data;
};

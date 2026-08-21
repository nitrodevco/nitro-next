import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface ICfhSanctionTypeData {
    name: string;
    sanctionLengthInHours: number;
    avatarOnly: boolean;
    tradeLockInfo: string;
    machineBanInfo: string;
}

export const CfhSanctionTypeDataParser = (wrapper: IMessageDataWrapper): ICfhSanctionTypeData => {
    const data: ICfhSanctionTypeData = {
        name: '',
        sanctionLengthInHours: 0,
        avatarOnly: false,
        tradeLockInfo: '',
        machineBanInfo: '',
    };

    data.name = wrapper.readString();
    data.sanctionLengthInHours = wrapper.readInt();
    wrapper.readInt(); // unnamed in SWF
    data.avatarOnly = wrapper.readBoolean();
    if (wrapper.bytesAvailable) {
        data.tradeLockInfo = wrapper.readString();
    }
    if (wrapper.bytesAvailable) {
        data.machineBanInfo = wrapper.readString();
    }

    return data;
}

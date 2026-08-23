import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IRewardTrackPrizeData {
    id: string;
    requiredPoints: number;
    productItemTypeId: number;
    rewardTypeId: string;
    extraParams: string;
    rewardAmount: number;
    premium: boolean;
    available: boolean;
    claimed: boolean;
}

export const RewardTrackPrizeDataParser = (wrapper: IMessageDataWrapper): IRewardTrackPrizeData => {
    const data: IRewardTrackPrizeData = {
        id: '',
        requiredPoints: 0,
        productItemTypeId: 0,
        rewardTypeId: '',
        extraParams: '',
        rewardAmount: 0,
        premium: false,
        available: false,
        claimed: false,
    };

    data.id = wrapper.readString();
    data.requiredPoints = wrapper.readInt();
    data.productItemTypeId = wrapper.readShort();
    data.rewardTypeId = wrapper.readString();
    data.extraParams = wrapper.readString();
    data.rewardAmount = wrapper.readInt();
    data.premium = wrapper.readBoolean();
    data.available = wrapper.readBoolean();
    data.claimed = wrapper.readBoolean();

    return data;
};

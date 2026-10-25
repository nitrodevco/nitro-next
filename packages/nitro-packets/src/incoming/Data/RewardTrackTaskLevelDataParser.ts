import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IRewardTrackTaskLevelData {
    requiredCount: number;
    pointsReward: number;
    premium: boolean;
}

export const RewardTrackTaskLevelDataParser = (wrapper: IMessageDataWrapper): IRewardTrackTaskLevelData => {
    const data: IRewardTrackTaskLevelData = {
        requiredCount: 0,
        pointsReward: 0,
        premium: false,
    };

    data.requiredCount = wrapper.readInt();
    data.pointsReward = wrapper.readInt();
    data.premium = wrapper.readBoolean();

    return data;
};

import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IRewardTrackPrizeData, RewardTrackPrizeDataParser } from './RewardTrackPrizeDataParser';
import { IRewardTrackTaskData, RewardTrackTaskDataParser } from './RewardTrackTaskDataParser';

/**
 * A reward track, as the AS3 `_-e1Z` reads it. The premium configuration - the task points boost
 * (a double), the instant points and the diamond and credit costs - comes only when
 * `hasPremiumConfig` says so; then the premium, complete and premium complete flags, the tasks
 * and the prizes.
 */
export interface IRewardTrackData {
    id: string;
    theme: string;
    points: number;
    hasPremiumConfig: boolean;
    taskPointsBoost: number;
    instantPoints: number;
    costDiamonds: number;
    costCredits: number;
    premium: boolean;
    complete: boolean;
    premiumComplete: boolean;
    tasks: IRewardTrackTaskData[];
    prizes: IRewardTrackPrizeData[];
}

export const RewardTrackDataParser = (wrapper: IMessageDataWrapper): IRewardTrackData => {
    const id = wrapper.readString();
    const theme = wrapper.readString();
    const points = wrapper.readInt();
    const hasPremiumConfig = wrapper.readBoolean();

    let taskPointsBoost = 0;
    let instantPoints = 0;
    let costDiamonds = 0;
    let costCredits = 0;

    if (hasPremiumConfig) {
        taskPointsBoost = wrapper.readDouble();
        instantPoints = wrapper.readInt();
        costDiamonds = wrapper.readInt();
        costCredits = wrapper.readInt();
    }

    const premium = wrapper.readBoolean();
    const complete = wrapper.readBoolean();
    const premiumComplete = wrapper.readBoolean();
    const tasks: IRewardTrackTaskData[] = [];
    const prizes: IRewardTrackPrizeData[] = [];

    let taskCount = wrapper.readInt();

    while (taskCount > 0) {
        tasks.push(RewardTrackTaskDataParser(wrapper));

        taskCount--;
    }

    let prizeCount = wrapper.readInt();

    while (prizeCount > 0) {
        prizes.push(RewardTrackPrizeDataParser(wrapper));

        prizeCount--;
    }

    return { id, theme, points, hasPremiumConfig, taskPointsBoost, instantPoints, costDiamonds, costCredits, premium, complete, premiumComplete, tasks, prizes };
};

import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IRewardTrackTaskLevelData, RewardTrackTaskLevelDataParser } from './RewardTrackTaskLevelDataParser';

/** A reward track's task, as the AS3 `_-M1v` reads it: its levels (`taskRewards`) after its own fields. */
export interface IRewardTrackTaskData {
    id: string;
    actionType: string;
    parameter: string;
    progressCount: number;
    premium: boolean;
    levels: IRewardTrackTaskLevelData[];
}

export const RewardTrackTaskDataParser = (wrapper: IMessageDataWrapper): IRewardTrackTaskData => {
    const id = wrapper.readString();
    const actionType = wrapper.readString();
    const parameter = wrapper.readString();
    const progressCount = wrapper.readInt();
    const premium = wrapper.readBoolean();
    const levels: IRewardTrackTaskLevelData[] = [];

    let count = wrapper.readInt();

    while (count > 0) {
        levels.push(RewardTrackTaskLevelDataParser(wrapper));

        count--;
    }

    return { id, actionType, parameter, progressCount, premium, levels };
};

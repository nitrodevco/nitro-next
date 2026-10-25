import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWeeklyGameRewardWinnersData } from './IWeeklyGameRewardWinnersData';

export const WeeklyGameRewardWinnersDataParser = (wrapper: IMessageDataWrapper): IWeeklyGameRewardWinnersData => {
    return {
        name: wrapper.readString(),
        figure: wrapper.readString(),
        gender: wrapper.readString(),
        rank: wrapper.readInt(),
        score: wrapper.readInt(),
    };
};

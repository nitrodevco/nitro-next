import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { AchievementParser } from '../../../Data/AchievementParser';
import { IUserGameAchievementsData } from './IUserGameAchievementsData';

export const UserGameAchievementsDataParser = (wrapper: IMessageDataWrapper): IUserGameAchievementsData => {
    const achievements = ParseArray(wrapper, AchievementParser);
    const defaultCategory = wrapper.readString();
    return { achievements, defaultCategory };
};

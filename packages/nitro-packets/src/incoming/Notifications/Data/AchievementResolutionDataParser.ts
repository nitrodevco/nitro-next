import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IAchievementResolutionData } from './IAchievementResolutionData';

export const AchievementResolutionDataParser = (wrapper: IMessageDataWrapper): IAchievementResolutionData => {
    return {
        achievementId: wrapper.readInt(),
        level: wrapper.readInt(),
        badgeId: wrapper.readString(),
        requiredLevel: wrapper.readInt(),
        state: wrapper.readInt(),
    };
};

import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IAchievementLevelUpData } from './IAchievementLevelUpData';

export const AchievementLevelUpDataParser = (wrapper: IMessageDataWrapper): IAchievementLevelUpData => {
    return {
        type: wrapper.readInt(),
        level: wrapper.readInt(),
        badgeId: wrapper.readInt(),
        badgeCode: wrapper.readString(),
        points: wrapper.readInt(),
        levelRewardPoints: wrapper.readInt(),
        levelRewardPointType: wrapper.readInt(),
        bonusPoints: wrapper.readInt(),
        achievementID: wrapper.readInt(),
        removedBadgeCode: wrapper.readString(),
        category: wrapper.readString(),
        showDialogToUser: wrapper.readBoolean(),
        ownerCount: wrapper.readInt(),
        badgeRarityId: wrapper.readInt(),
    };
};

import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IAchievementResolutionData {
    achievementId: number;
    level: number;
    badgeId: string;
    requiredLevel: number;
    state: number;
}

export const AchievementResolutionDataParser = (wrapper: IMessageDataWrapper): IAchievementResolutionData => {
    return {
        achievementId: wrapper.readInt(),
        level: wrapper.readInt(),
        badgeId: wrapper.readString(),
        requiredLevel: wrapper.readInt(),
        state: wrapper.readInt(),
    };
};

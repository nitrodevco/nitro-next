import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export interface IAchievementResolutionData {
    achievementId: number;
    level: number;
    badgeId: string;
    requiredLevel: number;
    state: number;
}

export const AchievementResolutionDataParser = (wrapper: IMessageDataWrapper): IAchievementResolutionData => {
    const data: IAchievementResolutionData = {
        achievementId: 0,
        level: 0,
        badgeId: '',
        requiredLevel: 0,
        state: 0,
    };

    data.achievementId = wrapper.readInt();
    data.level = wrapper.readInt();
    data.badgeId = wrapper.readString();
    data.requiredLevel = wrapper.readInt();
    data.state = wrapper.readInt();

    return data;
};

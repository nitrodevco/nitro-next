import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface IAchievementLevelUpData {
    type: number;
    level: number;
    badgeId: number;
    badgeCode: string;
    points: number;
    levelRewardPoints: number;
    levelRewardPointType: number;
    bonusPoints: number;
    achievementID: number;
    removedBadgeCode: string;
    category: string;
    showDialogToUser: boolean;
    ownerCount: number;
    badgeRarityId: number;
}

export const AchievementLevelUpDataParser = (wrapper: IMessageDataWrapper): IAchievementLevelUpData => {
    const data: IAchievementLevelUpData = {
        type: 0,
        level: 0,
        badgeId: 0,
        badgeCode: '',
        points: 0,
        levelRewardPoints: 0,
        levelRewardPointType: 0,
        bonusPoints: 0,
        achievementID: 0,
        removedBadgeCode: '',
        category: '',
        showDialogToUser: false,
        ownerCount: 0,
        badgeRarityId: 0,
    };

    data.type = wrapper.readInt();
    data.level = wrapper.readInt();
    data.badgeId = wrapper.readInt();
    data.badgeCode = wrapper.readString();
    data.points = wrapper.readInt();
    data.levelRewardPoints = wrapper.readInt();
    data.levelRewardPointType = wrapper.readInt();
    data.bonusPoints = wrapper.readInt();
    data.achievementID = wrapper.readInt();
    data.removedBadgeCode = wrapper.readString();
    data.category = wrapper.readString();
    data.showDialogToUser = wrapper.readBoolean();
    data.ownerCount = wrapper.readInt();
    data.badgeRarityId = wrapper.readInt();

    return data;
}

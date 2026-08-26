import { type IAchievementData, type IMessageDataWrapper } from "@nitrodevco/nitro-api";

export const AchievementDataParser = (wrapper: IMessageDataWrapper): IAchievementData => {
    return {
        achievementId: wrapper.readInt(),
        level: wrapper.readInt(),
        badgeId: wrapper.readString(),
        scoreAtStartOfLevel: wrapper.readInt(),
        scoreLimit: Math.max(1, wrapper.readInt()),
        levelRewardPoints: wrapper.readInt(),
        levelRewardPointType: wrapper.readInt(),
        currentPoints: wrapper.readInt(),
        finalLevel: wrapper.readBoolean(),
        category: wrapper.readString(),
        subCategory: wrapper.readString(),
        levelCount: wrapper.readInt(),
        displayMethod: wrapper.readInt(),
        state: wrapper.readShort(),
    } as IAchievementData;
}
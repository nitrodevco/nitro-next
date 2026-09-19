// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IAchievement } from './IAchievement';

export const AchievementParser = (wrapper: IMessageDataWrapper): IAchievement => {
    const achievementId = wrapper.readInt();
    const level = wrapper.readInt();
    const badgeId = wrapper.readString();
    const scoreAtStartOfLevel = wrapper.readInt();
    const field_V1O = Math.max(1, wrapper.readInt());
    const levelRewardPoints = wrapper.readInt();
    const levelRewardPointType = wrapper.readInt();
    const field_EX = wrapper.readInt();
    const finalLevel = wrapper.readBoolean();
    const category = wrapper.readString();
    const subCategory = wrapper.readString();
    const levelCount = wrapper.readInt();
    const displayMethod = wrapper.readInt();
    const state = wrapper.readShort();
    // The badge id without its `ACH_` prefix and trailing level digits.
    const code = badgeId.replace(/^ACH_/, '').replace(/\d+$/, '');
    return { achievementId, level, badgeId, scoreAtStartOfLevel, field_V1O, levelRewardPoints, levelRewardPointType, field_EX, finalLevel, category, subCategory, levelCount, displayMethod, state, code };
};

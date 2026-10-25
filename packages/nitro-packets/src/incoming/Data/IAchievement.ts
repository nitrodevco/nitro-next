/** AS3 AchievementData. The generated field names retain absolute cumulative wire values. */
export interface IAchievement {
    achievementId: number;
    level: number;
    badgeId: string;
    scoreAtStartOfLevel: number;
    /** Absolute cumulative requirement; subtract scoreAtStartOfLevel for the displayed limit. */
    field_V1O: number;
    levelRewardPoints: number;
    levelRewardPointType: number;
    /** Absolute cumulative progress; subtract scoreAtStartOfLevel for displayed progress. */
    field_EX: number;
    finalLevel: boolean;
    category: string;
    subCategory: string;
    levelCount: number;
    displayMethod: number;
    state: number;
    code: string;
}

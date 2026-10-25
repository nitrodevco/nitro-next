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

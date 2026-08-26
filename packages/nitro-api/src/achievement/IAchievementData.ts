import { AchievementStateType } from "./AchievementStateType";

export interface IAchievementData {
    readonly achievementId: number;
    readonly level: number;
    readonly badgeId: string;
    readonly scoreAtStartOfLevel: number;
    readonly scoreLimit: number;
    readonly levelRewardPoints: number;
    readonly levelRewardPointType: number;
    readonly currentPoints: number;
    readonly finalLevel: boolean;
    readonly category: string;
    readonly subCategory: string;
    readonly levelCount: number;
    readonly displayMethod: number;
    readonly state: AchievementStateType;
    unseen: number;
}

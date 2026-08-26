import { IAchievementData } from "./IAchievementData";

export interface IAchievementCategory {
    readonly code: string;
    achievements: IAchievementData[];
}

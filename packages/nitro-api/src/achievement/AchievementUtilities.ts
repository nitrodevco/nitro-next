import { GetConfigValue } from "../utils/GetConfigValue";
import { IAchievementCategory } from "./IAchievementCategory";
import { IAchievementData } from "./IAchievementData";

export class AchievementUtilities {
    private static readonly BADGE_ID_PREFIX = "ACH_";

    public static createCategory(code: string, achievements: IAchievementData[] = []) {
        return {
            code,
            achievements
        } as IAchievementCategory;
    }

    public static getNewCodes() {
        return (GetConfigValue<string>("achievements.new") ?? "")
            .split(",")
            .map(code => code.trim())
            .filter(code => code.length);
    }

    public static getCode(badgeId: string) {
        const code = badgeId.startsWith(AchievementUtilities.BADGE_ID_PREFIX)
            ? badgeId.substring(AchievementUtilities.BADGE_ID_PREFIX.length)
            : badgeId;

        return code.replace(/\d+$/, "");
    }

    public static isNew(newCodes: string[], achievement: IAchievementData) {
        return newCodes.includes(AchievementUtilities.getCode(achievement.badgeId));
    }
}

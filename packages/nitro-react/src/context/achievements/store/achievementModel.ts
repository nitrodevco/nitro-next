/** Pure presentation rules from AS3 AchievementData, AchievementCategories and AchievementCategory. */
import type { IAchievement } from '@nitrodevco/nitro-packets';

/** `AchievementData.currentPoints`, `scoreLimit` and the level `AchievementCategory.getProgress` counts. */
export const achievementProgress = (achievement: IAchievement) => ({
    current: achievement.field_EX - achievement.scoreAtStartOfLevel,
    limit: Math.max(1, achievement.field_V1O) - achievement.scoreAtStartOfLevel,
    earned: achievement.finalLevel ? achievement.level : achievement.level - 1,
});

/** `AchievementData.setMaxProgress`: the bar fills before the next level is shown. */
export const withMaxProgress = (achievement: IAchievement): IAchievement => ({ ...achievement, field_EX: achievement.field_V1O });

/** `BadgeBaseAndLevel`: a badge code split into its base and trailing level (1 without digits). */
const baseAndLevel = (code: string) => {
    let at = code.length - 1;

    while (at > 0 && code.charCodeAt(at) >= 48 && code.charCodeAt(at) <= 57) at--;

    const digits = code.substring(at + 1);

    return { base: code.substring(0, at + 1), level: digits ? parseInt(digits) : 1 };
};

/** `AchievementController.getAchievedBadgeId` with `getPreviousLevelBadgeId` (the level is clamped to 1). */
export const achievedBadgeCode = (achievement: IAchievement) => {
    if (achievement.levelCount === 1 || achievement.finalLevel) return achievement.badgeId;

    const { base, level } = baseAndLevel(achievement.badgeId);

    return base + Math.max(1, level - 1);
};

/** `AchievementData`: first level reached, which decides whether the badge is greyscale. */
export const firstLevelAchieved = (achievement: IAchievement) => achievement.level > 1 || achievement.finalLevel;

export interface AchievementCategory {
    code: string;
    achievements: IAchievement[];
}

/** `AchievementCategory.visibleInList`. */
export const categoryVisibleInList = (category: AchievementCategory) => category.code !== 'new' && category.code !== 'wired_games';

/** `AchievementCategory.getProgress` / `getMaxProgress`. */
export const categoryProgress = (category: AchievementCategory) => ({
    progress: category.achievements.reduce((total, entry) => total + achievementProgress(entry).earned, 0),
    max: category.achievements.reduce((total, entry) => total + entry.levelCount, 0),
});

/** `AchievementCategories.getProgress` / `getMaxProgress`: sums the whole list, including `new`. */
export const totalProgress = (categories: AchievementCategory[]) => categories.reduce((total, entry) => {
    const { progress, max } = categoryProgress(entry);

    return { progress: total.progress + progress, max: total.max + max };
}, { progress: 0, max: 0 });

/** `AchievementCategories` constructor: `archive` and `wired_games` always exist, `new` only with entries. */
export const buildCategories = (achievements: IAchievement[], newCodes: string[] = []): AchievementCategory[] => {
    const byCode = new Map<string, AchievementCategory>([ [ 'archive', { code: 'archive', achievements: [] } ], [ 'wired_games', { code: 'wired_games', achievements: [] } ] ]);
    const list: AchievementCategory[] = [];
    const fresh: IAchievement[] = [];
    let misc: AchievementCategory | undefined;

    for (const achievement of achievements) {
        if (achievement.category === '') continue;
        if (achievement.state === 4 && achievement.category !== 'wired_games') continue;

        const code = achievement.state === 2 ? 'archive' : achievement.category;
        let category = byCode.get(code);

        if (!category) {
            category = { code: achievement.category, achievements: [] };
            byCode.set(achievement.category, category);

            if (achievement.category !== 'misc') list.push(category);
            else misc = category;
        }

        category.achievements.push(achievement);

        if (newCodes.includes(achievement.code)) fresh.push(achievement);
    }

    if (misc) list.push(misc);

    list.push(byCode.get('archive')!, byCode.get('wired_games')!);

    if (fresh.length) list.push({ code: 'new', achievements: fresh });

    return list;
};

/** `AchievementCategories.update`: replaces the record in its category and in `new`. */
export const updateCategories = (categories: AchievementCategory[], achievement: IAchievement): AchievementCategory[] => {
    if (achievement.category === '') return categories;

    return categories.map(category => (category.code === achievement.category || category.code === 'new')
        ? { ...category, achievements: category.achievements.map(entry => entry.achievementId === achievement.achievementId ? achievement : entry) }
        : category);
};

/** `AchievementController.achievementIsVisible`: only the room's enabled WF achievements in `wired_games`. */
export const achievementVisibleInCategory = (category: string, achievement: IAchievement, roomCodes: string[]) => {
    if (category !== 'wired_games') return true;
    if (!achievement.code.startsWith('WF_')) return false;

    return roomCodes.includes(achievement.code.slice(3));
};

import type { IAchievement } from '@nitrodevco/nitro-packets';

import { achievedBadgeCode, firstLevelAchieved } from '#base/context/achievements';
import { Box, TemplateWindow } from '#base/theme';

/** `AchievementController`'s `bg_unselected_bitmap` colour for an achievement not yet seen. */
const UNSEEN_COLOR = 0xc4ff7f;
const SEEN_COLOR = 0xffffff;

/** `Achievement`'s layout size. */
export const ACHIEVEMENT_WIDTH = 62;
export const ACHIEVEMENT_HEIGHT = 60;

interface AchievementEntryProps {
    x: number;
    y: number;
    /** The achievement, or none for an empty slot. */
    achievement?: IAchievement;
    selected: boolean;
    unseen: boolean;
    badgeUrl: (code: string) => string;
    onPick: (achievementId: number) => void;
}

/**
 * One slot of a category's list: the `habbo-quest-engine-com/Achievement` template, as
 * `AchievementController.refreshAchievementEntry` fills it - the badge greyed until its first level
 * (`refreshBadgeImage`), the selected one on the active background, an unseen one tinted.
 */
export const AchievementEntry = ({ x, y, achievement, selected, unseen, badgeUrl, onPick }: AchievementEntryProps) => (
    <Box layout={{ position: 'absolute', left: x, top: y }}>
        <TemplateWindow
            id="habbo-quest-engine-com/Achievement"
            bindings={{
                bg_region: { visible: !!achievement, onPointerTap: () => achievement && onPick(achievement.achievementId) },
                bg_unselected_bitmap: { visible: !selected, color: unseen ? UNSEEN_COLOR : SEEN_COLOR },
                bg_selected_bitmap: { visible: selected },
                achievement_pic_bitmap: achievement
                    ? { visible: true, asset: badgeUrl(achievedBadgeCode(achievement)), greyscale: !firstLevelAchieved(achievement) }
                    : { visible: false },
            }}
        />
    </Box>
);

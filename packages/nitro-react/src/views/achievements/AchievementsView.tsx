/**
 * The achievement browser: AS3 `AchievementController` over the `habbo-quest-engine-com/Achievements`
 * window template. `prepareWindow` opens it centred at `y = 20`; each `refresh*` is a set of bindings
 * - the category grid's `AchievementCategory` tiles and the list's `Achievement` slots added to their
 * containers, the two `ProgressBar`s to theirs - and `refresh`'s geometry is the `arrange`: the
 * containers sized to what was added, stacked by `moveAllChildrenToColumn(content, 0, 4)`, and the
 * frame `getLowestPoint(content) + 45` high.
 */
import { useCallback, useState } from 'react';

import { pickAchievement, pickAchievementCategory } from '#base/commands';
import type { AchievementCategory } from '#base/context/achievements';
import {
    achievedBadgeCode, achievementProgress, achievementVisibleInCategory, categoryProgress, categoryVisibleInList, firstLevelAchieved,
    selectedAchievement, totalProgress, useAchievementsActions, useAchievementsStore,
} from '#base/context/achievements';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigData, useConfigValue, useSystemStore, useTranslation } from '#base/context/system';
import { useWiredStore } from '#base/context/wired';
import { useViewportSize } from '#base/hooks';
import { LayoutWindow, TemplateWindow, TemplateWindows, useTemplateFrame } from '#base/theme';
import { getBadgeDesc, getBadgeName, getCurrencyIconStyle } from '#base/utils';
import { getLowestPoint, moveWindowsToRow, QUEST_REWARD_ROW, QUEST_REWARD_SPACING } from '#base/views/shared/flashWindowUtils';
import { QuestProgressBar } from '#base/views/shared/QuestProgressBar';

import { AchievementCategoryEntry, CATEGORY_HEIGHT, CATEGORY_WIDTH } from './AchievementCategoryEntry';
import { ACHIEVEMENT_HEIGHT, ACHIEVEMENT_WIDTH, AchievementEntry } from './AchievementEntry';

// `AchievementController` constants.
const CATEGORIES_COLUMN_COUNT = 3;
const CATEGORY_SPACING_X = 8;
const CATEGORY_SPACING_Y = 5;
const CATEGORY_SPACING_TOP = 6;
const CATEGORY_ROWS_MAX = 3;
const ACHIEVEMENT_ROWS_MIN = 2;
const ACHIEVEMENT_ROWS_MAX = 4;
const ACHIEVEMENT_COLUMNS = 6;
const ACHIEVEMENT_TOP_SPACING = 3;
const IN_LEVEL_PROGRESS_BAR_WIDTH = 180;
const TOTAL_PROGRESS_BAR_WIDTH = 246;
const IN_LEVEL_PROGRESS_BAR_LOC = { x: 115, y: 93 };
const TOTAL_PROGRESS_BAR_LOC = { x: 72, y: 1 };
/** `refresh`: the frame is this much taller than its content's lowest point. */
const WINDOW_BOTTOM_SPACING = 45;
/** `moveAllChildrenToColumn(_window.content, 0, 4)`. */
const CONTENT_SPACING = 4;
/** The `Achievements` layout's width, which `_window.center()` centres. */
const WINDOW_WIDTH = 389;
/** `refreshMouseOver(-999)`: no tile hovered. */
const NO_HOVER = -999;

/** `AchievementController.moveAllChildrenToColumn`: each visible child with a height under the last, `spacing` apart. */
const moveAllChildrenToColumn = (window: LayoutWindow, y: number, spacing: number) => {
    for (const child of window.children) {
        if (!child.visible || child.height <= 0) continue;

        child.setY(y);
        y += child.height + spacing;
    }
};

/**
 * `refreshCategoryList`: a tile per category the list shows, at its index in the whole list (a hidden
 * category leaves its place empty), then empty tiles until a fourth row would start.
 */
const categoryTiles = (categories: AchievementCategory[]) => {
    const tiles: { index: number; category?: AchievementCategory }[] = [];

    categories.forEach((category, index) => {
        if (categoryVisibleInList(category)) tiles.push({ index, category });
    });

    for (let index = categories.length; Math.floor(index / CATEGORIES_COLUMN_COUNT) < CATEGORY_ROWS_MAX; index++) tiles.push({ index });

    return tiles;
};

const categoryTilePosition = (index: number) => ({
    x: (CATEGORY_WIDTH + CATEGORY_SPACING_X) * (index % CATEGORIES_COLUMN_COUNT),
    y: ((CATEGORY_HEIGHT + CATEGORY_SPACING_Y) * Math.floor(index / CATEGORIES_COLUMN_COUNT)) + CATEGORY_SPACING_TOP,
});

export const AchievementsView = ({ onClose }: { onClose: () => void }) => {
    const t = useTranslation();
    const config = useConfigData();
    const badgeAssetUrl = useConfigValue<string>('badge.asset.url') ?? '';
    const badgeLimits = useSystemStore(x => x.badgePointLimits);
    const categories = useAchievementsStore(x => x.categories);
    const categoryCode = useAchievementsStore(x => x.category);
    const selected = useAchievementsStore(selectedAchievement);
    const unseen = useAchievementsStore(x => x.unseen);
    const score = useAchievementsStore(x => x.score);
    const roomCodes = useWiredStore(x => x.wiredAchievements);
    const { back } = useAchievementsActions();
    const { send } = useWebSocketContext();
    const viewport = useViewportSize();
    const [ hover, setHover ] = useState(NO_HOVER);
    // `prepareWindow`: `_window.center(); _window.y = 20`, once.
    const frame = useTemplateFrame({ id: 'achievements', defaultPosition: { x: Math.round((viewport.width - WINDOW_WIDTH) / 2), y: 20 }, onClose });
    const badgeUrl = useCallback((code: string) => badgeAssetUrl.replace('%badgename%', code), [ badgeAssetUrl ]);

    // `onAchievements` opens the window once the list is in.
    if (!categories) return null;

    const category = categories.find(entry => entry.code === categoryCode);

    // `refreshCategoryList`, and `getLowestPoint(categories_cont)`.
    const tiles = category ? [] : categoryTiles(categories);
    const categoriesHeight = tiles.reduce((lowest, tile) => Math.max(lowest, categoryTilePosition(tile.index).y + CATEGORY_HEIGHT), 0);

    // `refreshAchievementList`: the achievements the category shows, then empty slots to fill two rows.
    const scrolling = !!category && category.achievements.length > ACHIEVEMENT_ROWS_MAX * ACHIEVEMENT_COLUMNS;
    const columns = scrolling ? ACHIEVEMENT_COLUMNS - 1 : ACHIEVEMENT_COLUMNS;
    const shownAchievements = category ? category.achievements.filter(entry => achievementVisibleInCategory(category.code, entry, roomCodes)) : [];
    const slotCount = category ? Math.max(shownAchievements.length, ACHIEVEMENT_ROWS_MIN * columns) : 0;
    const slotPosition = (index: number) => ({
        x: (ACHIEVEMENT_WIDTH + (scrolling ? 5 : 0)) * (index % columns),
        y: (ACHIEVEMENT_HEIGHT * Math.floor(index / columns)) + ACHIEVEMENT_TOP_SPACING,
    });
    const achievementsHeight = slotCount ? slotPosition(slotCount - 1).y + ACHIEVEMENT_HEIGHT : 0;

    const total = totalProgress(categories);
    const levels = selected && achievementProgress(selected);
    const achievedCode = selected && achievedBadgeCode(selected);
    // `HabboQuestEngine.refreshReward(!finalLevel, ...)`.
    const rewardShown = !!selected && !selected.finalLevel && selected.levelRewardPointType >= 0 && selected.levelRewardPoints >= 1;

    const arrange = ({ find }: TemplateWindows) => {
        const window = find('quest_main_window');
        const content = window?.children.find(child => child.frameContent);

        if (!window || !content) return;

        find('categories_cont')?.setHeight(categoriesHeight);

        // `refreshAchievementList`: the list as tall as its slots (to its limit), the scroll area and bar with it.
        const list = find('achievements_list');

        find('achievements_cont')?.setHeight(achievementsHeight);
        list?.setHeight(achievementsHeight + 1);

        if (list) {
            find('achievements_scrollarea')?.setHeight(list.height);
            find('achievements_scrollbar')?.setHeight(list.height);
        }

        const caption = find('achievement_cont/reward_caption_txt');

        if (rewardShown && caption) moveWindowsToRow(QUEST_REWARD_ROW.map(name => find(`achievement_cont/${name}`)), caption.x, QUEST_REWARD_SPACING);

        moveAllChildrenToColumn(content, 0, CONTENT_SPACING);
        window.setHeight(getLowestPoint(content) + WINDOW_BOTTOM_SPACING);
    };

    return (
        <TemplateWindow
            id="habbo-quest-engine-com/Achievements"
            frame={frame}
            arrange={arrange}
            bindings={{
                back_button: { onPointerTap: back },

                // `refreshCategoryList`.
                categories_cont: {
                    visible: !category,
                    children: tiles.map(({ index, category: entry }) => (
                        <AchievementCategoryEntry
                            key={index}
                            {...categoryTilePosition(index)}
                            category={entry}
                            unseenCount={entry ? unseen.filter(item => item.category === entry.code).length : 0}
                            hovered={hover === index}
                            onPick={code => pickAchievementCategory(send, code)}
                            onHover={hovered => setHover(hovered ? index : NO_HOVER)}
                        />
                    )),
                },

                // `refreshCategoryListFooter`.
                categories_footer_cont: {
                    visible: !category,
                    children: !category && (
                        <QuestProgressBar
                            {...TOTAL_PROGRESS_BAR_LOC}
                            width={TOTAL_PROGRESS_BAR_WIDTH}
                            current={total.progress}
                            max={total.max}
                            levelKey={0}
                            scoreAtStartOfLevel={0}
                            caption={(progress, limit) => t('achievements.categories.totalprogress', undefined, { progress: String(progress), limit: String(limit) })}
                        />
                    ),
                },
                achievement_score_txt: { caption: t('achievements.categories.score', undefined, { score: String(score) }) },

                // `refreshAchievementsHeader`.
                achievements_header_cont: { visible: !!category },
                category_name_txt: { caption: category && t(`quests.${category.code}.name`, `quests.${category.code}.name`) },
                category_progress_txt: category
                    ? { caption: t('achievements.details.categoryprogress', undefined, { progress: String(categoryProgress(category).progress), limit: String(categoryProgress(category).max) }) }
                    : {},
                // `HabboQuestEngine.setupAchievementCategoryImage(window, category, false)`.
                'achievements_header_cont/category_pic_bitmap': { asset: category && `\${image.library.questing.url}achicon_${category.code}.png` },

                // `refreshAchievementList`: the slots added to `achievements_cont`, which the list's
                // own `achievements_scrollbar` scrolls once there are more than four rows.
                achievements_list: { visible: !!category },
                achievements_cont: {
                    children: Array.from({ length: slotCount }, (_, index) => {
                        const entry = shownAchievements[index];

                        return (
                            <AchievementEntry
                                key={entry?.achievementId ?? `empty-${index}`}
                                {...slotPosition(index)}
                                achievement={entry}
                                selected={!!entry && entry.achievementId === selected?.achievementId}
                                unseen={!!entry && unseen.some(item => item.achievementId === entry.achievementId)}
                                badgeUrl={badgeUrl}
                                onPick={id => pickAchievement(send, id)}
                            />
                        );
                    }),
                },
                achievements_scrollbar: { visible: scrolling },

                // `refreshAchievementDetails`.
                achievement_cont: {
                    visible: !!selected,
                    children: selected && levels && (
                        <QuestProgressBar
                            {...IN_LEVEL_PROGRESS_BAR_LOC}
                            width={IN_LEVEL_PROGRESS_BAR_WIDTH}
                            current={levels.current}
                            max={levels.limit}
                            levelKey={(selected.achievementId * 10000) + selected.level}
                            scoreAtStartOfLevel={selected.scoreAtStartOfLevel}
                            visible={selected.displayMethod !== 1 && !selected.finalLevel}
                            caption={(progress, limit) => t('achievements.details.progress', undefined, { progress: String(progress), limit: String(limit) })}
                        />
                    ),
                },
                achievement_name_txt: { caption: achievedCode ? getBadgeName(t, achievedCode) : undefined },
                achievement_desc_txt: { caption: achievedCode ? getBadgeDesc(t, achievedCode, badgeLimits) ?? '' : undefined },
                'achievement_cont/achievement_pic_bitmap': selected && achievedCode
                    ? { asset: badgeUrl(achievedCode), greyscale: !firstLevelAchieved(selected) }
                    : {},
                level_txt: selected && levels
                    ? { caption: t('achievements.details.level', undefined, { level: String(levels.earned), limit: String(selected.levelCount) }) }
                    : {},
                reward_caption_txt: { visible: rewardShown },
                reward_amount_txt: { visible: rewardShown, caption: selected ? String(selected.levelRewardPoints) : undefined },
                // `HabboQuestEngine.setupRewardImage`: the big icon of the reward's currency.
                currency_icon: { visible: rewardShown, style: selected ? String(getCurrencyIconStyle(selected.levelRewardPointType, config, true)) : undefined },
            }}
        />
    );
};

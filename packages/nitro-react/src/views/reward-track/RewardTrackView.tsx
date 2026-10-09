/**
 * A reward track's window - `RewardTrackView` over `habbo-quest-engine-com/reward_track_main_xml`
 * (1103x722, built in window context 1 and centred when it is made), with its parts:
 *
 * - `RewardTrackHeaderView`: the own avatar, the track's name, description and info
 *   (`reward_track.<id>.name` / `.desc` / `.info`), its points and the prizes claimed.
 * - `RewardTrackPrizeTrackView`: the prizes of one page at a time on the free and premium rows, each
 *   a clone of `prize_template` / `prize_template_premium` centred on its required points
 *   (`RewardTrackPrizeLayout`), a point indicator (a clone of `point_indicator_template`) under each
 *   distinct number of points, the progress bar filled to the track's points, previous / next
 *   disabled at the ends, and the claimable prizes on earlier and later pages counted beside them.
 *   A prize shows its product, its amount from 2 up, a check once claimed and a lock while premium is
 *   not bought; it fades below its points. A click claims it, or opens the premium confirmation
 *   for a locked one.
 * - `RewardTrackTaskListView`: the tasks completed, the All / In progress / Completed filter, a row
 *   per task (a clone of `task_template`: name, description, its action's picture, the progress bar
 *   and count of its active level and that level's points) that selects it, and the tip - or, with
 *   premium configured and not bought, the upgrade box whose button opens the confirmation.
 * - `RewardTrackTaskDetailsView`: the selected task's picture, name and description, a row per
 *   level (a clone of `level_template`) with its bar, count, check and points, the active level's
 *   border in the theme's active colour, and the hint with its button when the hotel gives it a link.
 *
 * The bars (`useRewardTrackBars`) ease to a new value when the track's progress changes while the
 * window is open (`RewardTrackView.shouldAnimate`), a task or level bar fading to green once full and a
 * task row that moved on a level filling to the end first; opening, paging, filtering and picking a
 * task put them straight at their value.
 */
import { useState } from 'react';

import { claimRewardTrackPrize, hideRewardTrack, openClientLink, openRewardTrackPremiumConfirmation } from '#base/commands';
import { AvatarImage } from '#base/components';
import { useWebSocketContext } from '#base/context/communication';
import {
    getRewardTrackClaimedPrizeCount, getRewardTrackCompletedTaskCount, getRewardTrackTaskActiveLevel, getRewardTrackTaskActiveLevelIndex, getRewardTrackTaskProgressRatio, isRewardTrackPrizeAvailable, isRewardTrackPrizeClaimable,
    isRewardTrackPrizePremiumLocked, isRewardTrackTaskComplete, RewardTrack, RewardTrackPrize, rewardTrackPrizeHasEnoughPoints, RewardTrackTask, rewardTrackTaskHasProgress, useRewardTrackStore,
} from '#base/context/reward-track';
import { useConfigData, useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows, useTemplateFrame } from '#base/theme';

import { buildRewardTrackPrizeLayout } from './rewardTrackPrizeLayout';
import { RewardTrackProductIcon } from './RewardTrackProductIcon';
import { RewardTrackBarTarget, useRewardTrackBars } from './rewardTrackProgressBar';

const TEMPLATE = 'habbo-quest-engine-com/reward_track_main_xml';

/** The window manager's bitmaps, as the layout's `asset_uri`s name them. */
const asset = (name: string) => `habbo-window-manager-com-${name}`;

/** `RewardTrackPrizeTrackView.MIN_PRIZE_SPACING`, and the widths `rebuild` reads (`prize_content`, `prize_template`). */
const MIN_PRIZE_SPACING = 15;
const PRIZE_CONTENT_WIDTH = 598;
const PRIZE_WIDTH = 80;
const POINT_INDICATOR_WIDTH = 80;
/** `RewardTrackMainProgressBarView`'s container (`track/loading_bar`) and how far its end shape runs past the fill. */
const MAIN_BAR_WIDTH = 602;
const MAIN_BAR_SHAPE_OVERHANG = 4;
/** The task rows' and the levels' bars. */
const TASK_BAR_WIDTH = 200;
const LEVEL_BAR_WIDTH = 260;
/** `levels` (150 high, `spacing` 9) and its `level_template` (44 high): what `scrollActiveLevelIntoView` measures. */
const LEVELS_HEIGHT = 150;
const LEVELS_SPACING = 9;
const LEVEL_HEIGHT = 44;
/** `RewardTrackPrizeView.refresh`: the product rises this much when its amount shows. */
const QUANTITY_ICON_RISE = 3;
/** `refreshState`'s `disableSection(window, !hasEnoughPoints, 0.75)`. */
const NOT_ENOUGH_POINTS_BLEND = 0.75;
/** `RewardTrackTaskFilterButtonView`: the caption on the selected tab, and on the others. */
const TAB_TEXT_SELECTED = 0xffffffff;
const TAB_TEXT_NOT_SELECTED = 4282664004;

/** The task filters (`_-y1D`). */
const FILTER_ALL = 0;
const FILTER_IN_PROGRESS = 1;
const FILTER_COMPLETED = 2;
const FILTER_KEYS = [ 'reward_track.tasks.tab.all_tasks', 'reward_track.tasks.tab.in_progress', 'reward_track.tasks.tab.completed' ];

/** `RewardTrackTheme.resolve`: dark, medium, light and active, by theme; blue for any other. */
const THEMES: Record<string, { dark: number; medium: number; light: number; active: number }> = {
    blue: { dark: 3503801, medium: 13624057, light: 14543865, active: 12441327 },
    orange: { dark: 13203736, medium: 16768946, light: 16773078, active: 16764817 },
    forest_green: { dark: 4164165, medium: 13494987, light: 14808031, active: 12115894 },
    red: { dark: 12077899, medium: 15846604, light: 16309725, active: 15186104 },
    cyan: { dark: 2072243, medium: 13103093, light: 14481403, active: 11921905 },
};

/** The task row's and level row's border colour in the layout (`_defaultBorderColor`). */
const TASK_BORDER_COLOR = undefined;

/** `RewardTrackTaskListView.matchesFilter`. */
const matchesFilter = (task: RewardTrackTask, filter: number) => {
    if (filter === FILTER_IN_PROGRESS) return rewardTrackTaskHasProgress(task) && !isRewardTrackTaskComplete(task);
    if (filter === FILTER_COMPLETED) return isRewardTrackTaskComplete(task);

    return true;
};

/** `RewardTrackTaskRowView`'s bar: its active level's progress, the level being what `refreshTask` compares. */
const taskBar = (task: RewardTrackTask): RewardTrackBarTarget => ({
    key: `task:${task.id}`,
    width: TASK_BAR_WIDTH,
    colored: true,
    ratio: getRewardTrackTaskProgressRatio(task, getRewardTrackTaskActiveLevel(task)),
    levelIndex: getRewardTrackTaskActiveLevelIndex(task),
});

/** `RewardTrackTaskLevelView`'s bar. */
const levelBar = (task: RewardTrackTask, index: number): RewardTrackBarTarget => ({
    key: `level:${task.id}:${index}`,
    width: LEVEL_BAR_WIDTH,
    colored: true,
    ratio: getRewardTrackTaskProgressRatio(task, task.levels[index]),
    levelIndex: -1,
});

export const RewardTrackView = () => {
    const shownTrackId = useRewardTrackStore(x => x.shownTrackId);
    const track = useRewardTrackStore(x => x.tracks.find(entry => entry.id === x.shownTrackId));
    const generation = useRewardTrackStore(x => x.generation);

    if (!shownTrackId || !track) return null;

    return (
        <RewardTrackWindow
            key={`${generation}:${track.id}`}
            track={track}
        />
    );
};

const RewardTrackWindow = ({ track }: { track: RewardTrack }) => {
    const t = useTranslation();
    // The hint links the hotel configures (`getProperty`), read when they come in.
    const config = useConfigData();
    const { send } = useWebSocketContext();
    const figure = useUserStore(x => x.figure);
    const gender = useUserStore(x => x.sex);
    const frame = useTemplateFrame({ id: 'reward_track', centered: true, resizeDirection: 'none', onClose: hideRewardTrack });
    const theme = THEMES[track.theme] ?? THEMES.blue;
    const layout = buildRewardTrackPrizeLayout(track.prizes, PRIZE_CONTENT_WIDTH, PRIZE_WIDTH, MIN_PRIZE_SPACING);
    // `refresh(false, true)`: the page the track's points are on, kept as the track changes.
    const [ page, setPage ] = useState(() => layout.pageForPoints(track.points));
    const [ filter, setFilter ] = useState(FILTER_ALL);
    const [ hoveredFilter, setHoveredFilter ] = useState(-1);
    const [ selectedTaskId, setSelectedTaskId ] = useState<string | undefined>(undefined);
    // `levels`' scroll: its top's place in the list, and the share of its range (`scrollV`).
    const [ levelsScroll, setLevelsScroll ] = useState({ y: 0, ratio: 0 });
    const [ hoveredTaskId, setHoveredTaskId ] = useState<string | undefined>(undefined);
    const pageIndex = Math.max(0, Math.min(layout.pageCount - 1, page));

    // `buildPageData`: each prize on its page's free or premium row, and each page's distinct points.
    const pagePrizes = (premium: boolean) => track.prizes.filter(prize => (prize.premium === premium) && (layout.pageForPoints(prize.requiredPoints) === pageIndex));
    const pagePoints = [ ...new Set(track.prizes.filter(prize => layout.pageForPoints(prize.requiredPoints) === pageIndex).map(prize => prize.requiredPoints)) ];

    /** `RewardTrackPrizeView`: one prize's clone, centred on its points. */
    const prizeItem = (prize: RewardTrackPrize): TemplateItem => {
        const claimed = prize.claimed;
        const locked = isRewardTrackPrizePremiumLocked(prize, track);
        const enough = rewardTrackPrizeHasEnoughPoints(prize, track);
        const tooltip = claimed ? 'claimed' : locked ? 'premium' : !isRewardTrackPrizeAvailable(prize, track) ? 'not_enough_points' : 'claim';
        const x = Math.round(layout.xForPoints(prize.requiredPoints, pageIndex) - (PRIZE_WIDTH / 2));

        return {
            key: prize.id,
            from: prize.premium ? 'prize_template_premium' : 'prize_template',
            bindings: {
                '': { alpha: enough ? 1 : NOT_ENOUGH_POINTS_BLEND },
                // `INVIS_ON_DISABLE`: the shadow goes while the prize is out of reach.
                'click_region/shadow': { visible: enough },
                click_region: {
                    tooltip: t(`reward_track.rewards.reward_tooltip.${tooltip}`),
                    // `onClick`.
                    onPointerTap: () => {
                        if (prize.claimed) return;
                        if (isRewardTrackPrizePremiumLocked(prize, track)) return openRewardTrackPremiumConfirmation(track.id);
                        if (isRewardTrackPrizeClaimable(prize, track)) claimRewardTrackPrize(send, track.id, prize.id);
                    },
                },
                product_icon: { children: <RewardTrackProductIcon prize={prize} /> },
                quantity_container: { visible: prize.rewardAmount > 1 },
                'quantity_container/@0': { caption: String(prize.rewardAmount), setCaptionAfterBuild: true },
                claimed_icon: { visible: claimed },
                locked_icon: { visible: locked },
            },
            arrange: ({ root, find }) => {
                root()?.setX(x);

                if (prize.rewardAmount > 1) {
                    const icon = find('product_icon');

                    icon?.setY(icon.y - QUANTITY_ICON_RISE);
                }
            },
        };
    };

    /** `RewardTrackPointIndicatorView`. */
    const pointItem = (points: number): TemplateItem => ({
        key: String(points),
        from: 'point_indicator_template',
        bindings: {
            available_icon: { asset: asset((track.points >= points) ? 'reward_track_available_icon' : 'reward_track_not_available_icon') },
            points_txt: { caption: String(points), setCaptionAfterBuild: true },
        },
        arrange: ({ root }) => root()?.setX(Math.round(layout.xForPoints(points, pageIndex) - (POINT_INDICATOR_WIDTH / 2))),
    });

    // `refreshUnclaimedIndicators`: the claimable prizes not on this page, before it and after it.
    const unclaimed = track.prizes.filter(prize => isRewardTrackPrizeClaimable(prize, track) && (layout.pageForPoints(prize.requiredPoints) !== pageIndex));
    const previousUnclaimed = unclaimed.filter(prize => layout.pageForPoints(prize.requiredPoints) < pageIndex).length;
    const nextUnclaimed = unclaimed.length - previousUnclaimed;

    // `RewardTrackTaskListView`.
    const tasks = track.tasks.filter(task => matchesFilter(task, filter));
    const selectedTask = tasks.find(task => task.id === selectedTaskId);

    // `RewardTrackPrizeTrackView.refreshByX` (the main bar, on this page), the task rows' and the selected task's levels.
    const mainBar: RewardTrackBarTarget = { key: 'main', width: MAIN_BAR_WIDTH, colored: false, ratio: layout.xForPoints(track.points, pageIndex) / MAIN_BAR_WIDTH, levelIndex: -1 };
    const drawBar = useRewardTrackBars([
        mainBar,
        ...tasks.map(taskBar),
        ...(selectedTask ? selectedTask.levels.map((_, index) => levelBar(selectedTask, index)) : []),
    ], track);
    const showsPremiumUpgrade = track.hasPremiumConfig && !track.premium;

    /**
     * `RewardTrackTaskListView.selectTask` -> `RewardTrackTaskDetailsView.selectTask`, ending in
     * `scrollActiveLevelIntoView`: with more levels than fit, the list scrolls just far enough for the
     * active level to show, from where it was (the place this window last scrolled it to).
     */
    const selectTask = (task: RewardTrackTask) => {
        setSelectedTaskId(task.id);

        const count = task.levels.length;
        const maxScroll = (count * LEVEL_HEIGHT) + (Math.max(0, count - 1) * LEVELS_SPACING) - LEVELS_HEIGHT;

        if (maxScroll <= 0) {
            setLevelsScroll({ y: 0, ratio: 0 });

            return;
        }

        const top = getRewardTrackTaskActiveLevelIndex(task) * (LEVEL_HEIGHT + LEVELS_SPACING);
        const bottom = top + LEVEL_HEIGHT;
        const visibleY = Math.min(levelsScroll.y, maxScroll);
        let y = visibleY;

        if (top < visibleY) y = top;
        else if (bottom > (visibleY + LEVELS_HEIGHT)) y = bottom - LEVELS_HEIGHT;

        if (y !== levelsScroll.y) setLevelsScroll({ y, ratio: y / maxScroll });
    };

    /** `RewardTrackTaskRowView`. */
    const taskItem = (task: RewardTrackTask): TemplateItem => {
        const level = getRewardTrackTaskActiveLevel(task);
        const progress = drawBar(taskBar(task));
        const selected = task.id === selectedTask?.id;
        const hovered = task.id === hoveredTaskId;
        const name = `reward_track.${track.id}.task.${task.id}`;

        return {
            key: task.id,
            from: 'task_template',
            bindings: {
                '': {
                    onPointerTap: () => selectTask(task),
                    onPointerOver: () => setHoveredTaskId(task.id),
                    onPointerOut: () => setHoveredTaskId(current => ((current === task.id) ? undefined : current)),
                },
                // `refreshBorder`.
                task_border: { color: selected ? theme.active : hovered ? theme.light : TASK_BORDER_COLOR },
                task_name: { caption: t(`${name}.name`, `${name}.name`), setCaptionAfterBuild: true },
                task_description: { caption: t(`${name}.desc`, `${name}.desc`), setCaptionAfterBuild: true },
                task_image: { asset: asset(`reward_track_tasks_${task.actionType.toLowerCase()}`) },
                task_progress_txt: { caption: `${task.progressCount} / ${level?.requiredCount ?? 0}`, setCaptionAfterBuild: true },
                track_reward_txt: { caption: String(level?.pointsReward ?? 0), setCaptionAfterBuild: true },
                'loading_bar/progress/loading_bar': { color: progress.color },
            },
            arrange: ({ find }) => find('loading_bar/progress')?.setWidth(progress.fillWidth),
        };
    };

    /** `RewardTrackTaskLevelView`. */
    const levelItems = (task: RewardTrackTask): TemplateItem[] => {
        const activeIndex = getRewardTrackTaskActiveLevelIndex(task);

        return task.levels.map((level, index): TemplateItem => {
            const ratio = getRewardTrackTaskProgressRatio(task, level);
            const progress = drawBar(levelBar(task, index));

            return {
                key: String(index),
                from: 'level_template',
                bindings: {
                    level_name: { caption: t('reward_track.levels.level', '', { level: String(index + 1) }), setCaptionAfterBuild: true },
                    level_reward_txt: { caption: String(level.pointsReward), setCaptionAfterBuild: true },
                    level_progress_txt: { caption: `${task.progressCount} / ${level.requiredCount}`, setCaptionAfterBuild: true },
                    completed_icon: { visible: ratio >= 1 },
                    locked_icon: { visible: false },
                    level_border: { color: (index === activeIndex) ? theme.active : TASK_BORDER_COLOR },
                    'loading_bar/progress/loading_bar': { color: progress.color },
                },
                arrange: ({ find }) => find('loading_bar/progress')?.setWidth(progress.fillWidth),
            };
        });
    };

    // `RewardTrackTaskDetailsView.selectTask`: the hint's button only with the hotel's link for it.
    const hintKey = selectedTask ? `reward_track.${track.id}.task.${selectedTask.id}.hint` : '';
    const configuredLink = selectedTask ? config[`${hintKey}.internal_link`] : undefined;
    const hintLink = (typeof configuredLink === 'string') ? configuredLink : '';

    /** `RewardTrackTaskFilterButtonView`: the three tabs, each the layout's own region. */
    const filterBindings = (index: number): TemplateBindings => {
        const active = filter === index;
        const prefix = `tab_selection/@${index}`;

        return {
            [prefix]: {
                onPointerTap: () => setFilter(index),
                onPointerOver: () => setHoveredFilter(index),
                onPointerOut: () => setHoveredFilter(current => ((current === index) ? -1 : current)),
            },
            [`${prefix}/selected_view`]: { visible: active },
            [`${prefix}/notselected_shape`]: { visible: !active, color: (!active && (hoveredFilter === index)) ? theme.light : undefined },
            [`${prefix}/button_text`]: { caption: t(FILTER_KEYS[index]), color: active ? TAB_TEXT_SELECTED : TAB_TEXT_NOT_SELECTED, setCaptionAfterBuild: true },
        };
    };

    const mainFill = drawBar(mainBar).fillWidth;

    const bindings: TemplateBindings = {
        // `RewardTrackHeaderView`.
        own_avatar: {
            children: (
                <AvatarImage
                    figure={figure}
                    gender={gender}
                    direction={2}
                />
            ),
        },
        track_title_txt: { caption: t(`reward_track.${track.id}.name`, `reward_track.${track.id}.name`), setCaptionAfterBuild: true },
        track_desc_txt: { caption: t(`reward_track.${track.id}.desc`, `reward_track.${track.id}.desc`), setCaptionAfterBuild: true },
        track_instructions_txt: { caption: t(`reward_track.${track.id}.info`, `reward_track.${track.id}.info`), setCaptionAfterBuild: true },
        points_total_collected_txt: { caption: String(track.points), setCaptionAfterBuild: true },
        rewards_collected_txt: { caption: t('reward_track.profile.rewards_collected', '', { progress: String(getRewardTrackClaimedPrizeCount(track)), total: String(track.prizes.length) }), setCaptionAfterBuild: true },

        // `RewardTrackPrizeTrackView`.
        prize_content: { items: [ ...pagePrizes(false).map(prizeItem), ...pagePrizes(true).map(prizeItem) ] },
        points_indicator: { items: pagePoints.map(pointItem) },
        previous_btn: { disableSection: pageIndex <= 0, onPointerTap: () => setPage(Math.max(0, pageIndex - 1)) },
        next_btn: { disableSection: pageIndex >= (layout.pageCount - 1), onPointerTap: () => setPage(Math.min(layout.pageCount - 1, pageIndex + 1)) },
        previous_unclaimed_indicator: { visible: previousUnclaimed > 0 },
        previous_unclaimed_count: { caption: String(previousUnclaimed), setCaptionAfterBuild: true },
        next_unclaimed_indicator: { visible: nextUnclaimed > 0 },
        next_unclaimed_count: { caption: String(nextUnclaimed), setCaptionAfterBuild: true },

        // `RewardTrackTaskListView`.
        tasks_completion_txt: { caption: t('reward_track.tasks.progress', '', { progress: String(getRewardTrackCompletedTaskCount(track)), total: String(track.tasks.length) }), setCaptionAfterBuild: true },
        ...filterBindings(FILTER_ALL),
        ...filterBindings(FILTER_IN_PROGRESS),
        ...filterBindings(FILTER_COMPLETED),
        tasks: { items: tasks.map(taskItem) },
        reward_info: { visible: !showsPremiumUpgrade },
        reward_info_not_premium: { visible: showsPremiumUpgrade },
        get_premium_btn: { onPointerTap: () => openRewardTrackPremiumConfirmation(track.id) },

        // `RewardTrackTaskDetailsView`: hidden with no task selected (`clear`).
        task_info: { visible: !!selectedTask },
        ...(selectedTask && {
            task_info_img: { asset: asset(`reward_track_tasks_${selectedTask.actionType.toLowerCase()}`) },
            task_info_name: { caption: t(`reward_track.${track.id}.task.${selectedTask.id}.name`, `reward_track.${track.id}.task.${selectedTask.id}.name`), setCaptionAfterBuild: true },
            task_info_description: { caption: t(`reward_track.${track.id}.task.${selectedTask.id}.desc`, `reward_track.${track.id}.task.${selectedTask.id}.desc`), setCaptionAfterBuild: true },
            task_hint_text: { caption: t(`${hintKey}.desc`, `${hintKey}.desc`), setCaptionAfterBuild: true },
            hint_redirect_btn: { visible: hintLink !== '', caption: t(`${hintKey}.button_text`, `${hintKey}.button_text`), onPointerTap: () => openClientLink(send, hintLink) },
            levels: { items: levelItems(selectedTask), scrollV: levelsScroll.ratio },
        }),
    };

    /** `RewardTrackMainProgressBarView.render`: the fill, and its rounded end shape 4 past it until it reaches the end. */
    const arrange = ({ find }: TemplateWindows) => {
        find('track/loading_bar/progress')?.setWidth(mainFill);
        find('track/loading_bar/progress/loading_bar/shape')?.setWidth((mainFill >= (MAIN_BAR_WIDTH - MAIN_BAR_SHAPE_OVERHANG)) ? MAIN_BAR_WIDTH : (mainFill + MAIN_BAR_SHAPE_OVERHANG));
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={bindings}
            arrange={arrange}
        />
    );
};

/**
 * The daily tasks windows - Flash `DailyTasksView` over `habbo-quest-engine-com/daily_tasks_xml` and
 * `UnclaimedTasksView` over `dailytasks_unclaimed_xml`, with a `DailyTaskView` per task (a clone of
 * `task_template`, which both windows take from the main one) and a `DailyTaskRewardView` per reward
 * (a clone of `reward_template`).
 *
 * - `taskAmountChanged`: `extra_cont` (the unclaimed tasks button) shows while there are expired
 *   tasks; `tasks_list` is as tall as one to four tasks; the window fits them, its width the
 *   layout's least unless the list scrolls; `hc_info_text` and `get_hc_btn` by the club
 *   (`setHcDoubleDucketsInfoText`), the button opening the club's catalogue page.
 * - `update`, every 500 ms while shown: the title with the longest time left
 *   (`dailytasks.refreshes`, `FriendlyTime`), and the list asked for while it is empty or ran out
 *   more than 5 seconds ago.
 * - A task (`updateStatusAndRepeatsUI`): its name, description and hint (`dailytask.<code>.name` /
 *   `.desc` / `.hint`), its image (`${image.library.dailytasks.url}<code><version>.png`); active, on
 *   orange with the progress bar (`ProgressBar` in percent); completed or claimed, on green with
 *   "Task complete" and the claim button (disabled once claimed). A bonus task stays yellow.
 * - A reward: the `product_icon` of its product (`RewardDisplayWrapper`) and "x<amount>" from 2 up;
 *   without the amount the icon is centred in its box.
 *
 * A task completed while its bar shows stays drawn active while the bar fills to the end, then
 * turns complete (`§_-a1p§`).
 */
import type { IDailyTaskInfo, IDailyTaskReward } from '@nitrodevco/nitro-packets';
import { DAILY_TASK_STATUS_ACTIVE, DAILY_TASK_STATUS_CLAIMED } from '@nitrodevco/nitro-packets';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import { claimDailyTask, finishDailyTaskCompletion, getDailyTaskSecondsLeft, hideDailyTasks, isDailyTaskExpired, openClubCatalogPage, requestDailyTasks, showUnclaimedDailyTasks } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useDailyTasksStore } from '#base/context/daily-tasks';
import { useHabbiconsStore } from '#base/context/habbicons';
import { useConfigData, useInterpolate, useTranslation } from '#base/context/system';
import { useOwnHasClub } from '#base/context/user';
import { findTemplateChild, Region, TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows, themeIconFrame, ThemeImage, useTemplate, useTemplateFrame } from '#base/theme';
import { getCurrencyIconStyle, GetFriendlyTime } from '#base/utils';
import { QuestProgressBar } from '#base/views/achievements/QuestProgressBar';
import { CollectiblesPreviewSlots, CollectiblesProductPreview } from '#base/views/collectibles/CollectiblesProductPreview';

const TEMPLATE = 'habbo-quest-engine-com/daily_tasks_xml';
const UNCLAIMED_TEMPLATE = 'habbo-quest-engine-com/dailytasks_unclaimed_xml';
const PRODUCT_ICON_TEMPLATE = 'habbo-window-manager-com/product_icon_xml';

/** `DailyTaskView`'s colours: the task's ground, its title bar and its reward header. */
const ACTIVE_COLORS = [ 15916471, 15511865, 15714445 ];
const COMPLETED_COLORS = [ 13033652, 4960837, 10931858 ];
const BONUS_COLORS = [ 15725493, 14208611, 14804370 ];

/** `DailyTasksView.update`'s title round and how far past its end a task asks for the list again. */
const UPDATE_INTERVAL_MS = 500;
const STALE_SECONDS = -5;

/** `taskAmountChanged`: the frame's header and the most tasks the list grows to. */
const FRAME_HEADER_HEIGHT = 33;
const MAX_VISIBLE_TASKS = 4;

/** `new ProgressBar(.., progressBarContainer.width - 8, ..)`. */
const PROGRESS_BAR_WIDTH = 102;

/** `ProductIconWidget`'s product types, from the `productTypeId` the reward sends. */
const PRODUCT_WALL = 0;
const PRODUCT_FLOOR = 1;
const PRODUCT_BADGE = 4;
const PRODUCT_EFFECT = 2;
const PRODUCT_CURRENCY = 8;
const PRODUCT_CHAT_STYLE = 9;
const PRODUCT_PET = 10;
const PRODUCT_CLOTHING = 11;
const PRODUCT_HABBICON = 12;

/** `product_icon_xml`'s windows: the 46x40 `bitmap` at -3,0, the 48x48 `pet_image_widget` at -4,-2 facing south. */
const PRODUCT_ICON_SLOTS: CollectiblesPreviewSlots = {
    productPreview: { left: -3, top: 0, width: 46, height: 40 },
    pet: { left: -4, top: -2, width: 48, height: 48, zoom: 1, shrinkOnOverflow: true, direction: 135 },
};

/** `habbiconResult`: the habbicon's preview, or a grey 40x40 square until the habbicon assets are in. */
const HabbiconReward = ({ habbiconId }: { habbiconId: number }) => {
    const preview = useHabbiconsStore(state => state.previews[habbiconId]);

    if (!preview) {
        return (
            <Region
                backgroundColor="#8f8f8f"
                layout={{ position: 'absolute', left: 0, top: 0, width: 40, height: 40 }}
            />
        );
    }

    return (
        <ThemeImage
            texture={preview}
            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
            layout={{ position: 'absolute', left: -3, top: 0, width: 46, height: 40 }}
        />
    );
};

/** `ProductIconWidget`'s previews the template's own windows do not draw here: an effect's icon, a chat style, a pet, a habbicon. */
const rewardPreview = (reward: IDailyTaskReward) => {
    const id = parseInt(reward.rewardTypeId, 10);

    switch (reward.productItemTypeId) {
        case PRODUCT_EFFECT:
            return (
                <CollectiblesProductPreview
                    preview={{ kind: 'effect_icon', effectId: id }}
                    slots={PRODUCT_ICON_SLOTS}
                />
            );
        case PRODUCT_CHAT_STYLE:
            return (
                <CollectiblesProductPreview
                    preview={{ kind: 'chat_style_selector', styleId: id }}
                    slots={PRODUCT_ICON_SLOTS}
                />
            );
        case PRODUCT_PET:
            return (
                <CollectiblesProductPreview
                    preview={{ kind: 'pet', figure: reward.extraParams }}
                    slots={PRODUCT_ICON_SLOTS}
                />
            );
        case PRODUCT_HABBICON:
            return <HabbiconReward habbiconId={id} />;
        default:
            return undefined;
    }
};

/**
 * `RewardDisplayWrapper` in `product_icon_xml` (`ProductIconWidget.productInfo`): a currency's icon,
 * a badge, a furni's icon, an effect's icon, a chat style, a pet or a habbicon.
 */
const RewardIcon = ({ reward }: { reward: IDailyTaskReward }) => {
    const config = useConfigData();
    const interpolate = useInterpolate();
    const type = reward.productItemTypeId;
    const bindings: TemplateBindings = {};
    const iconStyle = (type === PRODUCT_CURRENCY) ? getCurrencyIconStyle(parseInt(reward.rewardTypeId, 10), config, true) : 0;

    if (type === PRODUCT_CURRENCY) {
        bindings.icon = { visible: iconStyle > 0, style: String(iconStyle) };
    } else if (type === PRODUCT_BADGE) {
        bindings.badge_image_widget = { visible: true, asset: interpolate('${badge.asset.url}').replace('%badgename%', reward.rewardTypeId) };
    } else if ((type === PRODUCT_WALL) || (type === PRODUCT_FLOOR) || (type === PRODUCT_CLOTHING)) {
        bindings.bitmap = { asset: rewardFurniIcon(type === PRODUCT_WALL, parseInt(reward.rewardTypeId, 10)) };
    } else {
        bindings[''] = { children: rewardPreview(reward) };
    }

    // `iconResult` -> `fitToSize`: the icon takes its own size, kept centred by its `align` params.
    const arrange = ({ find }: TemplateWindows) => {
        const icon = find('icon');
        const frame = (iconStyle > 0) ? themeIconFrame(String(iconStyle)) : undefined;

        if (!icon || !frame) return;

        icon.setWidth(frame.width);
        icon.setHeight(frame.height);
    };

    return (
        <TemplateWindow
            id={PRODUCT_ICON_TEMPLATE}
            bindings={bindings}
            arrange={arrange}
        />
    );
};

/** `getWallItemIcon` / `getFurnitureIcon` of the furni the reward names. */
const rewardFurniIcon = (isWallItem: boolean, typeId: number): string => (isWallItem ? GetRoomEngine().getFurnitureWallIconUrl(typeId, undefined) : GetRoomEngine().getFurnitureFloorIconUrl(typeId)) ?? '';

export const DailyTasksView = () => {
    const shown = useDailyTasksStore(x => x.shown);
    const unclaimedShown = useDailyTasksStore(x => x.unclaimedShown);
    const tasks = useDailyTasksStore(x => x.tasks);
    const completingTaskIds = useDailyTasksStore(x => x.completingTaskIds);
    const hasClub = useOwnHasClub();
    const t = useTranslation();
    const interpolate = useInterpolate();
    const mainTemplate = useTemplate(TEMPLATE);
    const { send } = useWebSocketContext();
    const frame = useTemplateFrame({ id: 'daily_tasks', defaultPosition: { x: 43, y: 37 }, resizeDirection: 'none', onClose: hideDailyTasks });
    const unclaimedFrame = useTemplateFrame({ id: 'daily_tasks_unclaimed', defaultPosition: { x: 43, y: 37 }, resizeDirection: 'none', onClose: () => showUnclaimedDailyTasks(false) });
    const [ now, setNow ] = useState(() => Date.now());

    // `update`: the title's time left, and the list asked for when there is none or it ran out.
    useEffect(() => {
        if (!shown) return;

        const timer = setInterval(() => setNow(Date.now()), UPDATE_INTERVAL_MS);

        return () => clearInterval(timer);
    }, [ shown ]);

    const longestSecondsLeft = tasks.reduce((longest, task) => Math.max(longest, getDailyTaskSecondsLeft(task, now)), 0);
    const needsTasks = shown && ((tasks.length === 0) || (longestSecondsLeft < STALE_SECONDS));

    useEffect(() => {
        if (needsTasks) requestDailyTasks(send);
    }, [ needsTasks, now, send ]);

    const taskTemplate = mainTemplate ? findTemplateChild(mainTemplate.elements, 'task_template') : undefined;
    const rewardTemplate = taskTemplate ? findTemplateChild(taskTemplate.children, 'reward_template') : undefined;

    if (!taskTemplate || !rewardTemplate || (!shown && !unclaimedShown)) return null;

    const currentTasks = tasks.filter(task => !isDailyTaskExpired(task, now));
    const expiredTasks = tasks.filter(task => isDailyTaskExpired(task, now));

    /** `DailyTaskRewardView`: one reward's clone of `reward_template`. */
    const rewardItem = (reward: IDailyTaskReward, index: number): TemplateItem => ({
        key: String(index),
        from: rewardTemplate,
        bindings: {
            reward_amount_border: { visible: reward.amount > 1 },
            reward_amount_text: { caption: `x${reward.amount}`, setCaptionAfterBuild: true },
            reward_display_widget: { children: <RewardIcon reward={reward} /> },
        },
        // Without the amount the icon is centred in its box.
        arrange: ({ find }) => {
            const widget = find('reward_display_widget');

            if ((reward.amount <= 1) && widget?.parent) widget.setY((widget.parent.height / 2) - (widget.height / 2));
        },
    });

    /** `DailyTaskView`: one task's clone of `task_template`. */
    const taskItem = (task: IDailyTaskInfo): TemplateItem => {
        // Completed while its bar showed: drawn active, the bar filling to the end, until it has (`§_-a1p§`).
        const completing = completingTaskIds.includes(task.taskId);
        const active = completing || (task.status === DAILY_TASK_STATUS_ACTIVE);
        const [ ground, title, reward ] = task.isBonus ? BONUS_COLORS : (active ? ACTIVE_COLORS : COMPLETED_COLORS);
        const claimed = task.status === DAILY_TASK_STATUS_CLAIMED;

        return {
            key: String(task.taskId),
            from: taskTemplate,
            bindings: {
                '': { color: ground },
                task_name_cont: { color: title },
                reward_title_border: { color: reward },
                task_title_txt: { caption: t(`dailytask.${task.taskCode}.name`, `dailytask.${task.taskCode}.name`), setCaptionAfterBuild: true },
                task_desc_txt: { caption: t(`dailytask.${task.taskCode}.desc`, `dailytask.${task.taskCode}.desc`) },
                info_hover_region: { tooltip: t(`dailytask.${task.taskCode}.hint`, `dailytask.${task.taskCode}.hint`) },
                task_static_bitmap: { asset: interpolate(`\${image.library.dailytasks.url}${task.taskCode}${task.imageVersion}.png`) },
                rewards_list: { items: task.rewards.map(rewardItem) },
                completion_cont: { visible: !active },
                claim_button_container: { visible: !active },
                claim_button: { disabled: claimed, onPointerTap: claimed ? undefined : () => claimDailyTask(send, task.taskId) },
                claim_txt: { caption: t(claimed ? 'dailytasks.claimed' : 'dailytasks.claim'), setCaptionAfterBuild: true },
                progress_bar_wrapper: {
                    visible: active,
                    children: active && (
                        <QuestProgressBar
                            x={0}
                            y={0}
                            width={PROGRESS_BAR_WIDTH}
                            current={completing ? task.requiredRepeats : task.repeats}
                            max={task.requiredRepeats}
                            levelKey={task.taskId}
                            scoreAtStartOfLevel={0}
                            caption={progress => t('quests.tracker.progress', '', { progress: String(Math.floor((progress / Math.max(1, task.requiredRepeats)) * 100)) })}
                            onSettled={completing ? () => finishDailyTaskCompletion(task.taskId) : undefined}
                        />
                    ),
                },
            },
        };
    };

    const title = (longestSecondsLeft > 0)
        ? `${t('dailytasks.title')} - ${t('dailytasks.refreshes', 'Refresh in %time', { time: GetFriendlyTime(t, longestSecondsLeft) })}`
        : t('dailytasks.title');
    const showExtra = expiredTasks.length > 0;

    const bindings: TemplateBindings = {
        '': { caption: title },
        extra_cont: { visible: showExtra },
        unclaimed_btn: { onPointerTap: () => showUnclaimedDailyTasks(true) },
        tasks_list: { items: currentTasks.map(taskItem) },
        hc_info_text: { caption: hasClub ? t('hc.has.double_duckets.info', 'You get double duckets as you are an HC member!') : t('hc.get.double_duckets.info', 'Get HC membership to gain double duckets!') },
        get_hc_btn: { visible: !hasClub, onPointerTap: () => openClubCatalogPage('hc_membership') },
    };

    // `taskAmountChanged`.
    const arrange = ({ find, root }: TemplateWindows) => {
        const window = root();
        const main = find('main_cont');
        const extra = find('extra_cont');
        const list = find('tasks_list');
        const hcInfo = find('hc_info_cont');

        if (!window || !main || !extra || !list || !hcInfo) return;

        const spacing = 5;
        const listSpacing = 8;
        const extraHeight = showExtra ? extra.height + spacing : 0;

        list.setHeight((Math.min(Math.max(currentTasks.length, 1), MAX_VISIBLE_TASKS) * (taskTemplate.height + listSpacing)) - listSpacing);
        window.setHeight(FRAME_HEADER_HEIGHT + extraHeight + list.height + spacing + hcInfo.height + spacing);
        window.setWidth(window.minWidth);
        extra.setWidth(window.width);
        hcInfo.setWidth(window.width);
    };

    return (
        <>
            {shown && (
                <TemplateWindow
                    id={TEMPLATE}
                    frame={frame}
                    bindings={bindings}
                    arrange={arrange}
                />
            )}
            {unclaimedShown && (
                <TemplateWindow
                    id={UNCLAIMED_TEMPLATE}
                    frame={unclaimedFrame}
                    bindings={{ tasks_list: { items: expiredTasks.map(taskItem), autoHideScrollBar: false } }}
                />
            )}
        </>
    );
};

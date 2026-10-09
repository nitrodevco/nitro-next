/**
 * The quest list: AS3 `quest/QuestsList` over the `habbo-quest-engine-com/Quests` window template.
 * `prepareWindow` opens it centred with `quest_list`'s spacing at 10, and `setupHcDoubleDucketsInfo`
 * fills the footer. Each quest is a `QuestEntry` item (`createListEntry`) with the `Campaign`,
 * `Quest`, `CampaignCompleted` and `EntryArrows` windows added to it, filled by
 * `refreshEntryDetails` / `refreshEntryQuestDetails` as bindings; `createListEntry` and
 * `setEntryHeight`'s geometry is the item's `arrange`. `update` refreshes the list every second, which
 * counts a seasonal quest's time down (`refreshTimeLeft`).
 *
 * `waitPeriodSeconds` is no field of the packet (only `NextQuestTimer` sets it), so the delayed quest
 * texts (`delay_desc_txt`, `quests.list.questdelayed`) stay hidden here as they do in the list.
 */
import type { IQuestMessageData } from '@nitrodevco/nitro-packets';
import { useEffect, useRef, useState } from 'react';

import { acceptQuest, rejectQuest } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useQuestsStore } from '#base/context/quests';
import { useConfigData, useSystemActions, useTranslation } from '#base/context/system';
import { useOwnHasClub } from '#base/context/user';
import { useViewportSize } from '#base/hooks';
import { Template, TemplateItem, TemplateWindow, TemplateWindows, useTemplateFrame, useTemplateLibrary } from '#base/theme';
import { getCurrencyIconStyle, GetFriendlyTime } from '#base/utils';

const LIBRARY = 'habbo-quest-engine-com';

/** The `Quests` layout's size, which `_window.center()` centres. */
const WINDOW_WIDTH = 512;
const WINDOW_HEIGHT = 448;

// `QuestsList` constants.
const COL_SPACING = 5;
const QUEST_LIST_SPACING = 10;
const CANCEL_LINK_OFFSET_FROM_RIGHT = 10;
const COMPLETION_TEXT_OFFSET_FROM_BOTTOM = 30;
/** `setEntryHeight`'s campaign background inset. */
const BG_INSET = 2;
/** `update`: `_msecsToRefresh`. */
const REFRESH_MS = 1000;

/** `HabboQuestEngine.refreshReward`'s `moveChildrenToRow` spacing. */
const REWARD_SPACING = 3;
const REWARD_ROW = [ 'reward_caption_txt', 'reward_amount_txt', 'currency_icon' ];

/** `HabboQuestEngine._SafeStr_nK`: the quests whose picture is the `_a` one. */
const QUESTS_WITH_PROMPTS = [ 'MOVEITEM', 'ENTEROTHERSROOM', 'CHANGEFIGURE', 'FINDLIFEGUARDTOWER', 'SCRATCHAPET' ];

type Translate = ReturnType<typeof useTranslation>;

/** `QuestMessageData.getCampaignLocalizationKey` / `getQuestLocalizationKey`. */
const campaignKey = (quest: IQuestMessageData) => `quests.${quest.campaignCode}`;
const questKey = (quest: IQuestMessageData) => `${campaignKey(quest)}.${quest.localizationCode}`;

/** `QuestMessageData.secondsLeft`: what was left when it arrived, less the seconds since. */
const secondsLeft = (quest: IQuestMessageData, now: number) => ((quest.secondsLeft <= 0) ? 0 : quest.secondsLeft - Math.floor((now - quest.receiveTime) / 1000));

/** `refreshEntry`: a seasonal quest shows while its time lasts; any other always. */
const isEntryShown = (quest: IQuestMessageData, now: number) => !quest.isSeasonal || (secondsLeft(quest, now) >= 0);

/** `HabboQuestEngine.moveChildrenToRow`: each visible window after the last, from `x`, `spacing` apart. */
const moveChildrenToRow = (windows: TemplateWindows, names: string[], x: number, spacing: number) => {
    for (const name of names) {
        const window = windows.find(name);

        if (!window?.visible) continue;

        window.setX(x);
        x += window.width + spacing;
    }
};

/**
 * `createListEntry` and `setEntryHeight`, which add the `Campaign`, `Quest`, `CampaignCompleted` and
 * `EntryArrows` windows to the `QuestEntry` and then size and place them. The template engine sets a
 * clone up before the windows added to it exist, so each window does its own part from the layouts'
 * sizes (the `Campaign` and `Quest` ones the code reads are their layouts', no text changes them):
 * the cancel link as wide as its text, 10 in from the quest's right edge; the quest panel 5 right of
 * the campaign tile, the entry as wide as both; the campaign tile as tall as the quest panel, its
 * arrows on its right edge, halfway down; the counter 30 above its bottom and the lower background
 * its bottom half. `refreshEntryDetails` puts a one-line campaign name at 12 and a two-line one at
 * 2, and `refreshReward` lines the reward up from its caption.
 */
interface EntrySizes {
    campaign: Template;
    quest: Template;
}

const questX = ({ campaign }: EntrySizes) => campaign.width + COL_SPACING;

const arrangeEntry = (sizes: EntrySizes) => (windows: TemplateWindows) => {
    const entry = windows.root();

    entry?.setWidth(questX(sizes) + sizes.quest.width);
    entry?.setHeight(sizes.quest.height);
};

const arrangeCampaign = (sizes: EntrySizes) => (windows: TemplateWindows) => {
    const campaign = windows.root();

    if (!campaign) return;

    campaign.setHeight(sizes.quest.height);
    windows.find('completion_txt')?.setY(campaign.height - COMPLETION_TEXT_OFFSET_FROM_BOTTOM);

    const bottom = windows.find('bg_bottom');

    if (bottom) {
        bottom.setHeight(Math.floor((campaign.height - (BG_INSET * 2)) / 2));
        bottom.setY(BG_INSET + bottom.height);
    }

    const header = windows.find('campaign_header_txt');

    header?.setY((header.height <= 17) ? 12 : 2);
};

const arrangeQuest = (sizes: EntrySizes, rewardShown: boolean) => (windows: TemplateWindows) => {
    const quest = windows.root();
    const cancelRegion = windows.find('cancel_region');
    const cancelText = windows.find('cancel_txt');

    if (cancelRegion && cancelText) {
        cancelRegion.setWidth(cancelText.width);
        cancelRegion.setX(quest ? quest.width - cancelRegion.width - CANCEL_LINK_OFFSET_FROM_RIGHT : 0);
    }

    quest?.setX(questX(sizes));

    const caption = windows.find('reward_caption_txt');

    if (rewardShown && caption) moveChildrenToRow(windows, REWARD_ROW, caption.x, REWARD_SPACING);
};

const arrangeCompleted = (sizes: EntrySizes) => (windows: TemplateWindows) => windows.root()?.setX(questX(sizes));

const arrangeArrows = (sizes: EntrySizes) => (windows: TemplateWindows) => {
    const arrows = windows.root();

    if (!arrows) return;

    arrows.setX(sizes.campaign.width - 2);
    arrows.setY(Math.floor((sizes.quest.height - arrows.height) / 2) + 1);
};

interface EntryContext {
    templates: Record<string, Template>;
    config: Record<string, unknown>;
    t: Translate;
    now: number;
    onAccept: (questId: number) => void;
    onCancel: (questId: number) => void;
}

/** One quest's `QuestEntry`, as `refreshEntry` fills it. */
const questEntry = (quest: IQuestMessageData, index: number, { templates, config, t, now, onAccept, onCancel }: EntryContext): TemplateItem => {
    const { accepted } = quest;
    const sizes: EntrySizes = { campaign: templates[`${LIBRARY}/Campaign`], quest: templates[`${LIBRARY}/Quest`] };
    // `QuestMessageData.completedCampaign`.
    const completedCampaign = quest.id < 1;
    // `refreshReward(waitPeriodSeconds < 1, ...)`.
    const rewardShown = (quest.activityPointType >= 0) && (quest.rewardCurrencyAmount >= 1);
    const pictureName = `${quest.campaignCode}_${quest.localizationCode}${quest.imageVersion}${QUESTS_WITH_PROMPTS.includes(quest.localizationCode) ? '_a' : ''}`.toLowerCase();

    return {
        key: String(index),
        from: templates[`${LIBRARY}/QuestEntry`],
        bindings: {
            '': {
                visible: isEntryShown(quest, now),
                added: [
                    {
                        key: 'campaign',
                        from: sizes.campaign,
                        arrange: arrangeCampaign(sizes),
                        bindings: {
                            // `HabboQuestEngine.getCampaignName`: the key is its own fallback.
                            campaign_header_txt: { caption: t(`${campaignKey(quest)}.name`, `${campaignKey(quest)}.name`) },
                            completion_txt: { caption: `${quest.completedQuestsInCampaign}/${quest.questCountInCampaign}` },
                            // `setupCampaignImage(entry, quest, true)`.
                            campaign_pic_bitmap: { visible: true, asset: `\${image.library.questing.url}${quest.campaignCode}.png` },
                            bg: { color: accepted ? 0xffc29d3b : 0xff646464 },
                            bg_top: { color: accepted ? 0xffffd788 : 0xffbababa },
                            bg_bottom: { color: accepted ? 0xffffc758 : 0xffababab },
                            completion_bg_red_bitmap: { visible: !completedCampaign && (quest.completedQuestsInCampaign < 1) },
                            completion_bg_blue_bitmap: { visible: !completedCampaign && (quest.completedQuestsInCampaign > 0) },
                            completion_bg_green_bitmap: { visible: completedCampaign },
                        },
                    },
                    {
                        key: 'quest',
                        from: sizes.quest,
                        arrange: arrangeQuest(sizes, rewardShown),
                        bindings: {
                            '': { visible: !completedCampaign, color: accepted ? 0xf3deb8 : 0xc8c8c8 },
                            // `refreshEntryQuestDetails`: `getQuestRowTitle`, `getQuestDesc`.
                            quest_header: { color: accepted ? 0xedb23a : 0x8d8d8d },
                            quest_header_txt: { caption: t(`${questKey(quest)}.name`, `${questKey(quest)}.name`), color: accepted ? 0xffffff : 0x373737 },
                            desc_txt: { caption: t(`${questKey(quest)}.desc`, `${questKey(quest)}.desc`) },
                            timeleft_txt: {
                                visible: quest.isSeasonal,
                                caption: quest.isSeasonal ? GetFriendlyTime(t, secondsLeft(quest, now), '.short', 3) : undefined,
                                color: accepted ? 0xffffff : 0x373737,
                            },
                            // `initHourglassIcon`: the library's `icon_hourglass_png`.
                            hourglass_icon: { visible: quest.isSeasonal, asset: `${LIBRARY}-icon_hourglass` },
                            cancel_txt: { visible: accepted },
                            cancel_region: { visible: accepted, onPointerTap: () => onCancel(quest.id) },
                            accept_button: { visible: !accepted, onPointerTap: () => onAccept(quest.id) },
                            // `HabboQuestEngine.setupQuestImage`.
                            quest_pic_bitmap: { asset: `\${image.library.questing.url}${pictureName}.png` },
                            // `HabboQuestEngine.refreshReward` and `setupRewardImage`.
                            reward_caption_txt: { visible: rewardShown },
                            reward_amount_txt: { visible: rewardShown, caption: String(quest.rewardCurrencyAmount) },
                            currency_icon: { visible: rewardShown, style: rewardShown ? String(getCurrencyIconStyle(quest.activityPointType, config, true)) : undefined },
                            hint_txt: { visible: false },
                            link_region: { visible: false },
                            delay_desc_txt: { visible: false },
                            delay_txt: { visible: false },
                        },
                    },
                    { key: 'completed', from: templates[`${LIBRARY}/CampaignCompleted`], arrange: arrangeCompleted(sizes), bindings: { '': { visible: completedCampaign } } },
                    {
                        key: 'arrows',
                        from: templates[`${LIBRARY}/EntryArrows`],
                        arrange: arrangeArrows(sizes),
                        bindings: {
                            arrow_0: { visible: !accepted },
                            arrow_1: { visible: accepted },
                        },
                    },
                ],
            },
        },
        arrange: arrangeEntry(sizes),
    };
};

export const QuestsView = ({ onClose }: { onClose: () => void }) => {
    const t = useTranslation();
    const config = useConfigData();
    const quests = useQuestsStore(x => x.quests);
    const hasClub = useOwnHasClub();
    const templates = useTemplateLibrary(LIBRARY);
    const { showWindow } = useSystemActions();
    const { send } = useWebSocketContext();
    const viewport = useViewportSize();
    const [ now, setNow ] = useState(() => Date.now());
    const rejected = useRef(new Set<number>());
    // `prepareWindow`: `_window.center()`, once.
    const frame = useTemplateFrame({ id: 'quests', defaultPosition: { x: Math.round((viewport.width - WINDOW_WIDTH) / 2), y: Math.round((viewport.height - WINDOW_HEIGHT) / 2) }, onClose });

    // `update`: `refresh(true)` every second while the window is up.
    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), REFRESH_MS);

        return () => clearInterval(interval);
    }, []);

    // `refreshEntry`: a seasonal quest whose time ran out is rejected if it was taken.
    useEffect(() => {
        for (const quest of quests) {
            if (!quest.isSeasonal || !quest.accepted || isEntryShown(quest, now) || rejected.current.has(quest.id)) continue;

            rejected.current.add(quest.id);
            rejectQuest(send, quest.id);
        }
    }, [ quests, now, send ]);

    if (!templates) return null;

    const context: EntryContext = { templates, config, t, now, onAccept: id => acceptQuest(send, id), onCancel: id => rejectQuest(send, id) };

    return (
        <TemplateWindow
            id={`${LIBRARY}/Quests`}
            frame={frame}
            bindings={{
                quest_list: { spacing: QUEST_LIST_SPACING, items: quests.map((quest, index) => questEntry(quest, index, context)) },
                // `setupHcDoubleDucketsInfo`.
                hc_info_text: {
                    caption: hasClub
                        ? t('hc.has.double_duckets.info', 'You get double duckets as you are an HC member!')
                        : t('hc.get.double_duckets.info', 'Get HC membership to gain double duckets!'),
                },
                // `onClickGetHc`: `openCatalogPage("hc_membership", "NORMAL")`.
                get_hc_btn: { visible: !hasClub, onPointerTap: () => showWindow('catalog', { pageName: 'hc_membership' }) },
            }}
        />
    );
};

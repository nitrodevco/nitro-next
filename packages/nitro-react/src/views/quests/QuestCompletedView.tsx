/**
 * The quest completed dialog: AS3 `quest/QuestCompleted` over the
 * `habbo-quest-engine-com/QuestCompletedDialog` template, filled as `prepare` fills it. The last quest
 * of a campaign gets the campaign's title, caption, picture and "more quests"; any other the next
 * quest button, the reward icon and, with a reward, the catalogue link. Its twinkle animation and
 * the description's growing height (`setDesc`) are not ported.
 */
import type { IQuestMessageData } from '@nitrodevco/nitro-packets';

import { moreQuests, nextQuest } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigData, useSystemActions, useTranslation } from '#base/context/system';
import { TemplateWindow, useTemplateFrame } from '#base/theme';
import { configReader } from '#base/utils';

const LIBRARY = 'habbo-quest-engine-com';

/** `QuestMessageData.lastQuestInCampaign`. */
const isLastQuestInCampaign = (quest: IQuestMessageData) => quest.completedQuestsInCampaign >= quest.questCountInCampaign;

export const QuestCompletedView = ({ quest }: { quest: IQuestMessageData }) => {
    const t = useTranslation();
    const config = useConfigData();
    const { send } = useWebSocketContext();
    const { showWindow } = useSystemActions();
    // `close` tag: `onNextQuest`.
    const frame = useTemplateFrame({ id: 'quest_completed', centered: true, onClose: () => nextQuest(send) });

    const last = isLastQuestInCampaign(quest);
    const campaignNameKey = `quests.${quest.campaignCode}.name`;
    const category = t(campaignNameKey, campaignNameKey);
    // `getActivityPointName`: the currency's text key, then its text.
    const currencyKey = configReader(config).configString(`activitypoint.name.${quest.activityPointType}`);
    const currencyname = t(currencyKey, currencyKey);
    const titleKey = last ? 'quests.completed.campaign.title' : 'quests.completed.quest.title';
    const descKey = `quests.${quest.campaignCode}.${quest.localizationCode}.completed`;

    return (
        <TemplateWindow
            id={`${LIBRARY}/QuestCompletedDialog`}
            frame={frame}
            bindings={{
                '': { caption: t(titleKey, titleKey, { category }) },
                catalog_link_txt: { caption: t('quests.completed.cataloglink', '', { currencyname }) },
                reward_txt: {
                    caption: t('quests.completed.reward', 'quests.completed.reward', { amount: String(quest.rewardCurrencyAmount), currencyname }),
                    visible: (quest.activityPointType >= 0) && (quest.rewardCurrencyAmount > 0),
                },
                congrats_txt: { caption: t(last ? 'quests.completed.campaign.caption' : 'quests.completed.quest.caption') },
                more_quests_button: { visible: last, onPointerTap: () => moreQuests(send) },
                next_quest_button: { visible: !last, onPointerTap: () => nextQuest(send) },
                // `onCatalogLink` -> `HabboQuestEngine.openCatalog`: the quest's page, else the catalogue.
                catalog_link_region: {
                    visible: !last && (quest.rewardCurrencyAmount > 0),
                    onPointerTap: () => showWindow('catalog', quest.catalogPageName ? { pageName: quest.catalogPageName } : undefined),
                },
                reward_icon: { visible: !last },
                campaign_reward_icon: { visible: last },
                // `setupCampaignImage(window, quest, last)`.
                campaign_pic_bitmap: { visible: last, asset: last ? `\${image.library.questing.url}${quest.campaignCode}.png` : undefined },
                desc_txt: { caption: t(descKey, descKey) },
            }}
        />
    );
};

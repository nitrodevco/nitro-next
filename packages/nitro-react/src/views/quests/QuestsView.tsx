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
import { useEffect, useRef, useState } from 'react';

import { acceptQuest, rejectQuest } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useQuestsStore } from '#base/context/quests';
import { useConfigData, useSystemActions, useTranslation } from '#base/context/system';
import { useOwnHasClub } from '#base/context/user';
import { useViewportSize } from '#base/hooks';
import { TemplateWindow, useTemplateFrame, useTemplateLibrary } from '#base/theme';

import { EntryContext, isEntryShown, QUEST_LIBRARY, questEntry } from './questEntries';

const LIBRARY = QUEST_LIBRARY;

/** The `Quests` layout's size, which `_window.center()` centres. */
const WINDOW_WIDTH = 512;
const WINDOW_HEIGHT = 448;
/** `prepareWindow`: `quest_list`'s spacing. */
const QUEST_LIST_SPACING = 10;
/** `update`: `_msecsToRefresh`. */
const REFRESH_MS = 1000;

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

/**
 * `DailyQuestWidget`: the daily quest offered, from `daily_quest`, with the `QuestDailyMessage`
 * `registerHotelViewHandlers` asked for (`refresh`: the first easy quest).
 *
 * `refreshContent` once a quest message has arrived - before that the layout shows as built:
 *
 * - The caption and info are the quest chain's own texts (`quests.<campaign>.<chain>.chaincaption`
 *   / `.chaininfo`), or the "all done" texts when the server has no quest left.
 * - An offered quest shows the accept button, and the "another quest" link while its difficulty has
 *   more than one; quests of both difficulties show the easy / hard row, the other difficulty
 *   underlined as a link. An accepted quest shows the task (`landing.view.quest.currenttask` with
 *   the quest's name), its go button - a random promoted room of `landing.view.roomcategory`
 *   (`HabboLandingView.goToRoom`) - and the cancel link.
 * - The title says whether the quest is accepted; the header line runs from it to the difficulty
 *   row, or to where the layout ended it.
 *
 * "Another quest" asks for the next quest of the same difficulty, and a difficulty for the quest at
 * the same place in its list (`_index`, back to 0 on each `refresh`: the widget mounts with the
 * reception). Accept sends `ActivateQuestMessageComposer`, cancel `CancelQuestMessageComposer`; the
 * widget changes only with the next quest message.
 *
 * `GenericWidget.configureLayout` places it in its slot as it does a generic widget, from the
 * `layout` of the slot - or of the configuration code a container chose. In the bottom slot it is
 * `WidgetContainerLayout`'s fixed widget, which has no slot (`landing.view.dynamic.slot.0.layout`).
 * The widget has no `ISettingsAwareWidget`, so the hotel's text colours do not reach it.
 */
import { useState } from 'react';

import { activateDailyQuest, cancelDailyQuest, goToPromotedRoom, requestDailyQuest } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { dailyQuestChainText, HOTEL_VIEW_BOTTOM_SLOT, hotelViewGenericConf, hotelViewPaneWidths, isWideHotelViewSlot, parseHotelViewGenericLayout, useConfigData, useSystemStore } from '#base/context/system';
import { TemplateBindings, TemplateWindow, TemplateWindows } from '#base/theme';

import { arrangeDailyQuestDifficulty, arrangeDailyQuestHeader, dailyQuestBindings, dailyQuestDifficultyVisible, dailyQuestParameters } from './hotelViewDailyQuest';
import { configureHotelViewLayout, hotelViewLayoutBitmap, hotelViewTemplateId, positionAfterAndStretch } from './hotelViewTemplate';

export interface HotelViewDailyQuestWidgetProps {
    slot: number;
    /** The configuration code a `WidgetContainerWidget` chose, or null. */
    code: string | null;
}

export const HotelViewDailyQuestWidget = ({ slot, code }: HotelViewDailyQuestWidgetProps) => {
    const config = useConfigData();
    const { send } = useWebSocketContext();
    const daily = useSystemStore(x => x.hotelViewDailyQuest);
    const [ index, setIndex ] = useState(0);
    // A fixed widget is never given a slot: `_-Ve` stays 0.
    const layoutSlot = (slot === HOTEL_VIEW_BOTTOM_SLOT) ? 0 : slot;
    const wide = isWideHotelViewSlot(layoutSlot);
    const panes = hotelViewPaneWidths(config);
    const layout = parseHotelViewGenericLayout(hotelViewGenericConf(config, layoutSlot, code, 'layout'));
    const quest = daily?.quest ?? null;

    const bindings: TemplateBindings = {
        ...dailyQuestBindings(daily, {
            accept: questId => activateDailyQuest(send, questId),
            next: (easy) => {
                setIndex(index + 1);
                requestDailyQuest(send, easy, index + 1);
            },
            cancel: () => cancelDailyQuest(send),
            go: () => goToPromotedRoom(send, undefined),
            difficulty: easy => requestDailyQuest(send, easy, index),
        }),
        bitmap: { asset: hotelViewLayoutBitmap(layout) },
    };

    if (daily) {
        bindings.info_txt = { caption: quest ? dailyQuestChainText(quest, 'chaininfo') : '${landing.view.quest.currenttask.alldone.info}' };
        bindings.title_txt = { caption: `\${landing.view.quest.title.${quest?.accepted ? 'accepted' : 'notaccepted'}}` };
    }

    const arrange = (windows: TemplateWindows) => {
        // `initialize`: where the header line ends, before `configureLayout`.
        const line = windows.find('hdr_line');
        const lineEnd = line ? (line.x + line.width) : 0;

        configureHotelViewLayout(windows, layout, wide, wide ? panes.left : panes.right);

        if (!daily) return;

        positionAfterAndStretch(windows, 'title_txt', 'hdr_line');
        arrangeDailyQuestHeader(windows, arrangeDailyQuestDifficulty(windows), dailyQuestDifficultyVisible(daily), lineEnd);
    };

    return (
        <TemplateWindow
            id={hotelViewTemplateId('daily_quest')}
            bindings={bindings}
            arrange={arrange}
            parameters={dailyQuestParameters(daily)}
        />
    );
};

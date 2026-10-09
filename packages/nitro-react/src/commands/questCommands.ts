/**
 * What the quest list does - Flash's `quest/QuestsList` and the `HabboQuestEngine` calls it makes:
 * `onToolbarClick` (and `showQuests` over it), `onQuests`, `onAcceptQuest` and `onCancelQuest`.
 */
import { AcceptQuestComposer, GetQuestsComposer, IQuestMessageData, OpenQuestTrackerComposer, RejectQuestComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { questsStore } from '#base/context/quests';
import { systemStore } from '#base/context/system';
import { configReader } from '#base/utils';

type Send = WebSocketConnection['send'];

/** `HabboQuestEngine.requestQuests`. */
export const requestQuests = (send: Send) => send(new GetQuestsComposer({}));

/**
 * `QuestsList.onToolbarClick` (`QuestController.onToolbarClick` with the seasonal calendar off): the
 * next `QuestsMessage` opens the window, and the quests are asked for - or, with the window up, it
 * closes (`WindowToggle.toggle` on a visible window; the port has no window stacking to bring a
 * covered one to the front instead).
 */
export const toggleQuests = (send: Send) => {
    const { visibleWindows, hideWindow } = systemStore.getState();

    if (visibleWindows.quests) {
        hideWindow('quests');

        return;
    }

    questsStore.getState().setOpenOnQuests(true);
    requestQuests(send);
};

/** `HabboQuestEngine.showQuests`: the progression menu's quests item, for a window not already up. */
export const showQuests = (send: Send) => {
    if (!systemStore.getState().visibleWindows.quests) toggleQuests(send);
};

/** `HabboQuestEngine.isSeasonalQuest`: a campaign under `seasonalQuestCalendar.campaignPrefix`. */
export const isSeasonalCalendarQuest = (quest: IQuestMessageData): boolean => {
    const prefix = configReader(systemStore.getState().config).configString('seasonalQuestCalendar.campaignPrefix');

    return (prefix !== '') && (quest.campaignCode.indexOf(prefix) === 0);
};

/**
 * `QuestsList.onQuests`: the quests but the seasonal calendar's are kept, and the window opens when it
 * is up or was asked for (`setOpenOnQuestsEvent`, cleared by every answer).
 */
export const onQuests = (quests: IQuestMessageData[]) => {
    const { openOnQuests, setOpenOnQuests, setQuests } = questsStore.getState();
    const { visibleWindows, showWindow } = systemStore.getState();

    setOpenOnQuests(false);
    setQuests(quests.filter(quest => !isSeasonalCalendarQuest(quest)));

    if (!visibleWindows.quests && !openOnQuests) return;

    showWindow('quests');
};

/** `QuestsList.onAcceptQuest`: the entry's `accept_button` (its `id` the quest's). */
export const acceptQuest = (send: Send, questId: number) => send(new AcceptQuestComposer({ questId }));

/** `QuestsList.onCancelQuest`: the entry's `cancel_region`; also an expired seasonal quest still accepted (`refreshEntry`). */
export const rejectQuest = (send: Send, questId: number) => send(new RejectQuestComposer({ questId }));

/** `QuestCompleted`'s `_SafeStr_V16`: `update` shows the prepared dialog this long after `onQuestCompleted`. */
const COMPLETED_DIALOG_DELAY_MS = 2000;

let completedDialogTimer: ReturnType<typeof setTimeout> | undefined;

/** `QuestCompleted.close`, which `onQuest` and `onQuestCancelled` call: the dialog goes. */
export const closeQuestCompleted = () => {
    clearTimeout(completedDialogTimer);
    completedDialogTimer = undefined;
    questsStore.getState().setCompleted(null);
};

/** `QuestCompleted.onQuestCompleted`: with `showDialog`, the dialog for the quest, two seconds on. */
export const onQuestCompleted = (quest: IQuestMessageData, showDialog: boolean) => {
    if (!showDialog) return;

    clearTimeout(completedDialogTimer);
    completedDialogTimer = setTimeout(() => {
        completedDialogTimer = undefined;
        questsStore.getState().setCompleted(quest);
    }, COMPLETED_DIALOG_DELAY_MS);
};

/** `QuestCompleted.onNextQuest` (its `close` tag too): the dialog goes and the tracker is asked for. */
export const nextQuest = (send: Send) => {
    closeQuestCompleted();
    send(new OpenQuestTrackerComposer({}));
};

/** `QuestCompleted.onMoreQuests`: the dialog goes and the quest list opens on the next `QuestsMessage`. */
export const moreQuests = (send: Send) => {
    closeQuestCompleted();
    questsStore.getState().setOpenOnQuests(true);
    requestQuests(send);
};

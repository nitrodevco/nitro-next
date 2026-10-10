/**
 * What the quest list does - Flash's `quest/QuestsList` and the `HabboQuestEngine` calls it makes:
 * `onToolbarClick` (and `showQuests` over it), `onQuests`, `onAcceptQuest` and `onCancelQuest`.
 */
import { AcceptQuestComposer, ActivateQuestComposer, GetQuestsComposer, IQuestMessageData, OpenQuestTrackerComposer, RejectQuestComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { questsStore } from '#base/context/quests';
import { roomStore } from '#base/context/room';
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

/* ---- QuestTracker and QuestDetails, as QuestController hands the packets to them ---- */

/** Flash runs `update` once a frame at its 24 fps: `QuestTracker.update`'s completed tick plays one `_SafeStr_N17` frame per update. */
export const TRACKER_FRAME_MS = 1000 / 24;
/** `QuestTracker._SafeStr_N17`: the `success_pic_N` frames the completed tick shows, one per update. */
export const TRACKER_SUCCESS_FRAMES = [ 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 4 ];
/** `COMPLETION_CLOSE_DELAY_IN_MSECS`: `CLOSE_WAIT` after the tick. */
const COMPLETION_CLOSE_DELAY_MS = 1000;
/** `onNewQuestNotReceived`'s `setTimeout`: how long `OpenQuestTracker` may take to bring the next `Quest` before the tracker hides. */
const NEXT_QUEST_WAIT_MS = 600;

const trackerTimers = new Map<string, ReturnType<typeof setTimeout>>();

const clearTrackerTimer = (chainCode: string) => {
    const timer = trackerTimers.get(chainCode);

    if (timer !== undefined) clearTimeout(timer);

    trackerTimers.delete(chainCode);
};

const hideTracker = (chainCode: string) => {
    clearTrackerTimer(chainCode);
    questsStore.getState().setTracker(chainCode, null);
};

/** `QuestDetails.close`. */
export const closeQuestDetails = () => questsStore.getState().setDetails(null);

/**
 * `QuestController.onQuest`: the chain's tracker shows the quest (`QuestTracker.onQuest`; a quest
 * with a wait period hides it instead, but the packet carries none), the details open for it when
 * `openForNextQuest` was set and close when they were up for nothing (`QuestDetails.onQuest`), and
 * the completed dialog goes (`QuestCompleted.onQuest`).
 */
export const onQuestMessage = (quest: IQuestMessageData) => {
    const { setTracker, openForNextQuest, setOpenForNextQuest, details, setDetails } = questsStore.getState();

    clearTrackerTimer(quest.chainCode);
    setTracker(quest.chainCode, { quest, phase: 'shown', completedAt: 0 });

    if (openForNextQuest) {
        setOpenForNextQuest(false);
        setDetails(quest);
    } else if (!details) {
        closeQuestDetails();
    }

    closeQuestCompleted();
};

/**
 * `QuestController.onQuestCompleted`: the chain's tracker plays its tick (`QuestTracker.onQuestCompleted`,
 * `COMPLETED_ANIMATION` over `_SafeStr_N17`'s frames, then `CLOSE_WAIT` 1000 ms); with no dialog
 * coming it then asks for the next quest (`OpenQuestTracker`) and hides unless a `Quest` arrives
 * within 600 ms (`onNewQuestNotReceived`), with one it just hides. The details close when up for
 * this quest (`QuestDetails.onQuestCompleted`), and the dialog is prepared (`QuestCompleted`).
 */
export const onQuestCompletedMessage = (send: Send, quest: IQuestMessageData, showDialog: boolean) => {
    const { trackers, setTracker, details } = questsStore.getState();
    const chainCode = quest.chainCode;

    if (trackers[chainCode]) {
        clearTrackerTimer(chainCode);
        setTracker(chainCode, { quest, phase: 'completed', completedAt: Date.now() });
        trackerTimers.set(chainCode, setTimeout(() => {
            if (showDialog) {
                hideTracker(chainCode);

                return;
            }

            send(new OpenQuestTrackerComposer({}));
            trackerTimers.set(chainCode, setTimeout(() => hideTracker(chainCode), NEXT_QUEST_WAIT_MS));
        }, (TRACKER_SUCCESS_FRAMES.length * TRACKER_FRAME_MS) + COMPLETION_CLOSE_DELAY_MS));
    }

    if (!details || (details.id === quest.id)) closeQuestDetails();

    onQuestCompleted(quest, showDialog);
};

/** `QuestController.onQuestCancelled`: the chain's tracker slides out, the details close for its campaign, the dialog goes. */
export const onQuestCancelledMessage = (chainCode: string) => {
    const { details } = questsStore.getState();

    hideTracker(chainCode);

    if (!details || (details.chainCode === chainCode)) closeQuestDetails();

    closeQuestCompleted();
};

/** `QuestController.onRoomExit` (`CloseConnection`): the details close; the trackers' Details link hides with the room (drawn from the room state). */
export const onQuestRoomExit = () => closeQuestDetails();

/** `QuestTracker.onMoreInfo` -> `QuestDetails.showDetails`: the details for the quest, or closed when up for it already. */
export const toggleQuestDetails = (quest: IQuestMessageData) => {
    const { details, setDetails } = questsStore.getState();

    if (details && (details.id === quest.id)) {
        setDetails(null);

        return;
    }

    setDetails(quest);
};

/** `QuestDetails.onAcceptQuest`: `AcceptQuest` in a room, `ActivateQuest` outside one; the window closes. */
export const acceptQuestFromDetails = (send: Send, quest: IQuestMessageData) => {
    if (roomStore.getState().room) send(new AcceptQuestComposer({ questId: quest.id }));
    else send(new ActivateQuestComposer({ questId: quest.id }));

    closeQuestDetails();
};

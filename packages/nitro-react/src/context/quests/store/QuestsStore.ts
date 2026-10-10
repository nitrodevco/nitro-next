/**
 * The quest list - Flash's `quest/QuestsList`, which `QuestController` builds for the session: the
 * quests of the last `QuestsMessage` (`onQuests`, the seasonal calendar's campaign left out) and
 * whether the next one should open the window (`setOpenOnQuestsEvent`, `_SafeStr_Cg`). An app-wide
 * singleton, as the packets arrive whether the window is up or not. Also `QuestController`'s
 * trackers (`QuestTracker`, one per campaign chain, `_questTrackers`), its details window
 * (`QuestDetails`) and the completed dialog (`QuestCompleted`).
 */
import type { IQuestMessageData } from '@nitrodevco/nitro-packets';
import { createStore } from 'zustand';

/** `QuestTracker._trackerAnimationStatus`: shown (`NONE`), or playing the completed tick (`COMPLETED_ANIMATION`, then `CLOSE_WAIT`). */
export type QuestTrackerPhase = 'shown' | 'completed';

export interface QuestTrackerState {
    quest: IQuestMessageData;
    phase: QuestTrackerPhase;
    /** `Date.now()` when `onQuestCompleted` started the tick frames. */
    completedAt: number;
}

interface QuestsState {
    quests: IQuestMessageData[];
    /** `setOpenOnQuestsEvent`: the next `QuestsMessage` opens the window. */
    openOnQuests: boolean;
    /** `QuestCompleted`: the quest its dialog is up for, if it is. */
    completed: IQuestMessageData | null;
    /** `QuestController._questTrackers`: the visible trackers by `campaignChainCode`. */
    trackers: Record<string, QuestTrackerState>;
    /** `QuestDetails.quest` while its window is up. */
    details: IQuestMessageData | null;
    /** `QuestDetails.openForNextQuest`: the next `Quest` opens the details. */
    openForNextQuest: boolean;
}

interface QuestsActions {
    reset: () => void;
    setQuests: (quests: IQuestMessageData[]) => void;
    setOpenOnQuests: (openOnQuests: boolean) => void;
    setCompleted: (completed: IQuestMessageData | null) => void;
    setTracker: (chainCode: string, tracker: QuestTrackerState | null) => void;
    setDetails: (details: IQuestMessageData | null) => void;
    setOpenForNextQuest: (openForNextQuest: boolean) => void;
}

export type QuestsStore = QuestsState & QuestsActions;

const initialState: QuestsState = { quests: [], openOnQuests: false, completed: null, trackers: {}, details: null, openForNextQuest: false };

export const createQuestsStore = () => createStore<QuestsStore>()(set => ({
    ...initialState,
    reset: () => set(initialState),
    setQuests: quests => set({ quests }),
    setOpenOnQuests: openOnQuests => set({ openOnQuests }),
    setCompleted: completed => set({ completed }),
    setTracker: (chainCode, tracker) => set((state) => {
        const trackers = { ...state.trackers };

        if (tracker) trackers[chainCode] = tracker;
        else delete trackers[chainCode];

        return { trackers };
    }),
    setDetails: details => set({ details }),
    setOpenForNextQuest: openForNextQuest => set({ openForNextQuest }),
}));

export const questsStore = createQuestsStore();

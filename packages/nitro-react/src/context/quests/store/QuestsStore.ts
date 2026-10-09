/**
 * The quest list - Flash's `quest/QuestsList`, which `QuestController` builds for the session: the
 * quests of the last `QuestsMessage` (`onQuests`, the seasonal calendar's campaign left out) and
 * whether the next one should open the window (`setOpenOnQuestsEvent`, `_SafeStr_Cg`). An app-wide
 * singleton, as the packets arrive whether the window is up or not.
 */
import type { IQuestMessageData } from '@nitrodevco/nitro-packets';
import { createStore } from 'zustand';

interface QuestsState {
    quests: IQuestMessageData[];
    /** `setOpenOnQuestsEvent`: the next `QuestsMessage` opens the window. */
    openOnQuests: boolean;
    /** `QuestCompleted`: the quest its dialog is up for, if it is. */
    completed: IQuestMessageData | null;
}

interface QuestsActions {
    reset: () => void;
    setQuests: (quests: IQuestMessageData[]) => void;
    setOpenOnQuests: (openOnQuests: boolean) => void;
    setCompleted: (completed: IQuestMessageData | null) => void;
}

export type QuestsStore = QuestsState & QuestsActions;

const initialState: QuestsState = { quests: [], openOnQuests: false, completed: null };

export const createQuestsStore = () => createStore<QuestsStore>()(set => ({
    ...initialState,
    reset: () => set(initialState),
    setQuests: quests => set({ quests }),
    setOpenOnQuests: openOnQuests => set({ openOnQuests }),
    setCompleted: completed => set({ completed }),
}));

export const questsStore = createQuestsStore();

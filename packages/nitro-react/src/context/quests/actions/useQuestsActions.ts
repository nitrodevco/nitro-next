/**
 * The quests store's actions. Zustand actions are created once and never change, so they are read
 * off the store a single time here rather than subscribed to: a component using these re-renders
 * for nothing.
 */
import { questsStore } from '../store';

const state = questsStore.getState();

const actions = {
    reset: state.reset,
    setQuests: state.setQuests,
    setOpenOnQuests: state.setOpenOnQuests,
    setCompleted: state.setCompleted,
    setTracker: state.setTracker,
    setDetails: state.setDetails,
    setOpenForNextQuest: state.setOpenForNextQuest,
};

export const useQuestsActions = () => actions;

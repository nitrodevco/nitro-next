import { chatHistoryStore } from '../store/ChatHistoryStore';

const state = chatHistoryStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    toggleOpen: state.toggleOpen,
    setOpen: state.setOpen,
};

export const useChatHistoryActions = () => actions;

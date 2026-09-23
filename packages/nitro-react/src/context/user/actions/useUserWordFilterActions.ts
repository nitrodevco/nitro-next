import { userStore } from '../store/UserStore';

const state = userStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    setSelectedWordIndex: state.setSelectedWordIndex,
};

export const useUserWordFilterActions = () => actions;

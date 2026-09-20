import { wiredStore } from '../store/WiredStore';

const state = wiredStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    setWiredEnvironment: state.setWiredEnvironment,
    setHasClickUserWired: state.setHasClickUserWired,
    setClickSettings: state.setClickSettings,
    setClickSettingsIgnored: state.setClickSettingsIgnored,
    setUserClickHandled: state.setUserClickHandled,
};

export const useWiredEnvironmentActions = () => actions;

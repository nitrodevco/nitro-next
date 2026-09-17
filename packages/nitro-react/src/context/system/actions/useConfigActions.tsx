import { systemStore } from '../store/SystemStore';

const state = systemStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    setConfig: state.setConfig,
    setConfigValue: state.setConfigValue,
};

export const useConfigActions = () => actions;

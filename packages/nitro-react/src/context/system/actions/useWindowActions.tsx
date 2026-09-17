import { systemStore } from '../store/SystemStore';

const state = systemStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    toggleWindow: state.toggleWindow,
    showWindow: state.showWindow,
    hideWindow: state.hideWindow,
    updateWindowParams: state.updateWindowParams,
    bringWindowToFront: state.bringWindowToFront,
};

export const useWindowActions = () => actions;

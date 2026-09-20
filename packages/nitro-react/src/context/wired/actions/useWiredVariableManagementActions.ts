import { wiredStore } from '../store/WiredStore';

const state = wiredStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    patchWiredVariableManagement: state.patchWiredVariableManagement,
};

export const useWiredVariableManagementActions = () => actions;

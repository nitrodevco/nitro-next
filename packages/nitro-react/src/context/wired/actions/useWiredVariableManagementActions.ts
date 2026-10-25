/**
 * `WiredVariableManagementSlice`'s action: patching the two variable management windows.
 * Read off the store once: a component using these re-renders for nothing.
 */
import { wiredStore } from '../store/WiredStore';

const state = wiredStore.getState();

const actions = {
    patchWiredVariableManagement: state.patchWiredVariableManagement,
};

export const useWiredVariableManagementActions = () => actions;

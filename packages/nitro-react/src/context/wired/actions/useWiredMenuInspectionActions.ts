/**
 * `WiredMenuInspectionSlice`'s action: patching the wired menu's inspection tab. Read off the store
 * once: a component using these re-renders for nothing.
 */
import { wiredStore } from '../store/WiredStore';

const state = wiredStore.getState();

const actions = {
    patchWiredInspection: state.patchWiredInspection,
};

export const useWiredMenuInspectionActions = () => actions;

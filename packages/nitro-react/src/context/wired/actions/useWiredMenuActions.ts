/**
 * `WiredMenuSlice`'s actions: patching or resetting the wired menu's state. Read off the store
 * once: a component using these re-renders for nothing.
 */
import { wiredStore } from '../store/WiredStore';

const state = wiredStore.getState();

const actions = {
    patchWiredMenu: state.patchWiredMenu,
    resetWiredMenu: state.resetWiredMenu,
};

export const useWiredMenuActions = () => actions;

/**
 * `WiredLinkSlice`'s action: patching the WIRED Link window's state. Read off the store once: a
 * component using these re-renders for nothing.
 */
import { wiredStore } from '../store/WiredStore';

const state = wiredStore.getState();

const actions = {
    patchWiredLink: state.patchWiredLink,
};

export const useWiredLinkActions = () => actions;

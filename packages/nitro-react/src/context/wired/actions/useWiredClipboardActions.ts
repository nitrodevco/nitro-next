/**
 * `WiredClipboardSlice`'s action: copying a wired box's settings to the clipboard. Read off the
 * store once: a component using these re-renders for nothing.
 */
import { wiredStore } from '../store/WiredStore';

const state = wiredStore.getState();

const actions = {
    setClipboardEntry: state.setClipboardEntry,
};

export const useWiredClipboardActions = () => actions;

/**
 * `WiredMenuOverviewSlice`'s action: patching the wired menu's variable overview tab. Read off the
 * store once: a component using these re-renders for nothing.
 */
import { wiredStore } from '../store/WiredStore';

const state = wiredStore.getState();

const actions = {
    patchWiredOverview: state.patchWiredOverview,
};

export const useWiredMenuOverviewActions = () => actions;

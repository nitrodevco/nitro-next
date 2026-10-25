/**
 * `WiredVariablesSlice`'s actions - `WiredVariablesSynchronizer`'s cache and request state.
 * Read off the store once: a component using these re-renders for nothing.
 */
import { wiredStore } from '../store/WiredStore';

const state = wiredStore.getState();

const actions = {
    setVariablesStatus: state.setVariablesStatus,
    setVariablesRequestedAt: state.setVariablesRequestedAt,
    setAllVariablesHash: state.setAllVariablesHash,
    setVariablesCache: state.setVariablesCache,
    setVariablesListeners: state.setVariablesListeners,
};

export const useWiredVariablesActions = () => actions;

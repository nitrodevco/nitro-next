import { habbiconsStore } from '../store/HabbiconsStore';

const state = habbiconsStore.getState();

/**
 * The hub window's own actions - its tab and its set. Read off the store once: a component using
 * these re-renders for nothing.
 */
const actions = {
    setHubTab: state.setHubTab,
    setHubCollectionId: state.setHubCollectionId,
};

export const useHabbiconHubActions = () => actions;

/** The client modules store's actions, read once: a module's window is closed through them. */
import { clientModulesStore } from '../store';

const state = clientModulesStore.getState();

const actions = {
    openWindow: state.openWindow,
    closeWindow: state.closeWindow,
};

export const useClientModulesActions = () => actions;

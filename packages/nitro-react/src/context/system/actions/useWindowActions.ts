import { systemStore } from '../store/SystemStore';

const state = systemStore.getState();

/**
 * The window manager's actions: the windows the registry names, and the client-wide dialogs
 * (`SystemDialogsSlice` - `alert`, `confirm`, `simpleAlert`).
 *
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    toggleWindow: state.toggleWindow,
    showWindow: state.showWindow,
    hideWindow: state.hideWindow,
    updateWindowParams: state.updateWindowParams,
    bringWindowToFront: state.bringWindowToFront,
    showAlert: state.showAlert,
    showConfirm: state.showConfirm,
    showSimpleAlert: state.showSimpleAlert,
    closeDialog: state.closeDialog,
};

export const useWindowActions = () => actions;

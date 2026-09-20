import { wiredStore } from '../store/WiredStore';

const state = wiredStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    openSetup: state.openSetup,
    closeSetup: state.closeSetup,
    patchSetup: state.patchSetup,
    patchSetupTriggerable: state.patchSetupTriggerable,
    setSetupForm: state.setSetupForm,
    setUpdateMode: state.setUpdateMode,
    setPendingVariablesListener: state.setPendingVariablesListener,
    setNonOwnerConfirmed: state.setNonOwnerConfirmed,
    setSetupPosition: state.setSetupPosition,
    setGuildMemberships: state.setGuildMemberships,
};

export const useWiredSetupActions = () => actions;

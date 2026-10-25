/**
 * `WiredSetupSlice`'s actions - the wired box being edited, as `UserDefinedRoomEventsCtrl` kept it:
 * opening and closing it, its form, update mode, position and pending listeners. Read off the store
 * once: a component using these re-renders for nothing.
 */
import { wiredStore } from '../store/WiredStore';

const state = wiredStore.getState();

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

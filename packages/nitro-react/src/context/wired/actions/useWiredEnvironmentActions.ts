/**
 * `WiredEnvironmentSlice`'s actions - Flash's `WiredEnvironment`: the click user trigger, the click
 * settings and the server's answer to a reported click. Read off the store once: a component using
 * these re-renders for nothing.
 */
import { wiredStore } from '../store/WiredStore';

const state = wiredStore.getState();

const actions = {
    setWiredEnvironment: state.setWiredEnvironment,
    setHasClickUserWired: state.setHasClickUserWired,
    setClickSettings: state.setClickSettings,
    setClickSettingsIgnored: state.setClickSettingsIgnored,
    setUserClickHandled: state.setUserClickHandled,
};

export const useWiredEnvironmentActions = () => actions;

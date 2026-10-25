/**
 * `WiredPreferencesSlice`'s actions: the account's wired preferences, its preferred box style and
 * the room's wired permissions. Read off the store once: a component using these re-renders for
 * nothing.
 */
import { wiredStore } from '../store/WiredStore';

const state = wiredStore.getState();

const actions = {
    setWiredPreferences: state.setWiredPreferences,
    setPreferredWiredStyle: state.setPreferredWiredStyle,
    setWiredPermissions: state.setWiredPermissions,
};

export const useWiredPreferencesActions = () => actions;

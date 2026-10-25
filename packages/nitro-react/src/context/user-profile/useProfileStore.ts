/** Selector hook for the app-wide extended profile store. */
import { useStore } from 'zustand';

import { ProfileStore, profileStore } from './store';

/** Reads the app-wide profile model populated by its packet handlers. */
export const useProfileStore = <T>(selector: (state: ProfileStore) => T) => useStore(profileStore, selector);

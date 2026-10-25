import { useStore } from 'zustand';

import { RaidProtectionStore, raidProtectionStore } from './store/RaidProtectionStore';

/**
 * A slice of the RaidProtectionStore (`RaidProtectionSettingsController`), re-rendering only when
 * that slice changes. It reads the app-wide singleton, so it works anywhere.
 */
export function useRaidProtectionStore<T>(selector: (state: RaidProtectionStore) => T) {
    return useStore(raidProtectionStore, selector);
}

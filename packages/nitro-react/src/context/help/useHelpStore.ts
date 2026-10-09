import { useStore } from 'zustand';

import { HelpStore, helpStore } from './store/HelpStore';

/**
 * A slice of the HelpStore (`HabboHelp`'s registries and the call-for-help state), re-rendering only
 * when that slice changes. It reads the app-wide singleton, so it works anywhere.
 */
export function useHelpStore<T>(selector: (state: HelpStore) => T) {
    return useStore(helpStore, selector);
}

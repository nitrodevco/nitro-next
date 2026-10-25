import { useStore } from 'zustand';

import { GroupStore, groupStore } from './store/GroupStore';

/**
 * A slice of the GroupStore, re-rendering only when that slice changes. It reads the app-wide
 * singleton, so it works anywhere - there is no provider to be inside.
 */
export function useGroupStore<T>(selector: (state: GroupStore) => T) {
    return useStore(groupStore, selector);
}

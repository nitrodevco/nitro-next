import { useStore } from 'zustand';

import { UserStore, userStore } from './store';

/**
 * A slice of the UserStore, re-rendering only when that slice changes. It reads the app-wide
 * singleton, so it works anywhere - there is no provider to be inside.
 */
export function useUserStore<T>(selector: (state: UserStore) => T) {
    return useStore(userStore, selector);
}

import { useStore } from 'zustand';

import { NavigatorStore, navigatorStore } from './store/NavigatorStore';

/**
 * A slice of the NavigatorStore, re-rendering only when that slice changes. It reads the app-wide
 * singleton, so it works anywhere - there is no provider to be inside.
 */
export function useNavigatorStore<T>(selector: (state: NavigatorStore) => T) {
    return useStore(navigatorStore, selector);
}

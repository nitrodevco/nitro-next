import { useStore } from 'zustand';

import { MessengerStore, messengerStore } from './store';

/**
 * A slice of the MessengerStore, re-rendering only when that slice changes. It reads the app-wide
 * singleton, so it works anywhere - there is no provider to be inside.
 */
export function useMessengerStore<T>(selector: (state: MessengerStore) => T) {
    return useStore(messengerStore, selector);
}

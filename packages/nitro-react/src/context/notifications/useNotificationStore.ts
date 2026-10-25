import { useStore } from 'zustand';

import { NotificationStore, notificationStore } from './store';

/**
 * A slice of the NotificationStore, re-rendering only when that slice changes. It reads the
 * app-wide singleton, so it works anywhere - there is no provider to be inside.
 */
export function useNotificationStore<T>(selector: (state: NotificationStore) => T) {
    return useStore(notificationStore, selector);
}

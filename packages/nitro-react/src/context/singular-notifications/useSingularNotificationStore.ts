import { useStore } from 'zustand';

import { SingularNotificationStore, singularNotificationStore } from './store/SingularNotificationStore';

/**
 * A slice of the SingularNotificationStore (the MOTD windows and the club gift and safety lock
 * notifications), re-rendering only when that slice changes. It reads the app-wide singleton, so
 * it works anywhere - there is no provider to be inside. Select one field per call, never an
 * object literal.
 */
export function useSingularNotificationStore<T>(selector: (state: SingularNotificationStore) => T) {
    return useStore(singularNotificationStore, selector);
}

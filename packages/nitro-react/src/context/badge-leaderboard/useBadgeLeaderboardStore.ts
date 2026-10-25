import { useStore } from 'zustand';

import { BadgeLeaderboardStore, badgeLeaderboardStore } from './store/BadgeLeaderboardStore';

/**
 * A slice of the BadgeLeaderboardStore (`BadgeLeaderboardController`), re-rendering only when that
 * slice changes. It reads the app-wide singleton, so it works anywhere.
 */
export function useBadgeLeaderboardStore<T>(selector: (state: BadgeLeaderboardStore) => T) {
    return useStore(badgeLeaderboardStore, selector);
}

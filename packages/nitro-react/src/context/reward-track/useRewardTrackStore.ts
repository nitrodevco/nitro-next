import { useStore } from 'zustand';

import { RewardTrackStore, rewardTrackStore } from './store/RewardTrackStore';

/**
 * A slice of the RewardTrackStore (`RewardTrackController`), re-rendering only when that slice
 * changes. It reads the app-wide singleton, so it works anywhere.
 */
export function useRewardTrackStore<T>(selector: (state: RewardTrackStore) => T) {
    return useStore(rewardTrackStore, selector);
}

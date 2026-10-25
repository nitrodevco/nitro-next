import { useStore } from 'zustand';

import { DailyTasksStore, dailyTasksStore } from './store/DailyTasksStore';

/**
 * A slice of the DailyTasksStore (`DailyTasksController`), re-rendering only when that slice
 * changes. It reads the app-wide singleton, so it works anywhere.
 */
export function useDailyTasksStore<T>(selector: (state: DailyTasksStore) => T) {
    return useStore(dailyTasksStore, selector);
}

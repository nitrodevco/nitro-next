/** Reactive selectors for the session's AS3 AchievementController model. */
import { useStore } from 'zustand';

import { achievementsStore } from './store/AchievementsStore';

export const useAchievementsStore = <T>(selector: (state: ReturnType<typeof achievementsStore.getState>) => T) => useStore(achievementsStore, selector);

import { createContext } from 'react';
import type { StoreApi } from 'zustand';

import { AchievementsContextStore } from './store/AchievementsContextStore';

export const AchievementsContext = createContext<StoreApi<AchievementsContextStore> | null>(null);

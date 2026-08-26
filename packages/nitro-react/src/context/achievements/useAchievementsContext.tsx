import { useContext } from 'react';
import { useStore } from 'zustand';

import { AchievementsContext } from './AchievementsContext';
import { AchievementsContextStore } from './store/AchievementsContextStore';

export const useAchievementsContext = <T,>(selector: (state: AchievementsContextStore) => T) => {
    const store = useContext(AchievementsContext);

    if (!store) throw new Error('useAchievementsContext must be used within AchievementsContextProvider');

    return useStore(store, selector);
}

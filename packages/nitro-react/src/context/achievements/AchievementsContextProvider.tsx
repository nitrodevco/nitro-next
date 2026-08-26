import type { ReactNode } from 'react';
import { useState } from 'react';

import { AchievementsContext } from './AchievementsContext';
import { createAchievementsContextStore } from './store';

type ProviderProps = {
    children: ReactNode;
}

export const AchievementsContextProvider = ({ children }: ProviderProps) => {
    const [ctx] = useState(() => createAchievementsContextStore());

    return (
        <AchievementsContext value={ctx}>
            {children}
        </AchievementsContext>
    );
};
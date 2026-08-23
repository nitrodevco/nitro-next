import type { ReactNode } from 'react';
import { useState } from 'react';

import { FriendsContext } from './FriendsContext';
import { createFriendsContextStore } from './store';

type ProviderProps = {
    children: ReactNode;
};

export const FriendsContextProvider = ({ children }: ProviderProps) => {
    const [ ctx ] = useState(() => createFriendsContextStore());

    return (
        <FriendsContext value={ctx}>
            {children}
        </FriendsContext>
    );
};

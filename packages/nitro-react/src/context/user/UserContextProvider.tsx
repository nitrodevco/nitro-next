import type { ReactNode } from 'react';
import { useState } from 'react';

import { createUserStore } from '#base/stores';

import { UserContext } from './UserContext';

type ProviderProps = {
    children: ReactNode;
}

export const UserContextProvider = ({ children }: ProviderProps) => {
    const [userCtx] = useState(() => createUserStore());

    return (
        <UserContext value={userCtx}>
            {children}
        </UserContext>
    );
};
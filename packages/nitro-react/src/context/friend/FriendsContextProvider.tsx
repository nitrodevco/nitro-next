/**
 * The friend list's store, made once per mount of the provider (`FriendListWrapper`) and handed to
 * the friend list inside it.
 */
import { ReactNode, useState } from 'react';

import { FriendsContext } from './FriendsContext';
import { createFriendsStore } from './store';

type ProviderProps = {
    children: ReactNode;
};

export const FriendsContextProvider = ({ children }: ProviderProps) => {
    const [ ctx ] = useState(() => createFriendsStore());

    return (
        <FriendsContext value={ctx}>
            {children}
        </FriendsContext>
    );
};

import { useContext } from 'react';

import { FriendsContext } from './FriendsContext';

/** The friend list store itself, for reading actions and current state without subscribing. */
export const useFriendsStoreApi = () => {
    const store = useContext(FriendsContext);

    if (!store) throw new Error('useFriendsStoreApi must be used within FriendsContextProvider');

    return store;
};

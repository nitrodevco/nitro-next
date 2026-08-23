import { useContext } from 'react';
import { useStore } from 'zustand';

import { FriendsContext } from './FriendsContext';
import { FriendsContextStore } from './store/FriendsContextStore';

export function useFriendsContext<T>(selector: (state: FriendsContextStore) => T) {
    const store = useContext(FriendsContext);

    if (!store) throw new Error('useFriendsContext must be used within FriendsContextProvider');

    return useStore(store, selector);
}

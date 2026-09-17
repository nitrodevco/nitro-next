import { useContext } from 'react';
import { useStore } from 'zustand';

import { FriendsContext } from './FriendsContext';
import { FriendsStore } from './store/FriendsStore';

export function useFriendsStore<T>(selector: (state: FriendsStore) => T) {
    const store = useContext(FriendsContext);

    if (!store) throw new Error('useFriendsStore must be used within FriendsContextProvider');

    return useStore(store, selector);
}

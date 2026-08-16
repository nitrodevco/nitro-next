import { useContext } from 'react';
import { useStore } from 'zustand';

import { UserStore } from './store';
import { UserContext } from './UserContext';

export const useUserContext = <T,>(selector: (state: UserStore) => T) => {
    const store = useContext(UserContext);

    if (!store) throw new Error('useUserContext must be used within UserContextProvider');

    return useStore(store, selector);
}
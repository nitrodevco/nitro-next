import { useContext } from 'react';
import { useStore } from 'zustand';

import { NavigatorContext } from './NavigatorContext';
import type { NavigatorContextStore } from './store/NavigatorContextStore';

export const useNavigatorContext = <T,>(selector: (state: NavigatorContextStore) => T) => {
    const store = useContext(NavigatorContext);

    if (!store) throw new Error('useNavigatorContext must be used within NavigatorContextProvider');

    return useStore(store, selector);
}

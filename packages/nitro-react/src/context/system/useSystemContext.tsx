import { useContext } from 'react';
import { useStore } from 'zustand';

import { SystemStore } from './store';
import { SystemContext } from './SystemContext';

export function useSystemContext<T>(selector: (state: SystemStore) => T) {
    const store = useContext(SystemContext);

    if (!store) throw new Error('useSystemContext must be used within SystemContextProvider');

    return useStore(store, selector);
}

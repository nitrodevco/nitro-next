import { useContext } from 'react';
import { useStore } from 'zustand';

import { CatalogContext } from './CatalogContext';
import { CatalogStore } from './store/CatalogStore';

export function useCatalogStore<T>(selector: (state: CatalogStore) => T) {
    const store = useContext(CatalogContext);

    if (!store) throw new Error('useCatalogStore must be used within CatalogContextProvider');

    return useStore(store, selector);
}

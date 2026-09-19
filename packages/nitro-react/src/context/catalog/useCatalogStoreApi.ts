import { useContext } from 'react';

import { CatalogContext } from './CatalogContext';

/** The catalog store itself, for reading actions and current state without subscribing. */
export const useCatalogStoreApi = () => {
    const store = useContext(CatalogContext);

    if (!store) throw new Error('useCatalogStoreApi must be used within CatalogContextProvider');

    return store;
};

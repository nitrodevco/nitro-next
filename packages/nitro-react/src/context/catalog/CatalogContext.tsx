import { createContext } from 'react';
import { StoreApi } from 'zustand';

import { CatalogStore } from './store';

export const CatalogContext = createContext<StoreApi<CatalogStore> | null>(null);

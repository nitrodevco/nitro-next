import { createContext } from 'react';
import type { StoreApi } from 'zustand';

import { CatalogContextStore } from './store';

export const CatalogContext = createContext<StoreApi<CatalogContextStore> | null>(null);

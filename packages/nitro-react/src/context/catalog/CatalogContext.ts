import { createContext } from 'react';
import { StoreApi } from 'zustand';

import { CatalogStore } from './store';

/** The context a catalogue window's store reaches its components through (`CatalogContextProvider`). */
export const CatalogContext = createContext<StoreApi<CatalogStore> | null>(null);

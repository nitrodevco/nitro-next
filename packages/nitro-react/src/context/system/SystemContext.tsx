import { createContext } from 'react';
import { StoreApi } from 'zustand';

import { SystemStore } from './store';

export const SystemContext = createContext<StoreApi<SystemStore> | null>(null);
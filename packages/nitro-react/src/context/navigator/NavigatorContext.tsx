import { createContext } from 'react';
import type { StoreApi } from 'zustand';

import type { NavigatorContextStore } from './store';

export const NavigatorContext = createContext<StoreApi<NavigatorContextStore> | null>(null);

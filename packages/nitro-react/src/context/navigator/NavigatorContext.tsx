import { createContext } from 'react';
import { StoreApi } from 'zustand';

import { NavigatorContextStore } from './store';

export const NavigatorContext = createContext<StoreApi<NavigatorContextStore> | null>(null);

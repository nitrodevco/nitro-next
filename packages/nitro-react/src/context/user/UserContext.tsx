import { createContext } from 'react';
import type { StoreApi } from 'zustand';

import { UserStore } from './store';

export const UserContext = createContext<StoreApi<UserStore> | null>(null);
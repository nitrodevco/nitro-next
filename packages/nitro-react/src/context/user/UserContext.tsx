import { createContext } from 'react';
import { StoreApi } from 'zustand';

import { UserStore } from './store';

export const UserContext = createContext<StoreApi<UserStore> | null>(null);

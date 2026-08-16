import { createContext } from 'react';
import type { StoreApi } from 'zustand';

import { FriendsContextStore } from './store/FriendsContextStore';

export const FriendsContext = createContext<StoreApi<FriendsContextStore> | null>(null);

import { createContext } from 'react';
import { StoreApi } from 'zustand';

import { FriendsStore } from './store/FriendsStore';

export const FriendsContext = createContext<StoreApi<FriendsStore> | null>(null);

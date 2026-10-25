import { createContext } from 'react';
import { StoreApi } from 'zustand';

import { FriendsStore } from './store/FriendsStore';

/** The context the friend list's store reaches its components through (`FriendsContextProvider`). */
export const FriendsContext = createContext<StoreApi<FriendsStore> | null>(null);

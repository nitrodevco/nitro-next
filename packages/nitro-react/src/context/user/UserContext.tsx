import { createContext } from 'react';
import type { StoreApi } from 'zustand';

import type { UserStore } from '#base/stores';

export const UserContext = createContext<StoreApi<UserStore> | null>(null);
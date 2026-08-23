import { createContext } from 'react';
import type { StoreApi } from 'zustand';

import { RoomStore } from './store';

export const RoomContext = createContext<StoreApi<RoomStore> | null>(null);

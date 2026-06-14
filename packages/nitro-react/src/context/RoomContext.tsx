import { createContext } from 'react';
import type { StoreApi } from 'zustand';

import type { RoomStore } from '#base/stores';

export const RoomContext = createContext<StoreApi<RoomStore> | null>(null);
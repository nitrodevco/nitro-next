import { createContext } from 'react';
import type { StoreApi } from 'zustand';

import { NotificationContextStore } from './store/NotificationContextStore';

export const NotificationContext = createContext<StoreApi<NotificationContextStore> | null>(null);

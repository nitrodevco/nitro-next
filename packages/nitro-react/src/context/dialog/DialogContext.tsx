import { createContext } from 'react';
import type { StoreApi } from 'zustand';

import { DialogContextStore } from './store/DialogContextStore';

export const DialogContext = createContext<StoreApi<DialogContextStore> | null>(null);

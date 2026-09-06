import { createContext } from 'react';
import { StoreApi } from 'zustand';

import { AvatarEditorStore } from './store';

export const AvatarEditorContext = createContext<StoreApi<AvatarEditorStore> | null>(null);

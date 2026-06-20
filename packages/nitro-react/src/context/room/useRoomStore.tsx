import { useContext } from 'react';
import type { StoreApi } from 'zustand';

import type { RoomStore } from '#base/stores';

import { RoomContext } from './RoomContext';

// Direct access to the store API (advanced usage)
// Use this when you need to call store methods outside of React render
export const useRoomStore = (): StoreApi<RoomStore> => {
    const store = useContext(RoomContext);

    if (!store) throw new Error('useRoomStore must be used within RoomContextProvider');

    return store;
};

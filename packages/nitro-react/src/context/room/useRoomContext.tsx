import { useContext } from 'react';
import { useStore } from 'zustand';

import type { RoomStore } from '#base/stores';

import { RoomContext } from './RoomContext';

export const useRoomContext = <T,>(selector: (state: RoomStore) => T) => {
    const store = useContext(RoomContext);

    if (!store) throw new Error('useRoomContext must be used within RoomContextProvider');

    return useStore(store, selector);
}
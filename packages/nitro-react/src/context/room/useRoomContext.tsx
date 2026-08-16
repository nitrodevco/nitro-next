import { useContext } from 'react';
import { useStore } from 'zustand';

import { RoomContext } from './RoomContext';
import { RoomStore } from './store';

export const useRoomContext = <T,>(selector: (state: RoomStore) => T) => {
    const ctx = useContext(RoomContext);

    if (!ctx) throw new Error('useRoomContext must be used within RoomContextProvider');

    return useStore(ctx, selector);
}
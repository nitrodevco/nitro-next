import { useStore } from 'zustand';

import { RoomStore, roomStore } from './store/RoomStore';

/**
 * A slice of the RoomStore, re-rendering only when that slice changes. It reads the app-wide
 * singleton, so it works anywhere - there is no provider to be inside.
 */
export function useRoomStore<T>(selector: (state: RoomStore) => T) {
    return useStore(roomStore, selector);
}

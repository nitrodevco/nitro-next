import { useRoomStore } from '../useRoomStore';

/** The room you are in, or nothing outside one. */
export const useRoom = () => useRoomStore(x => x.room);

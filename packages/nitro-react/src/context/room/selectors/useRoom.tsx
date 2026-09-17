import { useRoomStore } from '../useRoomStore';

export const useRoom = () => useRoomStore(x => x.room);

import { useRoomStore } from '../../useRoomStore';

/** Whether a room session is open: the room's data has arrived and has not been cleared on leaving. */
export const useIsInRoom = () => useRoomStore(x => !!x.room);

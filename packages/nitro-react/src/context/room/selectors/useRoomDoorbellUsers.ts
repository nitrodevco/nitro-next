import { useRoomStore } from '../useRoomStore';

/** Who is waiting at the door of the room you are in and may answer for. */
export const useRoomDoorbellUsers = () => useRoomStore(x => x.doorbellUsers);

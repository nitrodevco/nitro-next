import { useRoomStore } from '../../useRoomStore';

/** `RoomSession.isRoomOwner`: whether the user owns the current room. */
export const useIsRoomOwner = () => useRoomStore(x => x.isRoomOwner);

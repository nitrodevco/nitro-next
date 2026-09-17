import { useRoomStore } from '../../useRoomStore';

export const useRoomIsMoveBlocked = () => useRoomStore(x => x.isMoveBlocked);

import { useRoomContext } from '../../useRoomContext';

export const useRoomIsMoveBlocked = () => useRoomContext(x => x.isMoveBlocked);

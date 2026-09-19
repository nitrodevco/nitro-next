import { useSystemStore } from '../useSystemStore';

export const useHomeRoomId = () => useSystemStore(x => x.homeRoomId);

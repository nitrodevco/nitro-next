import { useSystemStore } from '../useSystemStore';

export const useRoomSessionRequest = () => useSystemStore(x => x.roomSessionRequest);

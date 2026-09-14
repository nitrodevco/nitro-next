import { useSystemContext } from '../useSystemContext';

export const useRoomSessionRequest = () => useSystemContext(x => x.roomSessionRequest);

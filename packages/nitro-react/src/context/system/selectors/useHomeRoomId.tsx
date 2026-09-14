import { useSystemContext } from '../useSystemContext';

export const useHomeRoomId = () => useSystemContext(x => x.homeRoomId);

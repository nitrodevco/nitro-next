import { useRoomContext } from '../../useRoomContext';

export const useOwnIsDancing = () => useRoomContext(x => x.isOwnDancing);

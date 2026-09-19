import { useRoomStore } from '../../useRoomStore';

export const useOwnIsDancing = () => useRoomStore(x => x.isOwnDancing);

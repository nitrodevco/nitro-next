import { useRoomStore } from '../../useRoomStore';

/** Whether your own avatar is dancing, as the room's dance updates last said. */
export const useOwnIsDancing = () => useRoomStore(x => x.isOwnDancing);

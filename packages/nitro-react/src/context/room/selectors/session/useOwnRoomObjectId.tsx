import { useRoomContext } from '../../useRoomContext';

export const useOwnRoomObjectId = () => useRoomContext(x => x.ownRoomIndex);

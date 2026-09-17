import { useRoomStore } from '../../useRoomStore';

export const useOwnRoomObjectId = () => useRoomStore(x => x.ownRoomIndex);

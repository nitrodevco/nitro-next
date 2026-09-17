import { useRoomStore } from '../../useRoomStore';

export const useRoomPlacedObject = () => useRoomStore(x => x.placedObject);

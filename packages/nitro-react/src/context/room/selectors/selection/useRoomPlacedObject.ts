import { useRoomStore } from '../../useRoomStore';

/** The object being placed or moved in the room, if there is one. */
export const useRoomPlacedObject = () => useRoomStore(x => x.placedObject);

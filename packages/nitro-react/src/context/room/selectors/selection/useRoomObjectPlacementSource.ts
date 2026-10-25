import { useRoomStore } from '../../useRoomStore';

/**
 * Where the object being placed in the room came from (`RoomObjectPlacementSource`): the
 * inventory, the catalogue or the infostand.
 */
export const useRoomObjectPlacementSource = () => useRoomStore(x => x.objectPlacementSource);

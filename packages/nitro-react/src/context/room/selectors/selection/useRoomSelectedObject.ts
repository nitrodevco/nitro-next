import { useRoomStore } from '../../useRoomStore';

/** The object selected in the room, if there is one. */
export const useRoomSelectedObject = () => useRoomStore(x => x.selectedObject);

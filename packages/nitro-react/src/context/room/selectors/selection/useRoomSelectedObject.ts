import { useRoomStore } from '../../useRoomStore';

export const useRoomSelectedObject = () => useRoomStore(x => x.selectedObject);

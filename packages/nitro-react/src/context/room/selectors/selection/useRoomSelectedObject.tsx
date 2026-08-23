import { useRoomContext } from '../../useRoomContext';

export const useRoomSelectedObject = () => useRoomContext(x => x.selectedObject);

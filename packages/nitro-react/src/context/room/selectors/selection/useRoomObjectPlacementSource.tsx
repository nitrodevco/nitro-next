import { useRoomStore } from '../../useRoomStore';

export const useRoomObjectPlacementSource = () => useRoomStore(x => x.objectPlacementSource);

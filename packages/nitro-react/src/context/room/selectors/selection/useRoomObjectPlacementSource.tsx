import { useRoomContext } from '../../useRoomContext';

export const useRoomObjectPlacementSource = () => useRoomContext(x => x.objectPlacementSource);

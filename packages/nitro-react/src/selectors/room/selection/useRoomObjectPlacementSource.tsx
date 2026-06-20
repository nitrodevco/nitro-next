import { useRoomContext } from "#base/context";
import { selectObjectPlacementSource } from "#base/stores";

export const useRoomObjectPlacementSource = () => useRoomContext(selectObjectPlacementSource);
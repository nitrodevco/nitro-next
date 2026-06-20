import { useRoomContext } from "#base/context";
import { selectPlacedObject } from "#base/stores";

export const useRoomPlacedObject = () => useRoomContext(selectPlacedObject);
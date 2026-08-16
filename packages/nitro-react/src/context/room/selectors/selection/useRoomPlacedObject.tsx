import { useRoomContext } from "../../useRoomContext";

export const useRoomPlacedObject = () => useRoomContext(x => x.placedObject);
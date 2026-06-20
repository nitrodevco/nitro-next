import { useRoomContext } from "#base/context";
import { selectSelectedObject } from "#base/stores";

export const useRoomSelectedObject = () => useRoomContext(selectSelectedObject);
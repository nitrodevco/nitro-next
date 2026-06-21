import { useRoomContext } from "#base/context";
import { selectControllerLevel } from "#base/stores";

export const useRoomControllerLevel = () => useRoomContext(selectControllerLevel);
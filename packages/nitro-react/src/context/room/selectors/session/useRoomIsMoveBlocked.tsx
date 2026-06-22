import { useRoomContext } from "#base/context";
import { selectIsMoveBlocked } from "#base/stores";

export const useRoomIsMoveBlocked = () => useRoomContext(selectIsMoveBlocked);
import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";
import { extractRoomMouseActions } from "#base/stores";

export const useRoomMouseActions = () => useRoomContext(useShallow(extractRoomMouseActions));
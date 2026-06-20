import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";
import { extractRoomMouseEventActions } from "#base/stores";

export const useRoomMouseEventActions = () => useRoomContext(useShallow(extractRoomMouseEventActions));
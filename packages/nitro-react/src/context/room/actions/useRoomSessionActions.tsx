import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";
import { extractRoomSessionActions } from "#base/stores";

export const useRoomSessionActions = () => useRoomContext(useShallow(extractRoomSessionActions));
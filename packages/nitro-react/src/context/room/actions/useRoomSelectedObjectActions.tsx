import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";
import { extractRoomSelectedObjectActions } from "#base/stores";

export const useRoomSelectedObjectActions = () => useRoomContext(useShallow(extractRoomSelectedObjectActions));
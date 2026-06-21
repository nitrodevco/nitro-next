import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";
import { extractRoomStackingHeightMapActions } from "#base/stores";

export const useRoomStackingHeightMapActions = () => useRoomContext(useShallow(extractRoomStackingHeightMapActions));
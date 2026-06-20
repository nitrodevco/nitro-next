import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";
import { extractRoomActions } from "#base/stores";

export const useRoomActions = () => useRoomContext(useShallow(extractRoomActions));
import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";
import { extractRoomPermissionActions } from "#base/stores";

export const useRoomPermissionActions = () => useRoomContext(useShallow(extractRoomPermissionActions));
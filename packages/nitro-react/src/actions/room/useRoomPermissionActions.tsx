import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";
import { extractPermissionActions } from "#base/stores";

export const useRoomPermissionActions = () => useRoomContext(useShallow(extractPermissionActions));
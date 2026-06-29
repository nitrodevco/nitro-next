import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";
import { extractRoomUsersActions } from "#base/stores";

export const useRoomUsersActions = () => useRoomContext(useShallow(extractRoomUsersActions));
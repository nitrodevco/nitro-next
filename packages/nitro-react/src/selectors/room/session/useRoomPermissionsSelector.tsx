import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";
import { selectRoomPermissions } from "#base/stores";

export const useRoomPermissionsSelector = () => useRoomContext(useShallow(selectRoomPermissions));
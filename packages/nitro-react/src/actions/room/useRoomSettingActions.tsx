import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";
import { extractRoomSettingActions } from "#base/stores";

export const useRoomSettingActions = () => useRoomContext(useShallow(extractRoomSettingActions));
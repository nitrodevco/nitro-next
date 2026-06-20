import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";
import { selectSelectedObjectDetails } from "#base/stores";

export const useRoomSelectedObjectDetails = () => useRoomContext(useShallow(selectSelectedObjectDetails));
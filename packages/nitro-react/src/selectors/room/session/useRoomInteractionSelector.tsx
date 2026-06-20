import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";
import { selectRoomInteractionState } from "#base/stores";

export const useRoomInteractionSelector = () => useRoomContext(useShallow(selectRoomInteractionState));
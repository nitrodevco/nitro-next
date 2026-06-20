import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";

export const useRoomSelector = () => useRoomContext(useShallow(x => x.room));
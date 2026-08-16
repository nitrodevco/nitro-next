import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";

export const useRoomStackingHeightMapActions = () => useRoomContext(useShallow(x => ({
    setHeightMap: x.setHeightMap,
    setHeightMapUpdates: x.setHeightMapUpdates,
    getTileHeight: x.getTileHeight,
    validateLocation: x.validateLocation,
})));
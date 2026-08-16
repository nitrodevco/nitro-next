import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";

export const useRoomActions = () => useRoomContext(useShallow(x => ({
    setRoom: x.setRoom,
    setOwnUserId: x.setOwnUserId,
    setLandingViewVisible: x.setLandingViewVisible
})));
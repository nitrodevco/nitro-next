import { useShallow } from "zustand/shallow";

import { useRoomContext } from "#base/context";

export const useRoomSessionActions = () => useRoomContext(useShallow(x => ({
    setOwnRoomIndex: x.setOwnRoomIndex,
    setIsDecorating: x.setIsDecorating,
    setIsSpectator: x.setIsSpectator,
    setIsPlayingGame: x.setIsPlayingGame,
    setIsOwnDancing: x.setIsOwnDancing
})));
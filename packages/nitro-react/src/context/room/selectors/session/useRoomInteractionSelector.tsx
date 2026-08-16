import { useShallow } from "zustand/shallow";

import { useRoomContext } from "../../useRoomContext";

export const useRoomInteractionSelector = () => useRoomContext(useShallow(x => ({
    isPlayingGame: x.isPlayingGame,
    isSpectator: x.isSpectator,
    isDecorating: x.isDecorating,
    isMoveBlocked: x.isMoveBlocked
})));
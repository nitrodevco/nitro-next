import { useShallow } from "zustand/shallow";

import { useRoomContext } from '#base/context';

export const useRoomSessionSelector = () => useRoomContext(useShallow(x => ({
    doorMode: x.doorMode,
    tradeMode: x.tradeMode,
    controllerLevel: x.controllerLevel,
    ownRoomIndex: x.ownRoomIndex,
    isGuildRoom: x.isGuildRoom,
    isRoomOwner: x.isRoomOwner,
    isDecorating: x.isDecorating,
    isSpectator: x.isSpectator,
    isPlayingGame: x.isPlayingGame
})));
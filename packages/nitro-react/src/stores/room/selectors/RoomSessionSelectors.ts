import type { RoomStore } from "../RoomStore";

export const selectDoorMode = (state: RoomStore) => state.doorMode;

export const selectTradeMode = (state: RoomStore) => state.tradeMode;

export const selectControllerLevel = (state: RoomStore) => state.controllerLevel;

export const selectOwnRoomIndex = (state: RoomStore) => state.ownRoomIndex;

export const selectAllowPets = (state: RoomStore) => state.allowPets;

export const selectIsGuildRoom = (state: RoomStore) => state.isGuildRoom;

export const selectIsRoomOwner = (state: RoomStore) => state.isRoomOwner;

export const selectIsDecorating = (state: RoomStore) => state.isDecorating;

export const selectIsSpectator = (state: RoomStore) => state.isSpectator;

export const selectIsPlayingGame = (state: RoomStore) => state.isPlayingGame;

export const selectRoomPermissions = (state: RoomStore) => ({
    controllerLevel: state.controllerLevel,
    isRoomOwner: state.isRoomOwner
});

export const selectRoomSettings = (state: RoomStore) => ({
    doorMode: state.doorMode,
    tradeMode: state.tradeMode,
    allowPets: state.allowPets,
    isGuildRoom: state.isGuildRoom
});

export const selectRoomInteractionState = (state: RoomStore) => ({
    isPlayingGame: state.isPlayingGame,
    isSpectator: state.isSpectator,
    isDecorating: state.isDecorating
});
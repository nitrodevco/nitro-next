import type { RoomStore } from './RoomStore';

// Individual granular selectors for maximum performance
export const selectTargetId = (state: RoomStore) => state.targetId;

export const selectTargetCategory = (state: RoomStore) => state.targetCategory;

export const selectTargetInfo = (state: RoomStore) => ({
    targetId: state.targetId,
    targetCategory: state.targetCategory,
});

export const selectCameraSettings = (state: RoomStore) => ({
    cameraFollowDisabled: state.cameraFollowDisabled,
    followDuration: state.followDuration,
});

export const selectCameraFull = (state: RoomStore) => ({
    targetId: state.targetId,
    targetCategory: state.targetCategory,
    cameraFollowDisabled: state.cameraFollowDisabled,
    followDuration: state.followDuration,
});

// Permission selectors
export const selectControllerLevel = (state: RoomStore) => state.controllerLevel;

export const selectIsRoomOwner = (state: RoomStore) => state.isRoomOwner;

export const selectPermissions = (state: RoomStore) => ({
    controllerLevel: state.controllerLevel,
    isRoomOwner: state.isRoomOwner,
});

// Room settings selectors
export const selectDoorMode = (state: RoomStore) => state.doorMode;

export const selectTradeMode = (state: RoomStore) => state.tradeMode;

export const selectAllowPets = (state: RoomStore) => state.allowPets;

export const selectIsGuildRoom = (state: RoomStore) => state.isGuildRoom;

export const selectRoomSettings = (state: RoomStore) => ({
    doorMode: state.doorMode,
    tradeMode: state.tradeMode,
    allowPets: state.allowPets,
    isGuildRoom: state.isGuildRoom,
});

// Decorating/interaction selectors
export const selectIsDecorating = (state: RoomStore) => state.isDecorating;

export const selectDecoratingState = (state: RoomStore) => ({
    isDecorating: state.isDecorating,
    isRoomOwner: state.isRoomOwner,
    controllerLevel: state.controllerLevel,
});

// Game state selectors
export const selectIsPlayingGame = (state: RoomStore) => state.isPlayingGame;

export const selectIsSpectator = (state: RoomStore) => state.isSpectator;

export const selectGameState = (state: RoomStore) => ({
    isPlayingGame: state.isPlayingGame,
    isSpectator: state.isSpectator,
});

// Selected object/avatar selectors
export const selectSelectedAvatarId = (state: RoomStore) => state.selectedAvatarId;

export const selectSelectedObjectId = (state: RoomStore) => state.selectedObjectId;

export const selectSelectedObjectCategory = (state: RoomStore) => state.selectedObjectCategory;

export const selectSelectedObject = (state: RoomStore) => state.selectedObject;

export const selectSelectedObjectFull = (state: RoomStore) => ({
    selectedAvatarId: state.selectedAvatarId,
    selectedObjectId: state.selectedObjectId,
    selectedObjectCategory: state.selectedObjectCategory,
    selectedObject: state.selectedObject,
});

// Object placement selectors
export const selectPlacedObject = (state: RoomStore) => state.placedObject;

export const selectObjectPlacementSource = (state: RoomStore) => state.objectPlacementSource;

export const selectObjectPlacement = (state: RoomStore) => ({
    placedObject: state.placedObject,
    objectPlacementSource: state.objectPlacementSource,
});

// Room info selectors
export const selectRoomId = (state: RoomStore) => state.roomId;

export const selectRoom = (state: RoomStore) => state.room;

export const selectOwnUserId = (state: RoomStore) => state.ownUserId;

export const selectRoomInfo = (state: RoomStore) => ({
    roomId: state.roomId,
    room: state.room,
    ownUserId: state.ownUserId,
});

// Combined/composite selectors for common use cases
export const selectRoomAccessibility = (state: RoomStore) => ({
    isRoomOwner: state.isRoomOwner,
    controllerLevel: state.controllerLevel,
    isDecorating: state.isDecorating,
});

export const selectSessionState = (state: RoomStore) => ({
    doorMode: state.doorMode,
    tradeMode: state.tradeMode,
    controllerLevel: state.controllerLevel,
    ownRoomIndex: state.ownRoomIndex,
    allowPets: state.allowPets,
    isGuildRoom: state.isGuildRoom,
    isRoomOwner: state.isRoomOwner,
    isDecorating: state.isDecorating,
    isSpectator: state.isSpectator,
    isPlayingGame: state.isPlayingGame,
});

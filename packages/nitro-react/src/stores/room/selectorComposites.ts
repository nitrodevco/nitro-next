import type { RoomStore } from './RoomStore';

// Composite selectors that combine multiple related pieces of state
// These are useful for components that need specific domain-related data

export const selectCameraAndPermissions = (state: RoomStore) => ({
    // Camera
    targetId: state.targetId,
    targetCategory: state.targetCategory,
    cameraFollowDisabled: state.cameraFollowDisabled,
    followDuration: state.followDuration,
    // Permissions
    controllerLevel: state.controllerLevel,
    isRoomOwner: state.isRoomOwner,
});

export const selectSelectedObjectAndPlaced = (state: RoomStore) => ({
    selectedAvatarId: state.selectedAvatarId,
    selectedObjectId: state.selectedObjectId,
    selectedObjectCategory: state.selectedObjectCategory,
    selectedObject: state.selectedObject,
    placedObject: state.placedObject,
    objectPlacementSource: state.objectPlacementSource,
});

export const selectGameStateAndPermissions = (state: RoomStore) => ({
    isPlayingGame: state.isPlayingGame,
    isSpectator: state.isSpectator,
    controllerLevel: state.controllerLevel,
    isRoomOwner: state.isRoomOwner,
    isDecorating: state.isDecorating,
});

export const selectRoomAccessControl = (state: RoomStore) => ({
    isRoomOwner: state.isRoomOwner,
    controllerLevel: state.controllerLevel,
    isDecorating: state.isDecorating,
    doorMode: state.doorMode,
    tradeMode: state.tradeMode,
});

export const selectInteractionState = (state: RoomStore) => ({
    isPlayingGame: state.isPlayingGame,
    isSpectator: state.isSpectator,
    isDecorating: state.isDecorating,
    selectedObjectId: state.selectedObjectId,
    selectedAvatarId: state.selectedAvatarId,
    selectedObject: state.selectedObject,
});

export const selectRoomStatusAndSettings = (state: RoomStore) => ({
    roomId: state.roomId,
    doorMode: state.doorMode,
    tradeMode: state.tradeMode,
    allowPets: state.allowPets,
    isGuildRoom: state.isGuildRoom,
    isPlayingGame: state.isPlayingGame,
});

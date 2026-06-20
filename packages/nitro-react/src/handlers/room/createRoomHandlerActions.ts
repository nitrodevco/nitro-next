import type { RoomStore } from '#base/stores';

// Helper types for handler actions
export type RoomPermissionActions = {
    setControllerLevel: RoomStore['setControllerLevel'];
    setIsRoomOwner: RoomStore['setIsRoomOwner'];
    setPermissions: RoomStore['setPermissions'];
};

export type RoomSettingActions = {
    setDoorMode: RoomStore['setDoorMode'];
    setTradeMode: RoomStore['setTradeMode'];
    setAllowPets: RoomStore['setAllowPets'];
    setIsGuildRoom: RoomStore['setIsGuildRoom'];
    setRoomSettings: RoomStore['setRoomSettings'];
};

export type RoomSessionActions = RoomPermissionActions &
    RoomSettingActions & {
    setIsDecorating: RoomStore['setIsDecorating'];
    setIsSpectator: RoomStore['setIsSpectator'];
    setIsPlayingGame: RoomStore['setIsPlayingGame'];
    setOwnRoomIndex: RoomStore['setOwnRoomIndex'];
};

export type RoomCameraActions = {
    setTargetId: RoomStore['setTargetId'];
    setTargetCategory: RoomStore['setTargetCategory'];
    setTarget: RoomStore['setTarget'];
    setCameraFollowDisabled: RoomStore['setCameraFollowDisabled'];
    setFollowDuration: RoomStore['setFollowDuration'];
    disableFollowTemporarily: RoomStore['disableFollowTemporarily'];
};

export type RoomSelectedObjectActions = {
    setSelectedAvatarId: RoomStore['setSelectedAvatarId'];
    setSelectedObjectId: RoomStore['setSelectedObjectId'];
    setSelectedObjectCategory: RoomStore['setSelectedObjectCategory'];
    setSelectedObject: RoomStore['setSelectedObject'];
    setPlacedObject: RoomStore['setPlacedObject'];
    setObjectPlacementSource: RoomStore['setObjectPlacementSource'];
};

// Helper function to extract specific action groups from store
export const extractPermissionActions = (store: RoomStore): RoomPermissionActions => ({
    setControllerLevel: store.setControllerLevel,
    setIsRoomOwner: store.setIsRoomOwner,
    setPermissions: store.setPermissions,
});

export const extractSettingActions = (store: RoomStore): RoomSettingActions => ({
    setDoorMode: store.setDoorMode,
    setTradeMode: store.setTradeMode,
    setAllowPets: store.setAllowPets,
    setIsGuildRoom: store.setIsGuildRoom,
    setRoomSettings: store.setRoomSettings,
});

export const extractCameraActions = (store: RoomStore): RoomCameraActions => ({
    setTargetId: store.setTargetId,
    setTargetCategory: store.setTargetCategory,
    setTarget: store.setTarget,
    setCameraFollowDisabled: store.setCameraFollowDisabled,
    setFollowDuration: store.setFollowDuration,
    disableFollowTemporarily: store.disableFollowTemporarily,
});

export const extractSelectedObjectActions = (
    store: RoomStore
): RoomSelectedObjectActions => ({
    setSelectedAvatarId: store.setSelectedAvatarId,
    setSelectedObjectId: store.setSelectedObjectId,
    setSelectedObjectCategory: store.setSelectedObjectCategory,
    setSelectedObject: store.setSelectedObject,
    setPlacedObject: store.setPlacedObject,
    setObjectPlacementSource: store.setObjectPlacementSource,
});

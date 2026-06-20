import type { RoomStore } from "../RoomStore"

export type RoomPermissionActions = {
    setControllerLevel: RoomStore['setControllerLevel'];
    setIsRoomOwner: RoomStore['setIsRoomOwner'];
}

export const extractRoomPermissionActions = (store: RoomStore) => ({
    setControllerLevel: store.setControllerLevel,
    setIsRoomOwner: store.setIsRoomOwner
});
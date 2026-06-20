import type { RoomStore } from "../RoomStore"

export type RoomPermissionActions = {
    setControllerLevel: RoomStore['setControllerLevel'];
    setIsRoomOwner: RoomStore['setIsRoomOwner'];
}

export const extractPermissionActions = (store: RoomStore) => ({
    setControllerLevel: store.setControllerLevel,
    setIsRoomOwner: store.setIsRoomOwner
});
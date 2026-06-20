import type { RoomStore } from "../RoomStore"

export type RoomActions = {
    setOwnUserId: RoomStore['setOwnUserId'];
}

export const extractRoomActions = (store: RoomStore) => ({
    setOwnUserId: store.setOwnUserId,
});
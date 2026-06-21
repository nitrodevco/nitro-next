import type { RoomStore } from "../RoomStore"

export type RoomActions = {
    setRoom: RoomStore['setRoom'];
    setOwnUserId: RoomStore['setOwnUserId'];
}

export const extractRoomActions = (store: RoomStore) => ({
    setRoom: store.setRoom,
    setOwnUserId: store.setOwnUserId
});
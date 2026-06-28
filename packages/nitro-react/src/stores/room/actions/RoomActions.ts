import type { RoomStore } from "../RoomStore"

export type RoomActions = {
    setRoom: RoomStore['setRoom'];
    setOwnUserId: RoomStore['setOwnUserId'];
    setLandingViewVisible: RoomStore['setLandingViewVisible'];
}

export const extractRoomActions = (store: RoomStore) => ({
    setRoom: store.setRoom,
    setOwnUserId: store.setOwnUserId,
    setLandingViewVisible: store.setLandingViewVisible
});
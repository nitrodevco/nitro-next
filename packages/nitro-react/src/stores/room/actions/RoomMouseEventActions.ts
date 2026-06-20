import type { RoomStore } from "../RoomStore"

export type RoomMouseEventActions = {
    getMouseEventId: RoomStore['getMouseEventId'];
    setMouseEventId: RoomStore['setMouseEventId'];
}

export const extractRoomMouseEventActions = (store: RoomStore) => ({
    getMouseEventId: store.getMouseEventId,
    setMouseEventId: store.setMouseEventId
});
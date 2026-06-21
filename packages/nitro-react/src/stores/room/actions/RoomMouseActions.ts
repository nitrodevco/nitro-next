import type { RoomStore } from "../RoomStore"

export type RoomMouseEventActions = {
    getMouseEventId: RoomStore['getMouseEventId'];
    setMouseEventId: RoomStore['setMouseEventId'];
    addCursorOwner: RoomStore['addCursorOwner'];
    removeCursorOwner: RoomStore['removeCursorOwner'];
    hasAndResetCursorUpdate: RoomStore['hasAndResetCursorUpdate'];
    hasCursorOwners: RoomStore['hasCursorOwners'];
}

export const extractRoomMouseActions = (store: RoomStore) => ({
    getMouseEventId: store.getMouseEventId,
    setMouseEventId: store.setMouseEventId,
    addCursorOwner: store.addCursorOwner,
    removeCursorOwner: store.removeCursorOwner,
    hasAndResetCursorUpdate: store.hasAndResetCursorUpdate,
    hasCursorOwners: store.hasCursorOwners
});
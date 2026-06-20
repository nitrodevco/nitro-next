import type { RoomStore } from "../RoomStore"

export type RoomSelectedObjectActions = {
    setSelectedAvatarId: RoomStore['setSelectedAvatarId'];
    setSelectedObjectId: RoomStore['setSelectedObjectId'];
    setSelectedObjectCategory: RoomStore['setSelectedObjectCategory'];
    setSelectedObject: RoomStore['setSelectedObject'];
    setPlacedObject: RoomStore['setPlacedObject'];
    setObjectPlacementSource: RoomStore['setObjectPlacementSource'];
}

export const extractRoomSelectedObjectActions = (store: RoomStore) => ({
    setSelectedAvatarId: store.setSelectedAvatarId,
    setSelectedObjectId: store.setSelectedObjectId,
    setSelectedObjectCategory: store.setSelectedObjectCategory,
    setSelectedObject: store.setSelectedObject,
    setPlacedObject: store.setPlacedObject,
    setObjectPlacementSource: store.setObjectPlacementSource
});
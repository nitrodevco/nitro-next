import type { RoomStore } from "../RoomStore";

export const selectSelectedAvatarId = (state: RoomStore) => state.selectedAvatarId;

export const selectSelectedObjectId = (state: RoomStore) => state.selectedObjectId;

export const selectSelectedObjectCategory = (state: RoomStore) => state.selectedObjectCategory;

export const selectSelectedObject = (state: RoomStore) => state.selectedObject;

export const selectPlacedObject = (state: RoomStore) => state.placedObject;

export const selectObjectPlacementSource = (state: RoomStore) => state.objectPlacementSource;

export const selectSelectedObjectDetails = (state: RoomStore) => ({
    selectedAvatarId: state.selectedAvatarId,
    selectedObjectId: state.selectedObjectId,
    selectedObjectCategory: state.selectedObjectCategory
});
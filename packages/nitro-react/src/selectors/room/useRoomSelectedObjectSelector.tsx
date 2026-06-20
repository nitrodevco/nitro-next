import { useShallow } from "zustand/shallow";

import { useRoomContext } from '#base/context';

export const useRoomSelectedObjectSelector = () => useRoomContext(useShallow(x => ({
    selectedAvatarId: x.selectedAvatarId,
    selectedObjectId: x.selectedObjectId,
    selectedObjectCategory: x.selectedObjectCategory,
    selectedObject: x.selectedObject,
    placedObject: x.placedObject,
    objectPlacementSource: x.objectPlacementSource,
})));
import { useShallow } from 'zustand/shallow';

import { useRoomContext } from '#base/context';

export const useRoomSelectedObjectActions = () => useRoomContext(useShallow(x => ({
    setSelectedAvatarId: x.setSelectedAvatarId,
    setSelectedObjectId: x.setSelectedObjectId,
    setSelectedObjectCategory: x.setSelectedObjectCategory,
    setSelectedObject: x.setSelectedObject,
    setPlacedObject: x.setPlacedObject,
    setObjectPlacementSource: x.setObjectPlacementSource,
})));

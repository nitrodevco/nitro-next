import { useShallow } from 'zustand/shallow';

import { useRoomContext } from '../../useRoomContext';

export const useRoomSelectedObjectDetails = () => useRoomContext(useShallow(x => ({
    selectedAvatarId: x.selectedAvatarId,
    selectedObjectId: x.selectedObjectId,
    selectedObjectCategory: x.selectedObjectCategory,
})));

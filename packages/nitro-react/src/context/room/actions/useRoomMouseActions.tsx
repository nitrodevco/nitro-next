import { useShallow } from 'zustand/shallow';

import { useRoomContext } from '#base/context';

export const useRoomMouseActions = () => useRoomContext(useShallow(x => ({
    getMouseEventId: x.getMouseEventId,
    setMouseEventId: x.setMouseEventId,
    addCursorOwner: x.addCursorOwner,
    removeCursorOwner: x.removeCursorOwner,
    hasAndResetCursorUpdate: x.hasAndResetCursorUpdate,
    hasCursorOwners: x.hasCursorOwners,
})));

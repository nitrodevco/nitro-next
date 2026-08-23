import { useShallow } from 'zustand/shallow';

import { useRoomContext } from '#base/context';

export const useRoomPermissionActions = () => useRoomContext(useShallow(x => ({
    setControllerLevel: x.setControllerLevel,
    setIsRoomOwner: x.setIsRoomOwner,
})));

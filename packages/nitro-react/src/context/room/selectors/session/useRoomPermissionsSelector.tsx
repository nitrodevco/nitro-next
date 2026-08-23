import { useShallow } from 'zustand/shallow';

import { useRoomContext } from '../../useRoomContext';

export const useRoomPermissionsSelector = () => useRoomContext(useShallow(x => ({
    controllerLevel: x.controllerLevel,
    isRoomOwner: x.isRoomOwner,
})));

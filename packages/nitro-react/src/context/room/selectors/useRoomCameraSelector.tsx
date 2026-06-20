import { useShallow } from "zustand/shallow";

import { useRoomContext } from '#base/context';

export const useRoomCameraSelector = () => useRoomContext(useShallow(x => ({
    targetId: x.targetId,
    targetCategory: x.targetCategory,
    cameraFollowDisabled: x.cameraFollowDisabled,
    followDuration: x.followDuration
})));
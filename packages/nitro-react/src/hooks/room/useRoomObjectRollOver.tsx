import { RoomWidgetUpdateRoomObjectEvent } from "@nitrodevco/nitro-api";

import { useRoomEventDispatcher } from "./useRoomEventDispatcher"

export const useRoomObjectRollOver = (handler: (event: RoomWidgetUpdateRoomObjectEvent) => void) => {
    useRoomEventDispatcher<RoomWidgetUpdateRoomObjectEvent>(RoomWidgetUpdateRoomObjectEvent.OBJECT_ROLL_OVER, handler);
}
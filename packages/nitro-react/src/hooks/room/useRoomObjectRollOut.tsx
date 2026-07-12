import { RoomWidgetUpdateRoomObjectEvent } from "@nitrodevco/nitro-shared"

import { useRoomEventDispatcher } from "./useRoomEventDispatcher"

export const useRoomObjectRollOut = (handler: (event: RoomWidgetUpdateRoomObjectEvent) => void) => {
    useRoomEventDispatcher<RoomWidgetUpdateRoomObjectEvent>(RoomWidgetUpdateRoomObjectEvent.OBJECT_ROLL_OUT, handler);
}
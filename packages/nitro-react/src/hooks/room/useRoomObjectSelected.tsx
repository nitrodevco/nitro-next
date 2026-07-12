import { RoomWidgetUpdateRoomObjectEvent } from "@nitrodevco/nitro-shared"

import { useRoomEventDispatcher } from "./useRoomEventDispatcher"

export const useRoomObjectSelected = (handler: (event: RoomWidgetUpdateRoomObjectEvent) => void) => {
    useRoomEventDispatcher<RoomWidgetUpdateRoomObjectEvent>(RoomWidgetUpdateRoomObjectEvent.OBJECT_SELECTED, handler);
}
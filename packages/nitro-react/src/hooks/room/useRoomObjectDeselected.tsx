import { RoomWidgetUpdateRoomObjectEvent } from '@nitrodevco/nitro-api';

import { useRoomEventDispatcher } from './useRoomEventDispatcher';

export const useRoomObjectDeselected = (handler: (event: RoomWidgetUpdateRoomObjectEvent) => void) => {
    useRoomEventDispatcher<RoomWidgetUpdateRoomObjectEvent>(RoomWidgetUpdateRoomObjectEvent.OBJECT_DESELECTED, handler);
};

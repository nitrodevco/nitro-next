import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { PresentOpenedMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * What was inside the gift. The present widget is already open by the time this lands - it was
 * the one that sent the open - so the contents are handed to that open request rather than
 * opening anything of their own.
 */
export const registerRoomPresentHandlers = ({ subscribe }: WebSocketConnection) => {
    const { updateRoomWidgetData } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(PresentOpenedMessage, (data) => {
            updateRoomWidgetData(RoomObjectWidgetRequestEvent.PRESENT, data);
        }),
    ]);
};

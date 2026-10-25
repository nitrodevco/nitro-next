import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { RoomDimmerPresetsMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * The room's three saved dimmer moods. They only ever arrive because the dialog asked for them,
 * so they are handed to that open request rather than kept anywhere of their own.
 */
export const registerRoomDimmerHandlers = ({ subscribe }: WebSocketConnection) => {
    const { updateRoomWidgetData } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(RoomDimmerPresetsMessage, (data) => {
            updateRoomWidgetData(RoomObjectWidgetRequestEvent.DIMMER, data);
        }),
    ]);
};

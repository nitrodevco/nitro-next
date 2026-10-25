import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { BadgeInfoMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * `FurnitureBadgeDisplayWidgetHandler.onBadgeInfo`: a badge's figures only ever arrive because a
 * badge display asked for them, so they are handed to that open request; the widget keeps them only
 * for the badge it is waiting on.
 */
export const registerRoomBadgeDisplayHandlers = ({ subscribe }: WebSocketConnection) => {
    const { updateRoomWidgetData } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(BadgeInfoMessage, (data) => {
            updateRoomWidgetData(RoomObjectWidgetRequestEvent.BADGE_DISPLAY_ENGRAVING, data);
        }),
    ]);
};

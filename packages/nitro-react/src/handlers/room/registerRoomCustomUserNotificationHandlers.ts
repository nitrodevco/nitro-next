import { CustomUserNotificationMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { customUserNotificationTypeOf, roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * `CustomUserNotificationWidgetHandler`: a furni the user could not use for want of a costume or
 * VIP, or a talent show vote with no stage or audience, opens the widget's window. The handler
 * belongs to the room's widgets, so the packet means nothing outside a room.
 */
export const registerRoomCustomUserNotificationHandlers = ({ subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(CustomUserNotificationMessage, (data) => {
        const { room, openCustomUserNotification } = roomStore.getState();
        const type = customUserNotificationTypeOf(data.code);

        if (room && type) openCustomUserNotification(type);
    }),
]);

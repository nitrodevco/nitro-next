import { IRoomWidgetRequest, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { GetGuestRoomResultMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/** What a room-link teleport is told about where it leads. */
export type RoomLinkData = {
    roomId: number;
    roomName: string;
    ownerName: string;
};

/**
 * A room-link teleport names its destination before using it, which means asking the navigator
 * what that room is called.
 *
 * Room info arrives constantly and for every other reason - entering a room, the room info
 * popup, a forward - so nothing is written unless a teleport is actually waiting on an answer.
 * Whether the answer is about the room it asked about is the widget's to decide, since only it
 * knows which id the furni points at.
 */
export const registerRoomLinkHandlers = ({ subscribe }: WebSocketConnection) => {
    const getRequest = () => roomStore.getState().openWidgets[RoomObjectWidgetRequestEvent.ROOM_LINK] as IRoomWidgetRequest<RoomLinkData> | undefined;
    const { updateRoomWidgetData } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(GetGuestRoomResultMessage, (data) => {
            if (!getRequest()) return;

            updateRoomWidgetData(RoomObjectWidgetRequestEvent.ROOM_LINK, {
                roomId: data.roomInfo.roomId,
                roomName: data.roomInfo.name,
                ownerName: data.roomInfo.ownerName,
            });
        }),
    ]);
};

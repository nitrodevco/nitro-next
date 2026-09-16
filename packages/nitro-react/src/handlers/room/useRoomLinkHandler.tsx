import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { GetGuestRoomResultMessage } from '@nitrodevco/nitro-packets';

import { useRoomWidget, useRoomWidgetActions } from '#base/context';
import { useMessageListener } from '#base/hooks';

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
export const useRoomLinkHandler = () => {
    const request = useRoomWidget<RoomLinkData>(RoomObjectWidgetRequestEvent.ROOM_LINK);
    const { updateRoomWidgetData } = useRoomWidgetActions();

    useMessageListener(GetGuestRoomResultMessage, (data) => {
        if (!request) return;

        updateRoomWidgetData(RoomObjectWidgetRequestEvent.ROOM_LINK, {
            roomId: data.roomInfo.roomId,
            roomName: data.roomInfo.name,
            ownerName: data.roomInfo.ownerName,
        });
    });
};

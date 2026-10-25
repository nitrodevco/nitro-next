import { NewFriendRequestMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * A friend request arriving while you are in a room also pops up over whoever sent it, if they
 * are standing there - `RoomUsersHandler.onFriendRequest`. The friend list gets the same message
 * through the messenger handler; this only adds the bubble.
 */
export const registerRoomFriendRequestHandlers = ({ subscribe }: WebSocketConnection) => {
    const { addRoomFriendRequest } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(NewFriendRequestMessage, (data) => {
            addRoomFriendRequest(data.request.playerId, data.request.name);
        }),
    ]);
};

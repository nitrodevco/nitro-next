import { DoorbellMessage, FlatAccessDeniedMessage, FlatAccessibleMessage, LetUserInComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * People ringing at the door of the room you are in. A name on any of these three is somebody
 * else: the empty-name variants are your own ring at someone else's door, which the navigator
 * answers instead.
 *
 * `RoomUsersHandler.onDoorbell` and `RoomSessionHandler`'s two access replies - the replies are
 * how a second room controller answering the door clears the caller from your list too.
 */
export const registerRoomDoorbellHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const { addDoorbellUser, removeDoorbellUser } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(DoorbellMessage, (data) => {
            if (!data.username.length) return;

            // A full list is refused rather than queued, as `DoorbellWidget.addUser` did.
            if (!addDoorbellUser(data.username)) send(new LetUserInComposer({ username: data.username, canEnter: false }));
        }),

        on(FlatAccessibleMessage, (data) => {
            if (data.username.length) removeDoorbellUser(data.username);
        }),

        on(FlatAccessDeniedMessage, (data) => {
            if (data.username.length) removeDoorbellUser(data.username);
        }),
    ]);
};

import { LetUserInComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomDoorbellActions, useRoomDoorbellUsers } from '#base/context/room';
import { RoomDoorbellView } from '#base/views/room-widgets/doorbell/RoomDoorbellView';

/**
 * The door of the room you are in, for whoever may answer it. Nobody else is ever told that
 * somebody rang, so the list filling up is itself the permission check.
 *
 * Answering does not wait for the server: Flash dropped the caller from its own list as it sent,
 * and the room fills in the rest.
 */
export const RoomDoorbellWidget = () => {
    const users = useRoomDoorbellUsers();
    const { removeDoorbellUser } = useRoomDoorbellActions();
    const { send } = useWebSocketContext();

    if (!users.length) return null;

    const answer = (username: string, canEnter: boolean) => {
        send(new LetUserInComposer({ username, canEnter }));
        removeDoorbellUser(username);
    };

    return (
        <RoomDoorbellView
            users={users}
            onAccept={username => answer(username, true)}
            onDeny={username => answer(username, false)}
            // The Flash close button was a refusal, not a dismissal: `DoorbellView.onClose` denied all.
            onClose={() => users.forEach(username => answer(username, false))}
        />
    );
};

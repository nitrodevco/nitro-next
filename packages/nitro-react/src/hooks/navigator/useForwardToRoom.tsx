import { GetGuestRoomComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context';

import { useNavigatorVisibility } from './useNavigatorVisibility';

/**
 * `HabboNewNavigator.goToRoom(roomId)` / `IncomingMessages.forwardToRoom`: a room forward
 * asks for the room info with roomForward set and closes the navigator window. The
 * GetGuestRoomResult handler then starts the session, or shows the doorbell / password
 * popup first for a locked room.
 */
export const useForwardToRoom = () => {
    const { send } = useWebSocketContext();
    const { hide } = useNavigatorVisibility();

    return (roomId: number) => {
        send(new GetGuestRoomComposer({ roomId, enterRoom: false, roomForward: true }));

        hide();
    };
};

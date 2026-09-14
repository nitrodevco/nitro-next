import { OpenFlatConnectionComposer } from '@nitrodevco/nitro-packets';

import { useSystemActions, useWebSocketContext } from '#base/context';

/**
 * `HabboNavigator.goToRoom` -> `RoomSessionManager.gotoRoom` -> `RoomSession.start()`: sends
 * the OpenFlatConnection (unless the server is opening the connection itself, Flash's
 * `skipOpc`) and starts the room session right away - RSE_STARTED is what makes the room
 * engine create the room and the UI leave the hotel view, before any reply from the server.
 */
export const useGoToRoom = () => {
    const { send } = useWebSocketContext();
    const { startRoomSession } = useSystemActions();

    return (roomId: number, password: string = '', skipOpenConnection: boolean = false) => {
        if (!skipOpenConnection) send(new OpenFlatConnectionComposer({ roomId, password, unknown1: -1 }));

        startRoomSession(roomId);
    };
};

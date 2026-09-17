import { goToRoom } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';

/** `goToRoom` bound to the socket, for components. */
export const useGoToRoom = () => {
    const { send } = useWebSocketContext();

    return (roomId: number, password: string = '', skipOpenConnection: boolean = false) => goToRoom(send, roomId, password, skipOpenConnection);
};

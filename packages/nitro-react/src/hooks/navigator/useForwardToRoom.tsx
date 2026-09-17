import { forwardToRoom } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';

/** `forwardToRoom` bound to the socket, for components. */
export const useForwardToRoom = () => {
    const { send } = useWebSocketContext();

    return (roomId: number) => forwardToRoom(send, roomId);
};

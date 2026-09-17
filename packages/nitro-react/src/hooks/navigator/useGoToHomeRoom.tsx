import { goToHomeRoom } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';

/** `goToHomeRoom` bound to the socket, for components. Returns false when no home room is set. */
export const useGoToHomeRoom = () => {
    const { send } = useWebSocketContext();

    return () => goToHomeRoom(send);
};

import { useEffect } from 'react';

import { useWebSocketContext, WebSocketConnection } from '#base/context/communication';

/**
 * Attaches a set of plain packet handlers for as long as the calling component is mounted.
 *
 * The socket is read once: `send` and `subscribe` close over refs only, so the first copy stays
 * good for the life of the connection, and re-registering on every render would only churn the
 * listener lists. Mounting inside the tree the socket provider wraps is what puts registration
 * ahead of `setReady()`, which flushes the packets that arrived before the UI was up.
 */
export const useRegisterHandlers = (register: (socket: WebSocketConnection) => () => void) => {
    const socket = useWebSocketContext();

    useEffect(() => register(socket), []);
};

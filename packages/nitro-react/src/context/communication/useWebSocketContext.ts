import { useContext } from 'react';

import { WebSocketContext } from './WebSocketContext';

/** The socket's context (`WebSocketContext`), for a component inside `WebSocketContextProvider`. */
export const useWebSocketContext = () => {
    const ctx = useContext(WebSocketContext);

    if (!ctx) throw new Error('useWebSocketContext must be used within WebSocketContextProvider');

    return ctx;
};

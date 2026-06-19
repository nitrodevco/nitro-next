import { useContext } from 'react';

import { WebSocketContext } from './WebSocketContext';

export const useWebSocketContext = () => {
    const ctx = useContext(WebSocketContext);

    if (!ctx) throw new Error('useRoomContext must be used within RoomContextProvider');

    return ctx;
}
import type { IncomingPacketConstructor, IOutgoingPacket } from '@nitrodevco/nitro-api';
import { createContext } from 'react';

type WebSocketStore = {
    isAuthenticated: boolean,
    isConnectionReady: boolean,
    connect: () => void,
    send: <T extends object>(...packets: IOutgoingPacket<T>[]) => void,
    subscribe: <T extends object>(event: IncomingPacketConstructor<T>, handler: (data: T) => void) => void;
    setReady: () => void
}

export const WebSocketContext = createContext<WebSocketStore | undefined>(undefined);
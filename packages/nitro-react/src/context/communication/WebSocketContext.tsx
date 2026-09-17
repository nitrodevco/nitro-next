import { IncomingPacketConstructor, IOutgoingPacket } from '@nitrodevco/nitro-api';
import { createContext } from 'react';

type WebSocketStore = {
    isAuthenticated: boolean;
    isDisconnected: boolean;
    connect: () => void;
    send: <T extends object>(...packets: IOutgoingPacket<T>[]) => void;
    /** Returns the unsubscribe. */
    subscribe: <T extends object>(event: IncomingPacketConstructor<T>, handler: (data: T) => void) => () => void;
    setReady: () => void;
};

/**
 * The part of the socket that code outside React needs: packet handlers subscribe through it and
 * commands send through it. Both functions close over refs only, so one captured copy stays good
 * for the life of the connection.
 */
export type WebSocketConnection = Pick<WebSocketStore, 'send' | 'subscribe'>;

export const WebSocketContext = createContext<WebSocketStore | undefined>(undefined);

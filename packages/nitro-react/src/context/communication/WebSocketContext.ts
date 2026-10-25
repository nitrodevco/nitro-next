/**
 * The socket's React context: whether the session is authenticated or disconnected, and the
 * functions to connect, send, subscribe to incoming packets, release the packets held until the
 * handlers are registered and add a client module's packets. `WebSocketContextProvider` fills it.
 */
import { IncomingPacketConstructor, IOutgoingPacket, OutgoingPacketConstructor } from '@nitrodevco/nitro-api';
import { createContext } from 'react';

type WebSocketStore = {
    isAuthenticated: boolean;
    isDisconnected: boolean;
    connect: () => void;
    send: <T extends object>(...packets: IOutgoingPacket<T>[]) => void;
    /** Returns the unsubscribe. */
    subscribe: <T extends object>(event: IncomingPacketConstructor<T>, handler: (data: T) => void) => () => void;
    setReady: () => void;
    /**
     * Adds a packet a client module brings at run time, at a header no packet holds yet, and
     * returns its removal - `undefined` when the header is taken.
     */
    registerExtensionPacket: (packet: ExtensionPacket) => (() => void) | undefined;
};

/** A client module's own packet: a parser at an incoming header or a composer at an outgoing one. */
export type ExtensionPacket
    = | { direction: 'incoming'; header: number; ctor: IncomingPacketConstructor<object> }
        | { direction: 'outgoing'; header: number; ctor: OutgoingPacketConstructor<object> };

/**
 * The part of the socket that code outside React needs: packet handlers subscribe through it,
 * commands send through it and client modules add their packets through it. Both functions close over refs only, so one captured copy stays good
 * for the life of the connection.
 */
export type WebSocketConnection = Pick<WebSocketStore, 'send' | 'subscribe' | 'registerExtensionPacket'>;

/** The connection's `send`, the first argument of every command. */
export type Send = WebSocketConnection['send'];

export const WebSocketContext = createContext<WebSocketStore | undefined>(undefined);

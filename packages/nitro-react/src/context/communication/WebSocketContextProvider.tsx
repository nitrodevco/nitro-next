/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ICodec, IMessageDataWrapper, IncomingPacketConstructor, IOutgoingPacket } from '@nitrodevco/nitro-api';
import { NitroLogger } from '@nitrodevco/nitro-api';
import { EvaWireFormat } from '@nitrodevco/nitro-shared';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';

import { useCommunicationIncoming, useCommunicationOutgoing } from '#base/hooks/communication';

import { WebSocketContext } from './WebSocketContext';

type ProviderProps = {
    children: ReactNode;
}

const pendingClientMessages: IOutgoingPacket<any>[] = [];
const pendingServerMessages: IMessageDataWrapper[] = [];

export const WebSocketContextProvider = ({ children }: ProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isConnectionReady, setIsConnectionReady] = useState<boolean>(false);
    const { incomingByHeader, incomingCtors, incomingHeaderByCtor } = useCommunicationIncoming();
    const { outgoingHeaderByComposerName } = useCommunicationOutgoing();
    const ws = useRef<WebSocket | undefined>(undefined);
    const wsBuffer = useRef<ArrayBuffer>(new ArrayBuffer(0));
    const wsCodec = useRef<ICodec>(new EvaWireFormat());
    const listeners = useRef<Map<IncomingPacketConstructor<object>, Array<(data: object) => void>>>(new Map());

    const connect = (url: string) => {
        try {
            ws.current?.close();

            const connection = new WebSocket(url);

            connection.binaryType = 'arraybuffer';

            connection.onopen = event => { };
            connection.onerror = event => { };
            connection.onclose = event => { };
            connection.onmessage = (event: MessageEvent<ArrayBuffer>) => {
                const array = new Uint8Array(wsBuffer.current.byteLength + event.data.byteLength);

                array.set(new Uint8Array(wsBuffer.current), 0);
                array.set(new Uint8Array(event.data), event.data.byteLength);

                wsBuffer.current = array.buffer;

                processBuffer(wsBuffer.current);
            }
        } catch (err) {
            NitroLogger.error(err);
        }
    }

    const processBuffer = (buffer: ArrayBuffer) => {
        try {
            if (buffer.byteLength === 0) return;

            const wrappers = wsCodec.current.decode(buffer);

            for (const wrapper of wrappers) {
                try {
                    const ctor = incomingByHeader.current.get(wrapper.header);

                    if (!ctor) continue;

                    const handlers = listeners.current.get(ctor);

                    if (!handlers?.length) continue;


                    const parsed = new ctor().parse(wrapper);

                    for (const handle of handlers) handle(parsed);
                } catch (err) {
                    NitroLogger.error(err);
                }
            }
        } catch (err) {
            NitroLogger.error(err);
        }
    }

    const send = <T extends object,>(...packets: IOutgoingPacket<T>[]) => {
        if (!packets?.length) return;

        if (!ws.current || !isAuthenticated || !isConnectionReady || ws.current.readyState !== WebSocket.OPEN) {
            pendingClientMessages.push(...packets);

            return;
        }

        for (const outgoing of packets) {
            try {
                const name = outgoing.constructor.name;
                const header = outgoingHeaderByComposerName.current.get(name);

                if (header == null) {
                    NitroLogger.packets('UnknownOutgoing', name);

                    continue;
                }

                const message = outgoing.compose();
                const encoded = wsCodec.current.encode(header, message);

                if (!encoded) continue;

                NitroLogger.packets('OutgoingComposer', header, name, message);

                ws.current.send(encoded.getBuffer());
            } catch (e) {
                NitroLogger.error(e);
            }
        }
    }

    const subscribe = <T extends object>(
        event: IncomingPacketConstructor<T>,
        handler: (data: T) => void
    ) => {
        if (!incomingCtors.current.has(event)) {
            const header = incomingHeaderByCtor.current.get(event);

            NitroLogger.error(
                'CommunicationStore',
                `Invalid listener: packet ${event?.name ?? '(unknown)'} is not registered.` +
                (header != null ? ` (header: ${header})` : ''),
            );

            return () => { };
        }

        const existing = listeners.current.get(event) ?? [];

        listeners.current.set(event, [...existing, handler]);

        return () => {
            const existing = listeners.current.get(event) ?? [];
            const next = existing.filter(x => x !== handler);

            if (next.length) listeners.current.set(event, next);
            else listeners.current.delete(event);
        };
    };

    return (
        <WebSocketContext.Provider value={{ isAuthenticated, isConnectionReady: isConnectionReady, connect, send, subscribe }}>
            {children}
        </WebSocketContext.Provider>
    );
};
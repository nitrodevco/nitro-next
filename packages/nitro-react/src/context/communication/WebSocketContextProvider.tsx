
import type { ICodec, IMessageDataWrapper, IncomingPacketConstructor, IOutgoingPacket } from '@nitrodevco/nitro-api';
import { NitroLogger } from '@nitrodevco/nitro-api';
import { GetTickerTime } from '@nitrodevco/nitro-renderer';
import { AuthenticationOKMessage, ClientHelloComposer, EvaWireFormat, GetIncomingPackets, GetOutgoingPackets, SSOTicketComposer } from '@nitrodevco/nitro-shared';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import { useCommunicationIncoming, useCommunicationOutgoing } from '#base/hooks/communication';
import { useConfigurationStore } from '#base/stores';

import { WebSocketContext } from './WebSocketContext';

type ProviderProps = {
    children: ReactNode;
}

export const WebSocketContextProvider = ({ children }: ProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isReady, setIsReady] = useState<boolean>(false);
    const { incomingByHeader, incomingCtors, incomingHeaderByCtor, registerManyIncoming } = useCommunicationIncoming();
    const { outgoingHeaderByComposerName, registerManyOutgoing } = useCommunicationOutgoing();
    const socketUrl = useConfigurationStore(x => x.config['socket.url'] as string) ?? undefined;
    const production = useConfigurationStore(x => x.config['production.version'] as string) ?? undefined;
    const ws = useRef<WebSocket | undefined>(undefined);
    const wsBuffer = useRef<ArrayBuffer>(new ArrayBuffer(0));
    const wsCodec = useRef<ICodec>(new EvaWireFormat());
    const listeners = useRef<Map<IncomingPacketConstructor<object>, Array<(data: object) => void>>>(new Map());
    const pendingClientMessages = useRef<IOutgoingPacket<object>[]>([]);
    const pendingServerMessages = useRef<IMessageDataWrapper[]>([]);

    const connect = () => {
        try {
            if (!socketUrl || !socketUrl.length) return;

            ws.current?.close();

            ws.current = new WebSocket(socketUrl);

            ws.current.binaryType = 'arraybuffer';

            ws.current.onopen = event => {
                send(new ClientHelloComposer({
                    production: production,
                    platform: 'WEB',
                    clientPlatform: 0,
                    deviceCategory: 0
                }));

                const params = new URLSearchParams(window.location.search);
                const sso = params.get('sso');

                if (sso && sso.length) send(new SSOTicketComposer({
                    ssoTicket: sso,
                    elapsedMilliseconds: GetTickerTime()
                }));
            };

            ws.current.onerror = event => {
                NitroLogger.error('WebSocket error:', event);
            };

            ws.current.onclose = event => {
                NitroLogger.warn('WebSocket closed:', event.code, event.reason);
                setIsAuthenticated(false);
                setIsReady(false);
            };

            ws.current.onmessage = (event: MessageEvent<ArrayBuffer>) => {
                const array = new Uint8Array(wsBuffer.current.byteLength + event.data.byteLength);

                array.set(new Uint8Array(wsBuffer.current), 0);
                array.set(new Uint8Array(event.data), wsBuffer.current.byteLength);

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

            if (isAuthenticated && !isReady) {
                pendingServerMessages.current.push(...wrappers);

                return;
            }

            processWrappers(...wrappers);
        } catch (err) {
            NitroLogger.error(err);
        }
    }

    const processWrappers = (...wrappers: IMessageDataWrapper[]) => {
        try {
            if (!wrappers || !wrappers.length) return;

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

        if (isAuthenticated && !isReady) {
            pendingClientMessages.current.push(...packets);

            return;
        }

        sendRaw(...packets);
    }

    const sendRaw = <T extends object,>(...packets: IOutgoingPacket<T>[]) => {
        if (!packets?.length) return;

        if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;

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

    const setReady = () => {
        if (isReady) return;

        const pendingClient = pendingClientMessages.current;
        const pendingServer = pendingServerMessages.current;

        pendingServerMessages.current = [];
        pendingClientMessages.current = [];

        setIsReady(true);

        processWrappers(...pendingServer);
        sendRaw(...pendingClient);
    }

    useEffect(() => {
        registerManyIncoming(GetIncomingPackets());
        registerManyOutgoing(GetOutgoingPackets());
    }, []);

    useEffect(() => {
        if (isAuthenticated) return;

        return subscribe(AuthenticationOKMessage, data => {
            setIsAuthenticated(true);
        });
    }, []);

    return (
        <WebSocketContext.Provider value={{ isAuthenticated, connect, send, subscribe, setReady }}>
            {children}
        </WebSocketContext.Provider>
    );
};
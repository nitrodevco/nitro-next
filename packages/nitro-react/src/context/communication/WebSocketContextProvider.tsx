/**
 * The client's one connection to the server - the job of Flash's `HabboCommunicationManager`. It
 * opens the socket to `socket.url`, says hello and sends the SSO ticket from the page's `sso`
 * query, frames and parses packets by the registered header maps, and answers pings. From
 * authentication until `setReady` it holds packets both ways, so nothing is handled or sent before
 * the handlers are registered; a disconnect reason or a closed socket ends the session and shows
 * the alert.
 */
import { BinaryReader, BinaryWriter, Byte, ClientDeviceCategoryEnum, ClientPlatformEnum, EvaWireDataWrapper, IMessageDataWrapper, IncomingPacketConstructor, IOutgoingPacket, NitroLogger, Short } from '@nitrodevco/nitro-api';
import { AuthenticationOKMessage, ClientHelloComposer, DisconnectReasonMessage, ErrorReportMessage, GetIncomingPackets, GetOutgoingPackets, PingMessage, PongComposer, SSOTicketComposer } from '@nitrodevco/nitro-packets';
import { GetTickerTime } from '@nitrodevco/nitro-renderer';
import { ReactNode, useEffect, useRef, useState } from 'react';

import { DISCONNECT_REASON_SOCKET_CLOSED, getDisconnectReasonName, isConnectionClosingServerError, showConnectionClosed, showServerError, trackLoginStep } from '#base/commands';
import { recordBugReportPacket } from '#base/context/bugreport';
import { recordClientErrorBreadcrumb } from '#base/context/clienterrors';
import { onboardingStore } from '#base/context/onboarding';
import { useCommunicationIncoming, useCommunicationOutgoing } from '#base/hooks/communication';
import { isPreviewHost } from '#base/utils';

import { useConfigValue } from '../system';
import { ExtensionPacket, WebSocketContext } from './WebSocketContext';

type ProviderProps = {
    children: ReactNode;
};

type ConnectionPhase = 'idle' | 'connecting' | 'authenticating' | 'awaitingHandlers' | 'ready' | 'closed';

/** `HabboCommunicationManager.port`: the port the socket went to, the scheme's own when the URL names none. */
const socketPort = (url: string) => {
    try {
        const parsed = new URL(url);

        return parsed.port || ((parsed.protocol === 'wss:') ? '443' : '80');
    } catch {
        return '';
    }
};

export const WebSocketContextProvider = ({ children }: ProviderProps) => {
    const phase = useRef<ConnectionPhase>('idle');
    const [ renderedPhase, setRenderedPhase ] = useState<ConnectionPhase>('idle');
    const { incomingByHeader, incomingCtors, incomingHeaderByCtor, registerIncoming, unregisterIncoming, registerManyIncoming } = useCommunicationIncoming();
    const { outgoingByHeader, outgoingHeaderByComposerName, registerOutgoing, unregisterOutgoing, registerManyOutgoing } = useCommunicationOutgoing();
    const socketUrl = useConfigValue<string>('socket.url') ?? '';
    const production = useConfigValue<string>('production.version') ?? '';
    const ws = useRef<WebSocket | undefined>(undefined);
    const wsBuffer = useRef<ArrayBuffer>(new ArrayBuffer(0));
    const listeners = useRef<Map<IncomingPacketConstructor<object>, Array<(data: object) => void>>>(new Map());
    const pendingClientMessages = useRef<IOutgoingPacket<object>[]>([]);
    const pendingServerMessages = useRef<IMessageDataWrapper[]>([]);
    const hasConnected = useRef<boolean>(false);

    const connect = () => {
        try {
            // The preview host never connects, whatever its config names (`previewHost`).
            if (isPreviewHost() || !socketUrl || !socketUrl.length || ws.current || hasConnected.current) return;

            hasConnected.current = true;

            // `HabboCommunicationDemo.initGameSocket`.
            trackLoginStep('client.init.socket.init');

            const socket = new WebSocket(socketUrl);

            ws.current = socket;

            socket.binaryType = 'arraybuffer';

            setPhase('connecting');

            socket.onopen = () => {
                setPhase('authenticating');

                // `IncomingMessages.onConnectionEstablished`; the socket has no key exchange, so the
                // handshake is done once the hello is out (`onCompleteDiffieHandshake`).
                trackLoginStep('client.init.socket.ok', socketPort(socketUrl));
                trackLoginStep('client.init.handshake.start');

                send(new ClientHelloComposer({
                    production: production,
                    platform: 'WEB',
                    clientPlatform: ClientPlatformEnum.Unknown,
                    deviceCategory: ClientDeviceCategoryEnum.Unknown,
                }));

                trackLoginStep('client.init.handshake.ok');

                const params = new URLSearchParams(window.location.search);
                const sso = params.get('sso');

                if (sso && sso.length) send(new SSOTicketComposer({
                    ssoTicket: sso,
                    elapsedMilliseconds: GetTickerTime(),
                }));
            };

            socket.onerror = (event: Event) => {
                NitroLogger.error('WebSocket error:', event);
            };

            socket.onclose = (event: CloseEvent) => {
                NitroLogger.warn('WebSocket closed:', event.code, event.reason);

                if (ws.current !== socket) return;

                closeConnection(DISCONNECT_REASON_SOCKET_CLOSED);
            };

            socket.onmessage = (event: MessageEvent<ArrayBuffer>) => {
                const array = new Uint8Array(wsBuffer.current.byteLength + event.data.byteLength);

                array.set(new Uint8Array(wsBuffer.current), 0);
                array.set(new Uint8Array(event.data), wsBuffer.current.byteLength);

                wsBuffer.current = array.buffer;

                processBuffer();
            };
        } catch (err) {
            NitroLogger.error(err);
        }
    };

    /** `IncomingMessages.onDisconnectReason` / `onConnectionDisconnected`: stop the session before showing the alert. */
    const closeConnection = (reason: number, reasonName = '') => {
        if (phase.current === 'closed') return;

        const socket = ws.current;

        ws.current = undefined;
        wsBuffer.current = new ArrayBuffer(0);
        pendingClientMessages.current = [];
        pendingServerMessages.current = [];
        setPhase('closed');
        socket?.close();
        showConnectionClosed(reason, reasonName);
    };

    const processBuffer = () => {
        try {
            if (wsBuffer.current.byteLength === 0) return;

            dispatchWrappers(decodeWrappers());
        } catch (err) {
            NitroLogger.error(err);
        }
    };

    const encode = (header: number, messages: (number | string | boolean | Byte | Short | ArrayBuffer)[]) => {
        const writer = new BinaryWriter();

        writer.writeShort(header);

        for (const value of messages) {
            let type: string = typeof value;

            if (type === 'object') {
                if (value === null) type = 'null';
                else if (value instanceof Byte) type = 'byte';
                else if (value instanceof Short) type = 'short';
                else if (value instanceof ArrayBuffer) type = 'arraybuffer';
            }

            switch (type) {
                case 'undefined':
                case 'null':
                    writer.writeShort(0);
                    break;
                case 'byte':
                    writer.writeByte((value as Byte).value);
                    break;
                case 'short':
                    writer.writeShort((value as Short).value);
                    break;
                case 'number':
                    writer.writeInt(value as number);
                    break;
                case 'boolean':
                    writer.writeByte(value ? 1 : 0);
                    break;
                case 'string':
                    if (!value) writer.writeShort(0);
                    else {
                        writer.writeString(value as string, true);
                    }
                    break;
                case 'arraybuffer':
                    writer.writeBytes(value as ArrayBuffer);
                    break;
            }
        }

        const buffer = writer.getBuffer();

        return new BinaryWriter().writeInt(buffer.byteLength).writeBytes(buffer);
    };

    const decodeWrappers = () => {
        const wrappers: IMessageDataWrapper[] = [];

        if (!wsBuffer.current || !wsBuffer.current.byteLength) return wrappers;

        const reader = new BinaryReader(wsBuffer.current);

        let consumed = 0;

        try {
            while (wsBuffer.current.byteLength - consumed >= 4) {
                const length = reader.readInt();

                if (length < 2) {
                    NitroLogger.error(`WebSocket: Malformed packet length: ${length}`);
                    ws.current?.close();
                    break;
                }

                if (length > reader.remaining()) break;

                const extracted = reader.readBytes(length);
                const header = extracted.readShort();

                recordBugReportPacket('in', header, incomingByHeader.current.get(header)?.name ?? '', length + 4);

                wrappers.push(new EvaWireDataWrapper(header, extracted));

                consumed += length + 4;
            }
        } catch (err) {
            NitroLogger.error(err);
        }

        if (consumed) wsBuffer.current = wsBuffer.current.slice(consumed);

        return wrappers;
    };

    const processWrapper = (wrapper: IMessageDataWrapper) => {
        try {
            const ctor = incomingByHeader.current.get(wrapper.header);

            if (!ctor) {
                NitroLogger.packets('UnknownIncoming', wrapper.header);

                return;
            }

            const handlers = listeners.current.get(ctor);

            if (!handlers?.length) {
                // still parse when packet logging is on, so the payload is visible
                const preview = NitroLogger.LOG_PACKETS ? new ctor().parse(wrapper) : undefined;

                NitroLogger.packets('UnhandledIncoming', wrapper.header, ctor.name, preview);

                return;
            }

            const parsed = new ctor().parse(wrapper);

            NitroLogger.packets('IncomingEvent', wrapper.header, ctor.name, parsed);

            for (const handle of handlers) handle(parsed);
        } catch (err) {
            NitroLogger.error('IncomingFailed', wrapper?.header, err);
        }
    };

    const dispatchWrappers = (wrappers: IMessageDataWrapper[]) => {
        for (let index = 0; index < wrappers.length; index++) {
            if (phase.current === 'closed') return;

            if (phase.current === 'awaitingHandlers') {
                const queued = wrappers.slice(index);

                for (const item of queued) NitroLogger.packets('IncomingQueued', item.header);

                pendingServerMessages.current.push(...queued);

                return;
            }

            processWrapper(wrappers[index]);
        }
    };

    const send = <T extends object>(...packets: IOutgoingPacket<T>[]) => {
        if (!packets?.length) return;

        if (phase.current === 'awaitingHandlers') {
            for (const item of packets) NitroLogger.packets('OutgoingQueued', item.constructor.name);

            pendingClientMessages.current.push(...packets);

            return;
        }

        sendRaw(...packets);
    };

    const sendRaw = <T extends object>(...packets: IOutgoingPacket<T>[]) => {
        if (!packets?.length) return;

        if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
            for (const item of packets) {
                NitroLogger.packets(
                    'OutgoingDropped',
                    item.constructor.name,
                    'socket not open',
                    ws.current?.readyState ?? 'no socket',
                );
            }

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
                const encoded = encode(header, message);

                if (!encoded) continue;

                NitroLogger.packets('OutgoingComposer', header, name, message);

                const buffer = encoded.getBuffer();

                recordBugReportPacket('out', header, name, buffer.byteLength);
                recordClientErrorBreadcrumb('sent', name);

                ws.current.send(buffer);
            } catch (e) {
                NitroLogger.error(e);
            }
        }
    };

    const setPhase = (next: ConnectionPhase) => {
        phase.current = next;

        setRenderedPhase(next);
    };

    const subscribe = <T extends object>(
        event: IncomingPacketConstructor<T>,
        handler: (data: T) => void,
    ) => {
        if (!incomingCtors.current.has(event)) {
            const header = incomingHeaderByCtor.current.get(event);

            NitroLogger.error(
                'WebSocketContextProvider',
                `Invalid listener: packet ${event?.name ?? '(unknown)'} is not registered.`
                + (header != null ? ` (header: ${header})` : ''),
            );

            return () => { };
        }

        const existing = listeners.current.get(event) ?? [];

        listeners.current.set(event, [ ...existing, handler ]);

        return () => {
            const existing = listeners.current.get(event) ?? [];
            const next = existing.filter(x => x !== handler);

            if (next.length) listeners.current.set(event, next);
            else listeners.current.delete(event);
        };
    };

    const setReady = () => {
        if (phase.current !== 'awaitingHandlers') return;

        const pendingClient = pendingClientMessages.current;
        const pendingServer = pendingServerMessages.current;

        pendingServerMessages.current = [];
        pendingClientMessages.current = [];

        setPhase('ready');

        dispatchWrappers(pendingServer);
        sendRaw(...pendingClient);
    };

    /** A client module's packet: never over one the client already has, gone again with the module. */
    const registerExtensionPacket = (packet: ExtensionPacket) => {
        const { header } = packet;

        if (packet.direction === 'incoming') {
            if (incomingByHeader.current.has(header) || incomingCtors.current.has(packet.ctor)) return undefined;

            registerIncoming(header, packet.ctor);

            return () => {
                if (incomingByHeader.current.get(header) !== packet.ctor) return;

                listeners.current.delete(packet.ctor);
                unregisterIncoming(header);
            };
        }

        if (outgoingByHeader.current.has(header) || outgoingHeaderByComposerName.current.has(packet.ctor.name)) return undefined;

        registerOutgoing(header, packet.ctor);

        return () => {
            if (outgoingByHeader.current.get(header) === packet.ctor) unregisterOutgoing(header);
        };
    };

    const state = { isAuthenticated: (renderedPhase === 'awaitingHandlers' || renderedPhase === 'ready'), isDisconnected: (renderedPhase === 'closed'), connect, send, subscribe, setReady, registerExtensionPacket };

    useEffect(() => {
        registerManyIncoming(GetIncomingPackets());
        registerManyOutgoing(GetOutgoingPackets());

        // `HabboCommunicationManager.suggestedLoginActions` is set from this packet, before any
        // view's handlers are registered: the new user flow reads it when the hotel view comes up.
        const unsubscribeAuth = subscribe(AuthenticationOKMessage, (data) => {
            trackLoginStep('client.init.auth.ok');
            onboardingStore.getState().setLoginActions(data.suggestedLoginActions);
            setPhase('awaitingHandlers');
        });
        const unsubscribeDisconnect = subscribe(DisconnectReasonMessage, data => closeConnection(data.reason ?? -1, getDisconnectReasonName(data.reason ?? -1)));

        // `IncomingMessages.onErrorReport` -> `HabboCommunicationDemo.handleErrorMessage`: 1001-1019 close the
        // connection (`connection.close()`, which ends as a close no reason preceded), any other code is an alert.
        const unsubscribeErrorReport = subscribe(ErrorReportMessage, (data) => {
            if (isConnectionClosingServerError(data.errorCode)) closeConnection(DISCONNECT_REASON_SOCKET_CLOSED);
            else showServerError(data.errorCode);
        });

        // IncomingMessages.onPing in the SWF replies with an empty PongMessageComposer.
        // sendRaw bypasses the pending queue so the reply is never deferred — the
        // server closes the connection (1000 "Bye") if it goes unanswered.
        const unsubscribePing = subscribe(PingMessage, () => sendRaw(new PongComposer({})));

        return () => {
            unsubscribeAuth();
            unsubscribeDisconnect();
            unsubscribeErrorReport();
            unsubscribePing();
        };
    }, []);

    useEffect(() => () => {
        const socket = ws.current;

        ws.current = undefined;

        socket?.close(1000, 'Client shutting down');
    }, []);

    return (
        <WebSocketContext.Provider value={state}>
            {children}
        </WebSocketContext.Provider>
    );
};

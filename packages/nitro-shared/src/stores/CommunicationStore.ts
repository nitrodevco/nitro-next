import type { ICodec } from '@nitrodevco/nitro-api';
import {
    type IMessageDataWrapper,
    type IncomingPacketConstructor,
    type IOutgoingPacket,
    NitroLogger,
    type OutgoingPacketConstructor,
} from '@nitrodevco/nitro-api';
import { createStore } from 'zustand';

import { EvaWireFormat } from '../utils';

let webSocket: WebSocket | undefined = undefined;
let arrayBuffer: ArrayBuffer = new ArrayBuffer(0);

const incomingByHeader = new Map<number, IncomingPacketConstructor<any>>();
const incomingCtors = new Set<IncomingPacketConstructor<any>>();
const incomingHeaderByCtor = new Map<IncomingPacketConstructor<any>, number>();
const outgoingByHeader = new Map<number, OutgoingPacketConstructor<any>>();
const outgoingHeaderByComposerName = new Map<string, number>();

type State = {
    codec: ICodec;
    listeners: Map<IncomingPacketConstructor<any>, Array<(data: any) => void>>;
    pendingClientMessages: IOutgoingPacket<any>[];
    pendingServerMessages: IMessageDataWrapper[];
    isAuthenticated: boolean;
    isReady: boolean;
};

type Actions = {
    connect: (url: string) => () => void;
    processData: (buffer: ArrayBuffer) => void;
    processWrappers: (...wrappers: IMessageDataWrapper[]) => void;
    send: <T>(...packets: IOutgoingPacket<T>[]) => void;
    registerIncomingPacket: (header: number, ctor: IncomingPacketConstructor<any>) => void;
    registerIncomingPackets: (packets: Record<number, IncomingPacketConstructor<any>>) => void;
    registerOutgoingPacket: (header: number, ctor: OutgoingPacketConstructor<any>) => void;
    registerOutgoingPackets: (packets: Record<number, OutgoingPacketConstructor<any>>) => void;
    subscribe: <T>(event: IncomingPacketConstructor<T>, handler: (data: T) => void) => () => void;
};

const initialState: State = {
    codec: new EvaWireFormat(),
    listeners: new Map(),
    pendingClientMessages: [],
    pendingServerMessages: [],
    isAuthenticated: false,
    isReady: false,
};

export const CommunicationStore = createStore<State & Actions>((set, get) => ({
    ...initialState,
    connect: (url: string): (() => void) => {
        try {
            webSocket?.close();
        } catch (err) {
            NitroLogger.error(err);
        }

        webSocket = new WebSocket(url);

        webSocket.binaryType = 'arraybuffer';

        webSocket.onopen = () => {};
        webSocket.onerror = error => {};
        webSocket.onclose = () => {};
        webSocket.onmessage = event => {
            const data = event.data;

            if (!(data instanceof ArrayBuffer)) return;

            const array = new Uint8Array(arrayBuffer.byteLength + data.byteLength);

            array.set(new Uint8Array(arrayBuffer), 0);
            array.set(new Uint8Array(data), data.byteLength);

            arrayBuffer = array.buffer;

            get().processData(arrayBuffer);
        };

        return () => {
            try {
                webSocket?.close();
            } catch (err) {
                NitroLogger.error(err);
            }

            webSocket = undefined;
        };
    },
    processData: (buffer: ArrayBuffer) => {
        try {
            if (buffer.byteLength === 0) return;

            const state = get();
            const wrappers = state.codec.decode(buffer);

            if (!wrappers || !wrappers.length) return;

            state.processWrappers(...wrappers);
        } catch (e) {
            NitroLogger.error('useWebsocket', 'Error processing received data:', e);
        }
    },
    processWrappers: (...wrappers: IMessageDataWrapper[]) => {
        if (!wrappers?.length) return;

        const state = get();

        for (const wrapper of wrappers) {
            try {
                const ctor = incomingByHeader.get(wrapper.header);

                if (!ctor) continue;

                const handlers = state.listeners.get(ctor);

                if (!handlers?.length) continue;

                const parsed = new ctor().parse(wrapper);

                for (const handle of handlers) handle(parsed);
            } catch (e) {
                NitroLogger.error('CommunicationStore', 'Error processing received data wrapper:', e);
            }
        }
    },
    send: <T>(...packets: IOutgoingPacket<T>[]) => {
        if (!packets?.length) return;

        const state = get();

        if (state.isAuthenticated && !state.isReady) {
            set(state => ({
                pendingClientMessages: [...state.pendingClientMessages, ...packets],
            }));

            return;
        }

        if (!webSocket || webSocket.readyState !== WebSocket.OPEN) return;

        for (const outgoing of packets) {
            try {
                const name = outgoing.constructor.name;
                const header = outgoingHeaderByComposerName.get(name);

                if (header == null) {
                    NitroLogger.packets('UnknownOutgoing', name);

                    continue;
                }

                const message = outgoing.compose();
                const encoded = state.codec.encode(header, message);

                if (!encoded) continue;

                NitroLogger.packets('OutgoingComposer', header, name, message);

                webSocket.send(encoded.getBuffer());
            } catch (e) {
                NitroLogger.error('CommunicationStore', 'Error sending packet', e);
            }
        }
    },
    registerIncomingPacket: (header, ctor) => {
        incomingByHeader.set(header, ctor);
        incomingCtors.add(ctor);
        incomingHeaderByCtor.set(ctor, header);
    },
    registerIncomingPackets: packets => {
        for (const [header, ctor] of Object.entries(packets)) {
            const h = Number(header);

            incomingByHeader.set(h, ctor);
            incomingCtors.add(ctor);
            incomingHeaderByCtor.set(ctor, h);
        }
    },
    registerOutgoingPacket: (header, ctor) => {
        outgoingByHeader.set(header, ctor);
        outgoingHeaderByComposerName.set(ctor.name, header);
    },
    registerOutgoingPackets: packets => {
        for (const [header, ctor] of Object.entries(packets)) {
            const h = Number(header);
            outgoingByHeader.set(h, ctor);
            outgoingHeaderByComposerName.set(ctor.name, h);
        }
    },
    subscribe: <T>(event: IncomingPacketConstructor<T>, handler: (data: T) => void): (() => void) => {
        if (!incomingCtors.has(event)) {
            const header = incomingHeaderByCtor.get(event);

            NitroLogger.error(
                'CommunicationStore',
                `Invalid listener: packet ${event?.name ?? '(unknown)'} is not registered.` +
                    (header != null ? ` (header: ${header})` : ''),
            );

            return () => {};
        }

        set(state => {
            const listeners = new Map(state.listeners);
            const existing = listeners.get(event) ?? [];

            listeners.set(event, [...existing, handler as any]);

            return { listeners };
        });

        return () => {
            set(state => {
                const listeners = new Map(state.listeners);
                const existing = listeners.get(event) ?? [];
                const next = existing.filter(cb => cb !== handler);

                if (next.length) listeners.set(event, next);
                else listeners.delete(event);

                return { listeners };
            });
        };
    },
}));

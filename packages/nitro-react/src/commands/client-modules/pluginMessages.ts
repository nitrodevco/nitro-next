/**
 * Not Flash's: Turbo's named plugin messages (`client.messages`, Turbo's `docs/plugin-messages.md`).
 * The server names each message with the header it gave it and its schema; this keeps that map,
 * reads every listed header into an object by its schema and hands it to the modules listening by
 * name, and writes a module's object to the message's header. Modules never see a header.
 */
import { IMessageDataWrapper, NitroLogger } from '@nitrodevco/nitro-api';
import type { ITurboPluginMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';

import { decodePluginMessage, encodePluginMessage, parsePluginMessageSchema, PluginMessageField, PluginMessageWireValue } from './pluginMessageCodec';

type Listener = (data: Record<string, unknown>) => void;

type Registered = { header: number; fields: PluginMessageField[]; send: (values: PluginMessageWireValue[]) => void; dispose: () => void };

let connection: WebSocketConnection | undefined;
let listed: Map<string, Registered> | undefined;

const listeners = new Map<string, Set<Listener>>();
const warned = new Set<string>();

/** Once per name and kind, so a module sending every frame does not flood the log. */
const warnOnce = (key: string, message: string) => {
    if (warned.has(key)) return;

    warned.add(key);
    NitroLogger.warn('ClientModules', message);
};

/** The parser and composer of one message at its header, through the connection's extension packets. */
const register = (socket: WebSocketConnection, name: string, header: number, fields: PluginMessageField[]): Registered | undefined => {
    const Parser = class {
        public parse(wrapper: IMessageDataWrapper) {
            return decodePluginMessage(wrapper, fields);
        }
    };
    const Composer = class {
        public constructor(private readonly values: PluginMessageWireValue[]) { }

        public compose() {
            return this.values;
        }
    };

    Object.defineProperty(Parser, 'name', { value: `PluginMessage(${name})` });
    Object.defineProperty(Composer, 'name', { value: `PluginMessageComposer(${name})` });

    const unregisterIncoming = socket.registerExtensionPacket({ direction: 'incoming', header, ctor: Parser });
    const unregisterOutgoing = socket.registerExtensionPacket({ direction: 'outgoing', header, ctor: Composer });

    if (!unregisterIncoming || !unregisterOutgoing) {
        unregisterIncoming?.();
        unregisterOutgoing?.();
        NitroLogger.warn('ClientModules', `Plugin message ${name}: header ${header} is taken by a client module's own packet.`);

        return undefined;
    }

    const unsubscribe = socket.subscribe(Parser, (data) => {
        for (const listener of [ ...(listeners.get(name) ?? []) ]) {
            try {
                listener(data);
            } catch (error) {
                NitroLogger.error('ClientModules', `Plugin message ${name}: a listener failed`, error);
            }
        }
    });

    return {
        header,
        fields,
        send: values => socket.send(new Composer(values)),
        dispose: () => {
            unsubscribe();
            unregisterIncoming();
            unregisterOutgoing();
        },
    };
};

/** Takes the server's whole set (`TurboPluginMessagesMessage`), replacing the last. */
export const syncPluginMessages = (socket: WebSocketConnection, messages: ITurboPluginMessage[]) => {
    stopPluginMessages();

    connection = socket;
    listed = new Map();

    for (const message of messages) {
        let fields: PluginMessageField[];

        try {
            fields = parsePluginMessageSchema(message.schema, message.name);
        } catch (error) {
            NitroLogger.warn('ClientModules', `Plugin message ${message.name}: its schema cannot be read`, error);

            continue;
        }

        const registered = register(socket, message.name, message.header, fields);

        if (registered) listed.set(message.name, registered);
    }
};

/** Forgets the map: the connection closed, or the server declined `client.messages`. */
export const stopPluginMessages = () => {
    for (const registered of listed?.values() ?? []) registered.dispose();

    listed = undefined;
    connection = undefined;
};

/**
 * Listens for a message by name. A name the server's map does not list warns once; the listener is
 * kept all the same, as a plugin loading on the server sends its module before its messages' map.
 */
export const onPluginMessage = (owner: string, name: string, listener: Listener): (() => void) => {
    if (listed && !listed.has(name)) warnOnce(`on:${name}`, `${owner}: the server lists no plugin message ${name} yet; nothing will arrive until it does.`);

    let set = listeners.get(name);

    if (!set) listeners.set(name, set = new Set());

    set.add(listener);

    return () => {
        set.delete(listener);

        if (!set.size) listeners.delete(name);
    };
};

/** Sends a message by name, written from its schema; a name the server did not list warns and sends nothing. */
export const sendPluginMessage = (owner: string, name: string, value: Record<string, unknown>) => {
    const registered = listed?.get(name);

    if (!registered || !connection) {
        warnOnce(`send:${name}`, `${owner}: the server lists no plugin message ${name}; not sent.`);

        return;
    }

    const values = encodePluginMessage(value, registered.fields, name, (kind, path) => warnOnce(`${kind}:${path}`, kind === 'unknown'
        ? `${owner}: ${path} is not a field of the server's ${name}; ignored.`
        : `${owner}: ${path} was not given; sent as its default.`));

    registered.send(values);
};

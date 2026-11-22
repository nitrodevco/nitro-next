import assert from 'node:assert/strict';
import { test } from 'node:test';

import { BinaryReader, EvaWireDataWrapper, IMessageDataWrapper } from '@nitrodevco/nitro-api';
import { IncomingHeader, RoomEntryInfoMessage } from '@nitrodevco/nitro-packets';

import { corePacketOf, corePacketParserOf } from '../src/commands/client-modules/clientModuleCorePackets';
import { parsePluginMessageSchema } from '../src/commands/client-modules/pluginMessageCodec';
import { onPluginMessage, sendPluginMessage, stopPluginMessages, syncPluginMessages } from '../src/commands/client-modules/pluginMessages';

// The schema Turbo sends for `PortalRoom(int RoomId, IComposer? Carried = null)`.
const PORTAL_ROOM = '[["roomId","int"],["carried","packet"]]';

/**
 * A room watch's envelope as turbo-cloud's PackageEncoder writes it, less the length and its own
 * header: the plugin message's fields (roomId), then the carried packet's short header and body.
 */
const envelope = (roomId: number, innerHeader: number, body: number[]) => {
    const buffer = new ArrayBuffer(4 + 2 + body.length);
    const view = new DataView(buffer);

    view.setInt32(0, roomId);
    view.setInt16(4, innerHeader);
    body.forEach((byte, index) => view.setUint8(6 + index, byte));

    return new EvaWireDataWrapper(32767, new BinaryReader(buffer));
};

/** `RoomEntryInfoMessage`'s body: room 42, owner. */
const ROOM_ENTRY_INFO = [ 0, 0, 0, 42, 1 ];

type Parser = { new(): { parse: (wrapper: IMessageDataWrapper) => unknown } };

/** The connection's extension packets and subscriptions, as `syncPluginMessages` uses them. */
const fakeSocket = () => {
    const subscribed = new Map<Parser, (data: unknown) => void>();
    const sent: unknown[] = [];
    const socket = {
        registerExtensionPacket: () => () => undefined,
        subscribe: (parser: Parser, callback: (data: unknown) => void) => {
            subscribed.set(parser, callback);

            return () => subscribed.delete(parser);
        },
        send: (composer: unknown) => sent.push(composer),
    };

    /** What the socket does with an incoming packet at the message's header: parse, then hand to subscribers. */
    const receive = (wrapper: IMessageDataWrapper) => {
        for (const [ Parser, callback ] of subscribed) callback(new Parser().parse(wrapper));
    };

    return { socket: socket as never, receive, sent };
};

// The case that needed it: a module could not reach the packet a room watch's envelope carries after its schema's fields.
void test('a module listening by name gets a carried packet as its header and what the client\'s own parser read', () => {
    const { socket, receive } = fakeSocket();
    const heard: Record<string, unknown>[] = [];

    syncPluginMessages(socket, [ { name: 'portals.room', header: 32767, schema: PORTAL_ROOM } ]);

    const stop = onPluginMessage('portals', 'portals.room', data => heard.push(data));

    receive(envelope(7, IncomingHeader.RoomEntryInfoMessage, ROOM_ENTRY_INFO));
    stop();
    stopPluginMessages();

    assert.equal(heard.length, 1);
    assert.equal(heard[0].roomId, 7);
    assert.deepEqual(heard[0].carried, { header: IncomingHeader.RoomEntryInfoMessage, packet: { roomId: 42, isOwner: true } });

    // What a secondary room's `apply` routes by: the carried field stands for its packet.
    const packet = corePacketOf(heard[0].carried);

    assert.deepEqual(packet, { roomId: 42, isOwner: true });
    assert.equal(corePacketParserOf(packet), RoomEntryInfoMessage);
    assert.equal(corePacketOf(packet), packet);
});

void test('a carried packet at a header the client has no packet at is undefined, and a message that carries one is never sent', () => {
    const { socket, receive, sent } = fakeSocket();
    const heard: Record<string, unknown>[] = [];

    syncPluginMessages(socket, [ { name: 'portals.room', header: 32767, schema: PORTAL_ROOM } ]);

    const stop = onPluginMessage('portals', 'portals.room', data => heard.push(data));

    receive(envelope(7, 19999, [ 1, 2, 3 ]));
    sendPluginMessage('portals', 'portals.room', { roomId: 7 });
    stop();
    stopPluginMessages();

    assert.deepEqual(heard, [ { roomId: 7, carried: { header: 19999, packet: undefined } } ]);
    assert.deepEqual(sent, []);
});

void test('a packet is only a message\'s last field', () => {
    assert.deepEqual(parsePluginMessageSchema(PORTAL_ROOM).map(field => field.type), [ 'int', 'packet' ]);
    assert.throws(() => parsePluginMessageSchema('[["carried","packet"],["roomId","int"]]', 'test.first'), /test\.first\.carried: a packet is only/);
    assert.throws(() => parsePluginMessageSchema('[["roomId","int"],["carried",["array","packet"]]]', 'test.listed'), /test\.listed\.carried\[\]/);
    assert.throws(() => parsePluginMessageSchema('[["roomId","int"],["holder",["object",[["carried","packet"]]]]]', 'test.nested'), /test\.nested\.holder\.carried/);
});

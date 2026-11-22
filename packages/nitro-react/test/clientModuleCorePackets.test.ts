import assert from 'node:assert/strict';
import { test } from 'node:test';

import { BinaryReader, EvaWireDataWrapper } from '@nitrodevco/nitro-api';
import { IncomingHeader, RoomEntryInfoMessage } from '@nitrodevco/nitro-packets';

import { corePacketParserOf, parseClientModuleCorePacket } from '../src/commands/client-modules/clientModuleCorePackets';

/** A plugin's relay packet (header 25000): the inner core packet's header as an int, then its body. */
const relay = (innerHeader: number, body: (view: DataView) => number) => {
    const buffer = new ArrayBuffer(64);

    new DataView(buffer).setInt32(0, innerHeader);

    const length = 4 + body(new DataView(buffer, 4));

    return new EvaWireDataWrapper(25000, new BinaryReader(buffer.slice(0, length)));
};

/** `RoomEntryInfoMessage`'s body: room 42, owner. */
const roomEntryInfo = (view: DataView) => {
    view.setInt32(0, 42);
    view.setInt8(4, 1);

    return 5;
};

// The case that needed it: a module drawing a second room beside the current one is relayed that room's packets inside its plugin's own.
void test('a core packet a plugin relays is read by the client\'s own parser, from the module\'s reader or from bytes it took out', () => {
    const warnings: string[] = [];
    const fromReader = relay(IncomingHeader.RoomEntryInfoMessage, roomEntryInfo);
    const fromBytes = relay(IncomingHeader.RoomEntryInfoMessage, roomEntryInfo);

    const header = fromReader.readInt();

    fromBytes.readInt();

    assert.deepEqual(parseClientModuleCorePacket(header, fromReader, message => warnings.push(message)), { roomId: 42, isOwner: true });
    assert.deepEqual(parseClientModuleCorePacket(header, fromBytes.readBytes(5)!, message => warnings.push(message)), { roomId: 42, isOwner: true });
    assert.deepEqual(warnings, []);
});

void test('a header the client has no packet at, or a body that does not read as its packet, gives undefined and a warning instead of throwing', () => {
    const warnings: string[] = [];

    assert.equal(parseClientModuleCorePacket(19999, new ArrayBuffer(0), message => warnings.push(message)), undefined);
    assert.equal(parseClientModuleCorePacket(IncomingHeader.RoomEntryInfoMessage, new ArrayBuffer(2), message => warnings.push(message)), undefined);
    assert.equal(warnings.length, 2);
    assert.match(warnings[0], /19999 is not a packet/);
    assert.match(warnings[1], /RoomEntryInfoMessage\) did not read/);
});

// A secondary room's `apply` routes a packet by the parser that read it: only what `parseCore` read says which.
void test('what parseCore read names its parser, and an object of the same shape names none', () => {
    const wrapper = relay(IncomingHeader.RoomEntryInfoMessage, roomEntryInfo);
    const parsed = parseClientModuleCorePacket(wrapper.readInt(), wrapper, () => undefined);

    assert.equal(corePacketParserOf(parsed), RoomEntryInfoMessage);
    assert.equal(corePacketParserOf({ roomId: 42, isOwner: true }), undefined);
    assert.equal(corePacketParserOf(undefined), undefined);
});

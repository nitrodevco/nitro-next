import assert from 'node:assert/strict';
import { test } from 'node:test';

import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { decodePluginMessage, encodePluginMessage, parsePluginMessageSchema, PluginMessageWireValue } from '../src/commands/client-modules/pluginMessageCodec';

/** The values as the socket writes them (`WebSocketContextProvider`): number an int, boolean a byte, string with its length. */
const toBytes = (values: PluginMessageWireValue[]) => {
    const bytes: number[] = [];
    const int = (value: number) => {
        const view = new DataView(new ArrayBuffer(4));

        view.setInt32(0, value);
        bytes.push(...new Uint8Array(view.buffer));
    };

    for (const value of values) {
        if (typeof value === 'number') int(value);
        else if (typeof value === 'boolean') bytes.push(value ? 1 : 0);
        else {
            const text = new TextEncoder().encode(value);

            bytes.push((text.length >> 8) & 0xff, text.length & 0xff, ...text);
        }
    }

    return new Uint8Array(bytes);
};

/** A reader over the bytes, as the client's `EvaWireDataWrapper` reads a packet. */
const reader = (bytes: Uint8Array) => {
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    let position = 0;
    const take = (length: number) => {
        if (position + length > bytes.length) throw new RangeError('past the end');

        const at = position;

        position += length;

        return at;
    };

    return {
        readInt: () => view.getInt32(take(4)),
        readShort: () => view.getInt16(take(2)),
        readByte: () => view.getInt8(take(1)),
        readBoolean: () => view.getInt8(take(1)) === 1,
        readDouble: () => view.getFloat64(take(8)),
        readString: () => {
            const length = view.getInt16(take(2));
            const at = take(length);

            return new TextDecoder().decode(bytes.subarray(at, at + length));
        },
        get remaining() {
            return bytes.length - position;
        },
    } as unknown as IMessageDataWrapper & { remaining: number };
};

// What Turbo sends for its test record `Everything` (Turbo.Tests PluginMessageTests).
const EVERYTHING = '[["number","int"],["big","long"],["flag","bool"],["text","string"],["real","double"],["mood","int"],'
    + '["nested",["object",[["label","string"],["values",["array","int"]]]]],'
    + '["records",["array",["object",[["label","string"],["values",["array","int"]]]]]],'
    + '["words",["array","string"]],["grid",["array",["array","long"]]]]';

void test('every type round-trips through the wire, records and arrays included', () => {
    const fields = parsePluginMessageSchema(EVERYTHING, 'test.everything');
    const sent = {
        number: -7,
        big: 2 ** 40 + 3,
        flag: true,
        text: 'héllo',
        real: Math.PI,
        mood: 1,
        nested: { label: 'in', values: [ 1, 2, 3 ] },
        records: [ { label: 'a', values: [] }, { label: 'b', values: [ 9 ] } ],
        words: [ 'x', 'y' ],
        grid: [ [ 1, -2 ], [ 3 ] ],
    };

    const wire = reader(toBytes(encodePluginMessage(sent, fields)));

    assert.deepEqual(decodePluginMessage(wire, fields), sent);
    assert.equal(wire.remaining, 0);
});

void test('the bytes are what Turbo writes for the same message', () => {
    // Turbo.Tests: PluginMessageComposer.For(new Small(5, "ab", true, [7L])).Body
    const fields = parsePluginMessageSchema('[["id","int"],["name","string"],["on","bool"],["ids",["array","long"]]]');

    assert.deepEqual([ ...toBytes(encodePluginMessage({ id: 5, name: 'ab', on: true, ids: [ 7 ] }, fields)) ], [ 0, 0, 0, 5, 0, 2, 97, 98, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 7 ]);
});

void test('a negative long and a double are written as Turbo reads them', () => {
    const fields = parsePluginMessageSchema('[["big","long"],["real","double"]]');
    const bytes = toBytes(encodePluginMessage({ big: -(2 ** 40) - 5, real: -0.5 }, fields));
    const view = new DataView(bytes.buffer);

    assert.equal(view.getBigInt64(0), -(2n ** 40n) - 5n);
    assert.equal(view.getFloat64(8), -0.5);
});

void test('a field the schema lacks is ignored and a missing one sent as its default, each reported', () => {
    const fields = parsePluginMessageSchema('[["id","int"],["name","string"],["tags",["array","string"]],["inner",["object",[["on","bool"]]]]]', 'test.skew');
    const skew: string[] = [];

    const values = encodePluginMessage({ id: 3, extra: 'x' }, fields, 'test.skew', (kind, path) => skew.push(`${kind} ${path}`));

    assert.deepEqual(decodePluginMessage(reader(toBytes(values)), fields), { id: 3, name: '', tags: [], inner: { on: false } });
    assert.deepEqual(skew, [ 'unknown test.skew.extra', 'missing test.skew.name', 'missing test.skew.tags', 'missing test.skew.inner', 'missing test.skew.inner.on' ]);
});

void test('a schema the client cannot read is refused', () => {
    assert.throws(() => parsePluginMessageSchema('[["id","decimal"]]', 'test.bad'), /test\.bad\.id/);
    assert.throws(() => parsePluginMessageSchema('{"id":"int"}'));
});

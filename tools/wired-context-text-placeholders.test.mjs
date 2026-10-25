import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

// `WiredContext` section 7 (`TextPlaceholders`: placeholder names, then capturer names) arrives
// with every Show Message / Bot Talk editor on WIN63-202610121624. A parser that skips an unknown
// section without reading it misreads everything after the context, starting with defaultIntParams.

const cache = new Map();

const loadFile = (url, external) => {
    if (cache.has(url.href)) return cache.get(url.href);

    const source = readFileSync(url, 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};

    cache.set(url.href, exports);

    runInNewContext(outputText, { exports, require: (name) => {
        if (name.startsWith('.')) {
            const file = new URL(`${name}.ts`, url);

            return loadFile(existsSync(file) ? file : new URL(`${name}/index.ts`, url), external);
        }

        assert.ok(Object.hasOwn(external, name), `Unexpected dependency: ${name}`);

        return external[name];
    } });

    return exports;
};

const api = new URL('../packages/nitro-api/src/communication/', import.meta.url);
const external = {
    '@nitrodevco/nitro-api': {
        ...loadFile(new URL('ParseArray.ts', api), {}),
        ...loadFile(new URL('ParseInts.ts', api), {}),
        ...loadFile(new URL('ParseStrings.ts', api), {}),
    },
};
const { WiredFurniActionEventMessage } = loadFile(new URL('../packages/nitro-packets/src/incoming/Userdefinedroomevents/WiredFurniActionEventMessage.ts', import.meta.url), external);

// The parsers run in another realm, so their arrays are compared by value.
const plain = value => JSON.parse(JSON.stringify(value ?? null));

/** A big-endian reader over the packet body, as `EvaWireDataWrapper` reads it. */
const wrap = (bytes) => {
    let offset = 0;

    return {
        readInt: () => {
            const value = bytes.readInt32BE(offset);

            offset += 4;

            return value;
        },
        readShort: () => {
            const value = bytes.readInt16BE(offset);

            offset += 2;

            return value;
        },
        readBoolean: () => bytes[offset++] !== 0,
        readString: () => {
            const length = bytes.readUInt16BE(offset);
            const value = bytes.toString('utf8', offset + 2, offset + 2 + length);

            offset += 2 + length;

            return value;
        },
        get bytesAvailable() {
            return offset < bytes.length;
        },
        get remaining() {
            return bytes.length - offset;
        },
    };
};

// Official client capture, WIN63-202610121624, WiredFurniAction for a Show Message box (132 bytes).
const OFFICIAL_SHOW_MESSAGE = '00000014000000000000000000000E617FFF000100000000000300000000000000CAFFFFFFFF0000000000000000000000010000000000000007000000000100000000000000010000000300000000000000C8000000C900000000000000010000000000000000010000000700000000000000000000000300000000000000CAFFFFFFFF';

await test('official Show Message editor: section 7 is read and defaultIntParams follow it', () => {
    const wrapper = wrap(Buffer.from(OFFICIAL_SHOW_MESSAGE, 'hex'));
    const { def } = new WiredFurniActionEventMessage().parse(wrapper);

    assert.equal(def.code, 7);
    assert.deepEqual(plain(def.intParams), [ 0, 202, -1 ]);
    assert.deepEqual(plain(def.wiredContext.textPlaceholders), { placeholderNames: [], capturerNames: [] });
    assert.deepEqual(plain(def.defaultIntParams), [ 0, 202, -1 ]);
    assert.equal(wrapper.remaining, 0);
});

await test('section 7 names are read in order, placeholders then capturers', () => {
    const string = (value) => {
        const body = Buffer.from(value, 'utf8');
        const length = Buffer.alloc(2);

        length.writeUInt16BE(body.length);

        return Buffer.concat([ length, body ]);
    };
    const int = (value) => {
        const buffer = Buffer.alloc(4);

        buffer.writeInt32BE(value);

        return buffer;
    };
    const { WiredContextParser: parseTextPlaceholders } = loadFile(new URL('../packages/nitro-packets/src/incoming/Userdefinedroomevents/Data/WiredContextParser.ts', import.meta.url), external);
    const wrapper = wrap(Buffer.concat([ int(1), int(7), int(2), string('trigger_text'), string('name'), int(1), string('score') ]));

    assert.deepEqual(plain(parseTextPlaceholders(wrapper).textPlaceholders), { placeholderNames: [ 'trigger_text', 'name' ], capturerNames: [ 'score' ] });
    assert.equal(wrapper.remaining, 0);
});

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import ts from 'typescript';

// Transpiled rather than imported as `.ts`, as turbo-command-packets.test.mjs does; each module
// imports only types (or a sibling helper, inlined below), so nothing is left to resolve.
const load = async (path, inline = {}) => {
    let source = readFileSync(new URL(`../packages/${path}.ts`, import.meta.url), 'utf8');

    for (const [ line, body ] of Object.entries(inline)) source = source.replace(line, body);

    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 } });

    return import(`data:text/javascript,${encodeURIComponent(outputText)}`);
};

/** A wrapper over typed values, as the client's `IMessageDataWrapper` reads them. */
const wrapperOf = (values) => {
    const queue = [ ...values ];

    return {
        readInt: () => queue.shift(),
        readString: () => queue.shift(),
        readBoolean: () => queue.shift(),
        get bytesAvailable() { return queue.length > 0; },
        get remaining() { return queue.length; },
    };
};

const numbersParser = 'const NumbersParser = (wrapper) => { const list = []; let count = wrapper.readInt(); while (count-- > 0) list.push(wrapper.readInt()); return list; };';

const { ObjectRemoveMessage } = await load('nitro-packets/src/incoming/Room/Engine/ObjectRemoveMessage');
const { ItemRemoveMessage } = await load('nitro-packets/src/incoming/Room/Engine/ItemRemoveMessage');
const { ObjectRemoveMultipleMessage } = await load('nitro-packets/src/incoming/Room/Engine/ObjectRemoveMultipleMessage', { "import { NumbersParser } from './Data/NumbersParser';": numbersParser });

await test('the remove messages read the trailing area-hide flag, and default it for an older server', () => {
    assert.equal(new ObjectRemoveMessage().parse(wrapperOf([ '7', false, 3, 0, true ])).byInvisibleFurniManager, true);
    assert.equal(new ObjectRemoveMessage().parse(wrapperOf([ '7', false, 3, 0 ])).byInvisibleFurniManager, false);
    assert.equal(new ItemRemoveMessage().parse(wrapperOf([ '8', 3, true ])).byInvisibleFurniManager, true);
    assert.equal(new ItemRemoveMessage().parse(wrapperOf([ '8', 3 ])).byInvisibleFurniManager, false);

    const several = wrapperOf([ 2, 7, 9, 3, true ]);

    assert.deepEqual(new ObjectRemoveMultipleMessage().parse(several), { objectIds: [ 7, 9 ], pickerId: 3, byInvisibleFurniManager: true });
    assert.equal(several.remaining, 0);
});

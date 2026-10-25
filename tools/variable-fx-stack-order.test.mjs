/**
 * WIN63-202610121624 "Order in FX stack": `VariableFxConfigData.stackOrder` reads the config's
 * `stack_order` extra (0 when absent), `VariableFxStackController` hands it to
 * `StackedAdditionStack.add`, and `sortEntries` puts a higher order first inside a layer, before
 * the creation time decides.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const cache = new Map();
const external = {
    '@nitrodevco/nitro-api': { ToInt32: value => value | 0 },
    'pixi.js': { Texture: class {} },
    '#renderer/utils': { GetTickerTime: () => 0, TextureUtils: {} },
};

const loadFile = (url) => {
    if (cache.has(url.href)) return cache.get(url.href);

    const source = readFileSync(url, 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};

    cache.set(url.href, exports);

    runInNewContext(outputText, { exports, require: (name) => {
        if (name.startsWith('.')) {
            const file = new URL(`${name}.ts`, url);

            return loadFile(existsSync(file) ? file : new URL(`${name}/index.ts`, url));
        }

        assert.ok(Object.hasOwn(external, name), `Unexpected dependency: ${name}`);

        return external[name];
    } });

    return exports;
};

const load = path => loadFile(new URL(`../packages/nitro-renderer/src/room/object/visualization/${path}.ts`, import.meta.url));

const { VariableFxConfigData } = load('variablefx/VariableFxConfigData');
const { StackedAdditionStack } = load('stacked/StackedAdditionStack');

const addition = id => ({ id, isPartOfStack: false, dispose: () => {} });

await test('a config\'s stack order is its stack_order extra, 0 without one', () => {
    assert.equal(new VariableFxConfigData('c', 's', 'r', 'w', 'x', 0, 1, new Map([ [ 'stack_order', '3' ] ])).stackOrder, 3);
    assert.equal(new VariableFxConfigData('c', 's', 'r', 'w', 'x', 0, 1).stackOrder, 0);
});

await test('inside a layer a higher stack order sorts first, then the older entry', () => {
    const stack = new StackedAdditionStack();

    stack.add(addition(1), 0, 100, 1, 'a', 0);
    stack.add(addition(2), 0, 200, 2, 'b', 5);
    stack.add(addition(3), 0, 50, 3, 'c', 0);
    stack.add(addition(4), 1, 10, 4, 'd', 9);
    stack.sortEntries();

    // Spread: the sandbox's arrays are another realm's.
    assert.deepEqual([ ...stack._entries.map(entry => entry.addition.id) ], [ 2, 3, 1, 4 ]);
});

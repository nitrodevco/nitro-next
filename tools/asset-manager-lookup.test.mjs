/**
 * `AssetManager.getAsset` answers from the first collection (in the order they were added) that has
 * the name. It keeps its answers - a missing name too - until a collection is added or removed or a
 * collection's assets change, so a name is not looked for through every collection on every call.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const TextureUtils = { destroyTexture() {}, destroySource() {} };
const cache = new Map();
const external = {
    '@nitrodevco/nitro-api': { NitroLogger: { LOG_WARN: false, warn() {}, error() {}, log() {} } },
    '@pixi/gif': { AnimatedGIF: class {} },
    'pixi.js': { Rectangle: class {}, Spritesheet: class {}, Texture: class {}, TextureSource: class {} },
    '#renderer/utils': { GetTickerTime: () => 0, TextureUtils },
    '../utils': { LoadMetrics: {}, NitroBundle: class {}, TextureUtils },
    './GraphicAssetPalette': { GraphicAssetPalette: class {} },
};

const loadFile = (url) => {
    if (cache.has(url.href)) return cache.get(url.href);

    const source = readFileSync(url, 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};

    cache.set(url.href, exports);

    runInNewContext(outputText, { exports, require: (name) => {
        if (Object.hasOwn(external, name)) return external[name];

        assert.ok(name.startsWith('.'), `Unexpected dependency: ${name}`);

        const file = new URL(`${name}.ts`, url);

        return loadFile(existsSync(file) ? file : new URL(`${name}/index.ts`, url));
    } });

    return exports;
};

const { AssetManager } = loadFile(new URL('../packages/nitro-renderer/src/assets/AssetManager.ts', import.meta.url));

const texture = () => ({ frame: { x: 0, y: 0, width: 4, height: 4 }, source: { width: 8, height: 8 } });

/** A collection of `type` whose assets are `names`, each on a texture of its own. */
const addCollection = (manager, type, names) => {
    const textures = Object.fromEntries(names.map(name => [ `${type}_${name}`, texture() ]));
    const assets = names.map(name => ({ name, source: `${type}_${name}` }));

    return manager.createCollection({ type, assets }, undefined, textures);
};

/** Counts the lookups made in each collection. */
const countLookups = (manager) => {
    let count = 0;

    for (const collection of manager.collections.values()) {
        const getAsset = collection.getAsset.bind(collection);

        collection.getAsset = (name) => {
            count++;

            return getAsset(name);
        };
    }

    return () => count;
};

await test('the first collection with a name answers for it', () => {
    const manager = new AssetManager();
    const first = addCollection(manager, 'first', [ 'shared' ]);

    addCollection(manager, 'second', [ 'shared', 'own' ]);

    assert.equal(manager.getAsset('shared'), first.getAsset('shared'));
    assert.equal(manager.getAsset('own'), manager.getCollection('second').getAsset('own'));
    assert.equal(manager.getAsset('nowhere'), undefined);
});

await test('a name asked for again is not looked for again, found or missing', () => {
    const manager = new AssetManager();

    addCollection(manager, 'first', [ 'a' ]);
    addCollection(manager, 'second', [ 'b' ]);

    const lookups = countLookups(manager);

    manager.getAsset('b');
    manager.getAsset('missing');

    const afterFirst = lookups();

    for (let i = 0; i < 5; i++) {
        manager.getAsset('b');
        manager.getAsset('missing');
    }

    assert.equal(lookups(), afterFirst);
});

await test('a collection added later answers for a name that was missing', () => {
    const manager = new AssetManager();

    addCollection(manager, 'first', [ 'a' ]);

    assert.equal(manager.getAsset('late'), undefined);

    const late = addCollection(manager, 'late', [ 'late' ]);

    assert.equal(manager.getAsset('late'), late.getAsset('late'));
});

await test('a removed collection no longer answers; the next one with the name does', () => {
    const manager = new AssetManager();

    addCollection(manager, 'first', [ 'shared' ]);

    const second = addCollection(manager, 'second', [ 'shared' ]);

    manager.getAsset('shared');
    manager.removeCollection('first');

    assert.equal(manager.getAsset('shared'), second.getAsset('shared'));
});

await test('an asset added to or disposed from a collection is seen at once', () => {
    const manager = new AssetManager();
    const first = addCollection(manager, 'first', [ 'a' ]);
    const second = addCollection(manager, 'second', [ 'b' ]);

    assert.equal(manager.getAsset('thumbnail'), undefined);

    const added = second.addAsset('thumbnail', texture());

    assert.equal(manager.getAsset('thumbnail'), added);

    // Added to an earlier collection, the name is that collection's now.
    const earlier = first.addAsset('thumbnail', texture());

    assert.equal(manager.getAsset('thumbnail'), earlier);

    first.disposeAsset('thumbnail');

    assert.equal(manager.getAsset('thumbnail'), added);

    second.disposeAsset('thumbnail');

    assert.equal(manager.getAsset('thumbnail'), undefined);
});

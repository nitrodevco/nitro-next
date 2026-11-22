/**
 * The patched Pixi texture batch bind group cache (`.yarn/patches/pixi.js-*.patch`): pruning idle
 * groups detaches them from their textures without touching live groups or foreign listeners, a
 * pruned group rejoins on its next draw, and a prune stays linear in the cache size.
 *
 * Every batch group binds `Texture.EMPTY` in its unused slots, so the empty source carries a listener
 * per slot of every cached group. Detaching groups one `off()` at a time copied that whole list per
 * call: a prune of 1,000 groups took ~1.9s and churned ~5GB of garbage, stalling the room.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

const lib = new URL('../node_modules/pixi.js/lib/', import.meta.url);
const { getTextureBatchBindGroup, pruneTextureBatchBindGroups } = await import(new URL('rendering/batcher/gpu/getTextureBatchBindGroup.mjs', lib));
const { Texture } = await import(new URL('rendering/renderers/shared/texture/Texture.mjs', lib));
const { TextureSource } = await import(new URL('rendering/renderers/shared/texture/sources/TextureSource.mjs', lib));

const MAX_TEXTURES = 16;
const FAR_FUTURE = 1e12;

const listeners = (emitter) => {
    const list = emitter._events?.change;

    return !list ? [] : Array.isArray(list) ? list : [ list ];
};

const contexts = emitter => new Set(listeners(emitter).map(listener => listener.context));

/** Detaches every group, whatever an earlier test left cached. */
const clearCache = () => pruneTextureBatchBindGroups(Infinity, 0);

const source = () => new TextureSource({ width: 4, height: 4 });

const createGroups = (count, shared) => Array.from({ length: count }, () => getTextureBatchBindGroup([ source(), shared ], 2, MAX_TEXTURES));

await test('a prune detaches only idle groups and keeps foreign listeners', () => {
    clearCache();

    const shared = source();
    const foreign = () => {};

    shared.on('change', foreign, 'foreign');

    const groups = createGroups(200, shared);

    groups.forEach((group, index) => {
        group._lastUsed = (index % 2) ? FAR_FUTURE : 0;
    });

    const pruned = pruneTextureBatchBindGroups(FAR_FUTURE, 1000);
    const live = groups.filter((_, index) => index % 2);
    const idle = groups.filter((_, index) => !(index % 2));
    const empty = Texture.EMPTY.source;

    assert.equal(pruned, 100);

    for (const group of live) {
        assert.ok(!group._detached);
        assert.ok(contexts(shared).has(group));
        assert.ok(contexts(empty).has(group));
        assert.ok(contexts(group.resources[0]).has(group));
    }

    for (const group of idle) {
        assert.equal(group._detached, true);
        assert.ok(!contexts(shared).has(group));
        assert.ok(!contexts(empty).has(group));
        assert.equal(listeners(group.resources[0]).length, 0);
    }

    // One listener per empty slot of every live group, and the foreign listener untouched.
    assert.equal(listeners(empty).filter(listener => live.includes(listener.context)).length, live.length * (MAX_TEXTURES - 2));
    assert.ok(listeners(shared).some(listener => (listener.fn === foreign) && (listener.context === 'foreign')));

    // A live group still hears a change to its texture: a resize gives the source a new resource id,
    // which moves the group's key off the GPU bind group made from the old one.
    const group = live[0];
    const key = group._keyLow;

    group.resources[0].resize(8, 8);

    assert.notEqual(group._keyLow, key);
});

await test('a pruned group catches up on its next draw with what changed while it was detached', () => {
    clearCache();

    const resized = source();
    const destroyed = source();
    const [ group ] = createGroups(1, resized);
    const [ other ] = createGroups(1, destroyed);

    assert.equal(pruneTextureBatchBindGroups(FAR_FUTURE, 0), 2);

    // Neither group hears these: it is detached.
    const key = group._keyLow;

    group._gpuEntry = {};
    resized.resize(8, 8);
    destroyed.destroy();

    // The shared source sits after the group's own, in slots 2 (source) and 3 (its style).
    assert.equal(group._keyLow, key);
    assert.equal(other.resources[2], destroyed);

    group._touch(FAR_FUTURE);
    const warned = [];
    const original = console.warn;

    console.warn = (...args) => warned.push(args.join(' '));
    try {
        other._touch(FAR_FUTURE);
    } finally {
        console.warn = original;
    }

    // The resized source moved the key and dropped the GPU entry made from it; the destroyed source and
    // the style it destroyed with it left their slots, warning once each.
    assert.notEqual(group._keyLow, key);
    assert.equal(group._gpuEntry, null);
    assert.equal(other.resources[2], null);
    assert.equal(other.resources[3], null);
    assert.equal(warned.filter(w => /\[BindGroup\].*destroyed/.test(w)).length, 2);
});

await test('a pruned group rejoins its textures and the cache on its next draw', () => {
    clearCache();

    const shared = source();
    const [ group ] = createGroups(1, shared);

    assert.equal(pruneTextureBatchBindGroups(FAR_FUTURE, 0), 1);
    assert.equal(group._detached, true);

    group._touch(FAR_FUTURE);

    assert.ok(!group._detached);
    assert.ok(contexts(shared).has(group));
    assert.equal(listeners(Texture.EMPTY.source).filter(listener => listener.context === group).length, MAX_TEXTURES - 2);
    assert.equal(pruneTextureBatchBindGroups(FAR_FUTURE * 2, 0), 1);
});

await test('a prune of a large cache stays linear', () => {
    clearCache();

    createGroups(3000, source());

    const start = performance.now();
    const pruned = pruneTextureBatchBindGroups(FAR_FUTURE, 0);
    const elapsed = performance.now() - start;

    assert.equal(pruned, 3000);
    // ~20ms when linear; the quadratic detach took ~27s for this cache.
    assert.ok(elapsed < 1000, `pruning 3000 groups took ${elapsed.toFixed(0)}ms`);
    assert.equal(listeners(Texture.EMPTY.source).length, 0);
});

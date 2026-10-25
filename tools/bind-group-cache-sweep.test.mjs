/**
 * The patched Pixi WebGPU bind group system (`.yarn/patches/pixi.js-*.patch`) drops a cached bind group
 * once it has gone unbound for `maxUnusedTime` (5 s). Its key is the ids of the resources it binds, so
 * every texture combination drawn made one, and the renderer's garbage collection kept each for a
 * minute: a player's session on WebGPU held 15,398 native bind groups after a few minutes of room
 * hopping, outfit changes and catalogue browsing. A group bound this frame is never dropped.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

const lib = new URL('../node_modules/pixi.js/lib/', import.meta.url);
const { BindGroupSystem } = await import(new URL('rendering/renderers/gpu/BindGroupSystem.mjs', lib));
const { BindGroup } = await import(new URL('rendering/renderers/gpu/shader/BindGroup.mjs', lib));
const { TextureSource } = await import(new URL('rendering/renderers/shared/texture/sources/TextureSource.mjs', lib));

/** A bind group system over a fake device that counts the native bind groups it makes. */
const system = () => {
    const renderer = {
        gc: { addResourceHash() {}, addCollection() {}, now: 0 },
        texture: { getTextureView: source => ({ view: source }), getGpuSampler: style => ({ sampler: style }) },
        buffer: { getGPUBuffer: buffer => ({ buffer }) },
        ubo: { updateUniformGroup() {} },
        shader: { getProgramData: () => ({ bindGroups: [ {}, {} ] }) },
    };
    const bindGroups = new BindGroupSystem(renderer);
    const made = { count: 0 };

    const createBindGroup = (descriptor) => {
        made.count++;

        return { ...descriptor };
    };

    bindGroups.contextChange({ device: { createBindGroup } });

    /** One frame at `now`: the renderer's clock moves, the groups are bound, then the frame ends. */
    const frame = (now, ...groups) => {
        renderer.gc.now = now;

        const bound = groups.map(group => bindGroups.getBindGroup(group, PROGRAM, 1));

        bindGroups.postrender();

        return bound;
    };

    return { bindGroups, made, frame, cached: () => Object.values(bindGroups._hash).filter(entry => entry?.gpuBindGroup).length };
};

const PROGRAM = { _layoutKey: 1, layout: [ {}, { textureSource1: 0, textureSampler1: 1 } ], gpuLayout: [ [], [] ] };

const group = () => {
    const source = new TextureSource({ width: 4, height: 4 });

    return new BindGroup({ 0: source, 1: source.style });
};

await test('a bind group unbound for longer than maxUnusedTime leaves the cache', () => {
    const { bindGroups, frame, cached } = system();
    const a = group();
    const b = group();

    frame(1000, a, b);
    assert.equal(cached(), 2);

    // a keeps being drawn, b is not drawn again.
    for (let now = 2000; now <= 1000 + bindGroups.maxUnusedTime + 1000; now += 1000) frame(now, a);

    assert.equal(cached(), 1);
    assert.equal(bindGroups.maxUnusedTime, 5000);
});

await test('a dropped bind group is made again when it is drawn again, and a cached one is reused', () => {
    const { bindGroups, made, frame } = system();
    const a = group();

    const [ first ] = frame(1000, a);
    const [ again ] = frame(2000, a);

    assert.equal(again, first);
    assert.equal(made.count, 1);

    frame(2000 + bindGroups.maxUnusedTime + 1000);
    const [ remade ] = frame(2000 + bindGroups.maxUnusedTime + 2000, a);

    assert.notEqual(remade, first);
    assert.equal(made.count, 2);
});

await test('a bind group bound this frame is never dropped, however long it was idle before', () => {
    const { frame, cached } = system();
    const a = group();

    frame(1000, a);
    // Not drawn for a minute, then drawn again on the very frame the sweep runs.
    frame(61000, a);

    assert.equal(cached(), 1);
});

await test('the cache is swept at most once per sweepFrequency', () => {
    const { frame, cached } = system();
    const a = group();

    frame(1000, a);
    frame(5500);
    // Idle 5.2 s, but the last sweep was 0.7 s ago: kept until the next one.
    frame(6200);
    assert.equal(cached(), 1);
    frame(6500);
    assert.equal(cached(), 0);
});

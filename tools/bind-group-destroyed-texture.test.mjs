/**
 * The patched Pixi WebGPU bind group system (`.yarn/patches/pixi.js-*.patch`): a texture or sampler
 * destroyed while a shader still binds it made `BindGroupSystem._createBindGroup` throw "[BindGroup]
 * the resource bound as '...' was destroyed while a shader still uses it", which stopped the ticker
 * and left the client black. The slot now binds the empty texture (or its sampler) and warns; slots
 * that take anything else still throw.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

const lib = new URL('../node_modules/pixi.js/lib/', import.meta.url);
const { BindGroupSystem } = await import(new URL('rendering/renderers/gpu/BindGroupSystem.mjs', lib));
const { BindGroup } = await import(new URL('rendering/renderers/gpu/shader/BindGroup.mjs', lib));
const { Texture } = await import(new URL('rendering/renderers/shared/texture/Texture.mjs', lib));
const { TextureSource } = await import(new URL('rendering/renderers/shared/texture/sources/TextureSource.mjs', lib));

const TEXTURE_2D = { sampleType: 'float', viewDimension: '2d', multisampled: false };

/** A bind group system over a fake device: each GPU entry records the resource it was made from. */
const system = () => {
    const renderer = {
        gc: { addResourceHash() {}, addCollection() {}, now: 0 },
        texture: { getTextureView: source => ({ view: source }), getGpuSampler: style => ({ sampler: style }) },
        buffer: { getGPUBuffer: buffer => ({ buffer }) },
        ubo: { updateUniformGroup() {} },
        shader: { getProgramData: () => ({ bindGroups: [ {}, {} ] }) },
    };
    const bindGroups = new BindGroupSystem(renderer);

    bindGroups.contextChange({ device: { createBindGroup: descriptor => descriptor } });

    return bindGroups;
};

/** A batch-like program: group 1 = two textures with their samplers (+ an optional extra entry). */
const program = extra => ({
    _layoutKey: 1,
    layout: [ {}, { textureSource1: 0, textureSampler1: 1, textureSource2: 2, textureSampler2: 3, ...(extra ? { extra: 4 } : {}) } ],
    gpuLayout: [ [], [
        { binding: 0, texture: TEXTURE_2D },
        { binding: 1, sampler: { type: 'filtering' } },
        { binding: 2, texture: TEXTURE_2D },
        { binding: 3, sampler: { type: 'filtering' } },
        ...(extra ? [ { binding: 4, ...extra } ] : []),
    ] ],
});

const source = () => new TextureSource({ width: 4, height: 4 });

const silenced = (fn) => {
    const warned = [];
    const original = console.warn;

    console.warn = (...args) => warned.push(args.join(' '));
    try {
        return { result: fn(), warned };
    } finally {
        console.warn = original;
    }
};

await test('a texture destroyed while still bound is drawn empty, not thrown on', () => {
    const alive = source();
    const dead = source();
    const group = new BindGroup({ 0: alive, 1: alive.style, 2: dead, 3: dead.style });

    silenced(() => dead.destroy());

    const { result: gpuGroup, warned } = silenced(() => system().getBindGroup(group, program(), 1));
    const byBinding = Object.fromEntries(gpuGroup.entries.map(e => [ e.binding, e.resource ]));

    assert.equal(byBinding[0].view, alive);
    assert.equal(byBinding[1].sampler, alive.style);
    assert.equal(byBinding[2].view, Texture.EMPTY.source);
    assert.equal(byBinding[3].sampler, Texture.EMPTY.source.style);
    assert.equal(warned.filter(w => /\[BindGroup\].*drawn empty/.test(w)).length, 2);
});

await test('a destroyed source still listed in the group (not nulled) is drawn empty too', () => {
    const dead = source();
    const group = new BindGroup({ 0: dead, 1: dead.style, 2: Texture.EMPTY.source, 3: Texture.EMPTY.source.style });

    // A group detached from its resources (pruned) never hears the destroy, so its slots keep the dead source.
    group.destroy();
    group.resources = { 0: dead, 1: dead.style, 2: Texture.EMPTY.source, 3: Texture.EMPTY.source.style };
    silenced(() => dead.destroy());

    const { result: gpuGroup } = silenced(() => system().getBindGroup(group, program(), 1));

    assert.equal(gpuGroup.entries.find(e => e.binding === 0).resource.view, Texture.EMPTY.source);
});

await test('a destroyed slot that takes no 2d texture or sampler still throws', () => {
    const tex = source();

    // A nulled slot = what `BindGroup.onResourceChange` leaves of a destroyed resource.
    for (const extra of [ { buffer: { type: 'uniform' } }, { texture: { sampleType: 'float', viewDimension: '2d-array', multisampled: false } }, { sampler: { type: 'comparison' } } ]) {
        const group = new BindGroup({ 0: tex, 1: tex.style, 2: tex, 3: tex.style });

        group.resources[4] = null;
        assert.throws(() => silenced(() => system().getBindGroup(group, program(extra), 1)), /\[BindGroup\] the resource bound as 'extra'/);
    }
});

/**
 * The patched Pixi WebGPU graphics adaptor (`.yarn/patches/pixi.js-*.patch`): a non-batchable
 * Graphics keeps the texture bind group its context was built with, so a texture destroyed while the
 * Graphics still draws it made `BindGroupSystem` throw "[BindGroup] the resource bound as
 * 'textureSourceN' was destroyed" and stopped the ticker. The adaptor now rebuilds such a group,
 * drawing the dead source empty, as the sprite batch adaptor already did.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

const lib = new URL('../node_modules/pixi.js/lib/', import.meta.url);
const { GpuGraphicsAdaptor } = await import(new URL('scene/graphics/gpu/GpuGraphicsAdaptor.mjs', lib));
const { getTextureBatchBindGroup } = await import(new URL('rendering/batcher/gpu/getTextureBatchBindGroup.mjs', lib));
const { Texture } = await import(new URL('rendering/renderers/shared/texture/Texture.mjs', lib));
const { TextureSource } = await import(new URL('rendering/renderers/shared/texture/sources/TextureSource.mjs', lib));

const MAX_TEXTURES = 16;

/** Mirrors `BindGroupSystem._createBindGroup`'s check of every bound resource. */
const assertBindable = (bindGroup) => {
    for (const i in bindGroup.resources) {
        const resource = bindGroup.resources[i];

        if (!resource || resource.destroyed) throw new Error(`[BindGroup] the resource bound as '${i}' was destroyed`);
    }
};

const draw = (batch) => {
    const adaptor = new GpuGraphicsAdaptor();
    const bound = [];
    const encoder = {
        setGeometry() {},
        setPipelineFromGeometryProgramAndState() {},
        setBindGroup(index, bindGroup) {
            assertBindable(bindGroup);
            bound[index] = bindGroup;
        },
        renderPassEncoder: { drawIndexed() {} },
    };
    const renderer = {
        encoder,
        globalUniforms: { bindGroup: { resources: {} } },
        renderPipes: { uniformBatch: { getUniformBindGroup: () => ({ resources: {} }) } },
        bindGroup: { getBindGroup: bindGroup => (assertBindable(bindGroup), {}) },
        graphicsContext: {
            getContextRenderData: () => ({ batcher: { geometry: {} }, instructions: { instructions: [ batch ], instructionSize: 1 } }),
        },
    };
    const shader = { gpuProgram: {}, resources: { localUniforms: {} }, groups: [] };

    adaptor._maxTextures = MAX_TEXTURES;
    adaptor.execute({ renderer, state: {} }, { context: { customShader: shader } });

    return { bound: bound[1], shaderGroup: shader.groups[1] };
};

const source = () => new TextureSource({ width: 4, height: 4 });

await test('a graphics batch whose texture is destroyed after its first draw is rebuilt, not thrown on', () => {
    const textures = [ source(), source(), source() ];
    const batch = { topology: 'triangle-list', size: 6, start: 0, textures: { textures, count: textures.length } };

    batch.bindGroup = getTextureBatchBindGroup(textures, textures.length, MAX_TEXTURES);

    const first = draw(batch);

    assert.equal(first.bound, batch.bindGroup);

    textures[2].destroy();

    const second = draw(batch);

    assert.notEqual(second.bound, first.bound);
    assert.equal(second.shaderGroup, second.bound);
    assert.equal(second.bound.resources[4], Texture.EMPTY.source);
    assert.equal(second.bound.resources[0], textures[0]);
});

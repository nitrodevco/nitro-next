/** Geometry and resource-lifetime checks for the AS3 floor/wall rasterizer port. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const load = (path, dependencies) => {
    const source = readFileSync(new URL(`../packages/nitro-renderer/src/${path}.ts`, import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};
    runInNewContext(outputText, { exports, require: (name) => {
        assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);
        return dependencies[name];
    } });
    return exports;
};
const base = 'room/object/visualization/room/rasterizer/basic/';

await test('half-size room composition preserves overlay and restores clipping at normal zoom', () => {
    let filtersCreated = 0;
    class RoomDownsampleFilter {
        constructor() { filtersCreated++; }
    }
    const { RoomSpriteCanvas } = load('room/RoomSpriteCanvas', {
        '@nitrodevco/nitro-api': {},
        'pixi.js': {},
        '../utils': { TextureUtils: { getRenderer: () => ({ resolution: 2 }) } },
        './object': {},
        './utils': {},
        './utils/RoomDownsampleFilter': { RoomDownsampleFilter },
        './utils/snapRoomSpriteCoordinate': {},
    });
    const canvas = Object.create(RoomSpriteCanvas.prototype);
    const viewport = {};
    const overlay = {};
    Object.assign(canvas, {
        _master: { filterArea: viewport, children: [ overlay ] },
        _roomLayer: {}, _display: {}, _mask: {},
        _scale: 0.5, _usesMask: true, _compositeZoom: false,
    });
    canvas.updateZoomSampling();
    assert.equal(canvas._roomLayer.filters.length, 1);
    assert.equal(canvas._downsampleFilter.resolution, 4);
    assert.equal(canvas._master.filters, undefined);
    assert.equal(canvas._master.children[0], overlay);
    assert.equal(canvas._display.mask, null);
    assert.equal(canvas._mask.visible, false);
    assert.equal(canvas._roomLayer.filterArea, viewport);
    canvas._usesMask = false;
    canvas.updateZoomSampling();
    assert.equal(canvas._roomLayer.filters.length, 1);
    assert.equal(canvas._roomLayer.filterArea, undefined);
    canvas._usesMask = true;
    canvas._scale = 1;
    canvas.updateZoomSampling();
    assert.equal(canvas._roomLayer.filters.length, 0);
    assert.equal(canvas._display.mask, canvas._mask);
    assert.equal(canvas._mask.visible, true);
    canvas._scale = 0.5;
    canvas.updateZoomSampling();
    assert.equal(filtersCreated, 1, 'reuse the filter across zoom transitions');
});

await test('room disposal destroys nested and detached masks without destroying shared textures', async () => {
    const { Container, Graphics, Sprite, Texture } = await import('pixi.js');
    const { RoomSpriteCanvas } = load('room/RoomSpriteCanvas', {
        '@nitrodevco/nitro-api': {},
        'pixi.js': {},
        '../utils': { TextureUtils: { unwatchBatches() {} } },
        './object': {},
        './utils': {},
        './utils/RoomDownsampleFilter': {},
        './utils/snapRoomSpriteCoordinate': {},
    });
    for (const detached of [ false, true ]) {
        const master = new Container();
        const layer = new Container();
        const display = new Container();
        const background = new Sprite(Texture.EMPTY);
        const mask = new Graphics().rect(0, 0, 10, 10).fill(0xffffff);
        master.addChild(layer);
        layer.addChild(display, background);
        if (!detached) layer.addChild(mask);
        const canvas = Object.create(RoomSpriteCanvas.prototype);
        Object.assign(canvas, { _master: master, _roomLayer: layer, _display: display, _background: background, _mask: mask, cleanSprites() {} });
        canvas.dispose();
        for (const object of [ master, layer, display, background, mask ]) assert.equal(object.destroyed, true);
        assert.equal(Texture.EMPTY.destroyed, false);
        assert.equal(canvas._background, undefined);
    }
});

class Vector3d {
    constructor(x, y, z) { Object.assign(this, { x, y, z }); }
}
class Plane {
    getPlaneVisualization() { return this.visualization; }
}
const { FloorPlane } = load(`${base}FloorPlane`, { '@nitrodevco/nitro-api': { Vector3d }, './Plane': { Plane } });
const { WallPlane } = load(`${base}WallPlane`, { '@nitrodevco/nitro-api': { Vector3d }, './Plane': { Plane } });

for (const scale of [ 32, 64 ]) {
    await test(`FloorPlane at ${scale}: projects both side lengths and truncates signed offsets`, () => {
        const plane = new FloorPlane();
        let call;
        plane.visualization = {
            geometry: { scale, getScreenPoint: ({ x, y, z }) => ({ x: (y - x) * scale / 2, y: (x + y) * scale / 4 - z * scale / 2 }) },
            render: (...args) => {
                call = args;
                return 'canvas';
            },
        };
        const normal = { x: 0, y: 0, z: 1 };
        assert.equal(plane.render(undefined, 3 * scale, 5 * scale, scale, normal, true, -0.11, 0.11), 'canvas');
        assert.deepEqual(call, [ undefined, 3 * scale / 2, 5 * scale / 2, normal, true, Math.trunc(-0.11 * scale / 2), Math.trunc(0.11 * scale / 2) ]);
    });
    await test(`WallPlane at ${scale}: projects wall run and height separately`, () => {
        const plane = new WallPlane();
        let call;
        plane.visualization = {
            geometry: { scale, getScreenPoint: ({ x, y, z }) => ({ x: (y - x) * scale / 2, y: (x + y) * scale / 4 - z * scale / 2 }) },
            render: (...args) => {
                call = args;
                return 'canvas';
            },
        };
        const normal = { x: -1, y: 0, z: 0 };
        assert.equal(plane.render(undefined, 3 * scale, 4 * scale, scale, normal, false), 'canvas');
        assert.deepEqual(call, [ undefined, 3 * scale / 2, 2 * scale, normal, false ]);
    });
}

await test('floor and wall with no matching visualization produce no texture', () => {
    for (const plane of [ new FloorPlane(), new WallPlane() ]) assert.equal(plane.render(undefined, 64, 64, 64, {}, true, 0, 0), undefined);
});

const createPool = () => {
    const destroyed = [];
    const RenderTexture = { create: ({ width, height, antialias }) => ({ width, height, destroyed: false, source: {
        antialias, style: { scaleMode: 'nearest', update() {} }, destroyed: false, destroy() { this.destroyed = true; },
    } }) };
    const { TexturePool } = load('utils/TexturePool', {
        '@nitrodevco/nitro-api': { NitroLogger: { log() {} } },
        'pixi.js': { RenderTexture, TextureSource: { defaultOptions: { antialias: true, scaleMode: 'nearest' } } },
        './ExtendedSprite': { ExtendedSprite: { removeHitmap() {}, setAlphaProvider() {} } },
        './GetTicker': { GetTicker: () => ({ add() {}, remove() {} }) },
        './TextureUtils': { TextureUtils: { destroyTexture(texture) {
            texture.destroyed = true;
            destroyed.push(texture);
        } } },
    });
    return { TexturePool, destroyed };
};

await test('texture pool reuses matching dimensions without mixing antialias modes', () => {
    const { TexturePool } = createPool();
    const smooth = TexturePool.createRenderTexture(64, 32);
    const sharp = TexturePool.createRenderTexture(64, 32, false);
    TexturePool.releaseTexture(smooth);
    TexturePool.releaseTexture(sharp);
    assert.equal(TexturePool.createRenderTexture(64, 32, false), sharp);
    assert.equal(TexturePool.createRenderTexture(64, 32), smooth);
    assert.equal(sharp.source.antialias, false);
    assert.equal(smooth.source.antialias, true);
});

await test('released plane targets are reclaimed by shared idle cleanup', () => {
    const { TexturePool, destroyed } = createPool();
    const target = TexturePool.createRenderTexture(64, 32, false);
    TexturePool.releaseTexture(target);
    for (let i = 0; i < 6; i++) TexturePool.cleanUpTextures();
    assert.equal(target.destroyed, false);
    TexturePool.cleanUpTextures();
    assert.equal(target.destroyed, true);
    assert.equal(target.source.destroyed, true);
    assert.equal(destroyed.length, 1);
});

await test('pooled targets reset a previous owner\'s sampling mode before reuse', () => {
    const { TexturePool } = createPool();
    const target = TexturePool.createRenderTexture(64, 32, false);
    target.source.style.scaleMode = 'linear';
    TexturePool.releaseTexture(target);
    assert.equal(TexturePool.createRenderTexture(64, 32, false).source.style.scaleMode, 'nearest');
});

await test('plane target wrappers participate in the shared pool instead of retaining a private cache', () => {
    const calls = [];
    const texture = { source: { style: { minFilter: 'linear', magFilter: 'nearest' } } };
    const { acquirePlaneTarget, releasePlaneTarget } = load('room/object/visualization/room/rasterizer/PlaneCanvas', {
        'pixi.js': { Container: class {} },
        '#renderer/utils': { TexturePool: {
            createRenderTexture(...args) {
                calls.push(args);
                return texture;
            },
            releaseTexture(value) { calls.push(value); },
        } },
        './PlaneColorFilter': {},
    });
    assert.equal(acquirePlaneTarget(64.9, 32.1), texture);
    releasePlaneTarget(texture);
    assert.deepEqual(calls, [ [ 64, 32, false ], texture ]);
});

await test('room bitmap snapping matches native half-scale ties and AS3 snapping at other scales', () => {
    const { snapRoomSpriteCoordinate: snap } = load('room/utils/snapRoomSpriteCoordinate', {});
    assert.deepEqual([ 0, 1, 2, 3 ].map(x => snap(x, 0, 0.5)), [ 0, 0, 2, 4 ]);
    assert.deepEqual([ -3, -1, 1, 3 ].map(x => snap(x, 0, 0.5)), [ -4, 0, 0, 4 ]);
    for (const scale of [ 0.75, 1, 2, 4 ]) {
        assert.equal(snap(7.3, 1.25, scale) * scale + 1.25, Math.round(1.25 + 7.3 * scale));
    }
});

await test('final plane sampling minifies linearly but preserves nearest magnification', () => {
    let updates = 0;
    const style = { minFilter: 'nearest', magFilter: 'nearest', update() {
        updates++;
    } };
    const texture = { source: { style } };
    const { preparePlaneSampling } = load('room/object/visualization/room/rasterizer/PlaneCanvas', {
        'pixi.js': { Container: class {} }, '#renderer/utils': {}, './PlaneColorFilter': {},
    });
    assert.equal(preparePlaneSampling(texture), texture);
    assert.equal(style.minFilter, 'linear');
    assert.equal(style.magFilter, 'nearest');
    preparePlaneSampling(texture);
    assert.equal(updates, 1);
});

await test('RoomPlane rebuilds an unchanged door mask when the texture dimensions change', () => {
    const released = [];
    let rendered = 0;
    class Container {
        addChild() {}
        destroy() {}
    }
    class Sprite {
        position = { set() {} };
        scale = { set() {} };
        setSize() {}
    }
    const { RoomPlane } = load('room/object/visualization/room/RoomPlane', {
        '@nitrodevco/nitro-api': { Vector3d },
        'pixi.js': { Container, Sprite, Texture: { WHITE: {} } },
        '#renderer/assets': {},
        '#renderer/utils': {
            TexturePool: {
                releaseTexture: texture => released.push(texture),
                createRenderTexture: (width, height) => ({ width, height }),
            },
            TextureUtils: { getRenderer: () => ({ render() { rendered++; } }) },
        },
        '../../../utils': { RoomGeometry: class {} },
        './mask': {},
        './PlaneDrawingData': {},
        './rasterizer/basic/PlaneVisualizationLayer': {},
        './rasterizer/PlaneCanvas': {},
        './RoomPlaneBitmapMask': {},
        './RoomPlaneRectangleMask': {},
        './utils': {},
    });
    const original = { width: 544, height: 115 };
    const plane = {
        _useMask: true, _bitmapMasks: [],
        _rectangleMasks: [ { leftSideLoc: 0, rightSideLoc: 0, leftSideLength: 1, rightSideLength: 2 } ],
        _maskChanged: false, _maskManager: {}, _maskTexture: original,
        _leftSide: { length: 17 }, _rightSide: { length: 3.6 },
    };
    const geometry = { getCoordinatePosition: () => ({}) };
    const resized = RoomPlane.prototype.getMergedMasks.call(plane, geometry, 272, 58);
    assert.equal(resized.width, 272);
    assert.equal(resized.height, 58);
    assert.deepEqual(released, [ original ]);
    assert.equal(rendered, 1);
    assert.equal(RoomPlane.prototype.getMergedMasks.call(plane, geometry, 272, 58), resized);
    assert.equal(rendered, 1, 'an unchanged size still uses the cached mask');
});

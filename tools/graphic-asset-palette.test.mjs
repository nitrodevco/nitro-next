/**
 * `GraphicAssetPalette.applyPalette` (Flash `colorizeBitmap`): each pixel's green channel picks its
 * palette colour, its alpha is kept, and the coloured RGBA is the hit map `ExtendedSprite` tests
 * against. The frame is copied from the decoded sheet on a 2D canvas - its own rectangle, at its
 * trim offset in an image `orig` in size - with no GPU readback; only a frame that is not on the
 * CPU, or that drawing would resample, is drawn and read back from the GPU.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { createContext, runInContext } from 'node:vm';

import { transpile } from './load-source.mjs';

const transpileFile = path => transpile(readFileSync(new URL(`../packages/nitro-renderer/src/${path}`, import.meta.url), 'utf8'));

/** A decoded sheet: RGBA, row by row. Closed, it has no size (`ImageBitmap.close`). */
class FakeBitmap {
    constructor(width, height, rgba) {
        this.width = width;
        this.height = height;
        this.rgba = rgba;
    }
}

class FakeImageData {
    constructor(data, width, height) {
        assert.equal(data.length, width * height * 4, 'ImageData is given exactly width x height pixels');

        this.data = data;
        this.width = width;
        this.height = height;
    }
}

/** A 2D canvas over a plain RGBA buffer: resizing clears it and resets the context's state, as a browser's does. */
class FakeCanvas {
    #width = 300;
    #height = 150;

    constructor(log) {
        this.log = log;
        this.tainted = false;
        this.ctx = undefined;
        this.reset();
    }

    get width() {
        return this.#width;
    }

    set width(value) {
        this.#width = value;
        this.reset();
    }

    get height() {
        return this.#height;
    }

    set height(value) {
        this.#height = value;
        this.reset();
    }

    reset() {
        this.pixels = new Uint8ClampedArray(this.#width * this.#height * 4);

        if (this.ctx) this.ctx.imageSmoothingEnabled = true;
    }

    getContext(type, options) {
        this.ctx ??= new FakeContext(this, options);

        return this.ctx;
    }
}

class FakeContext {
    constructor(canvas, options) {
        this.canvas = canvas;
        this.options = options;
        this.imageSmoothingEnabled = true;
    }

    // Source-over for the two alphas the fixtures use: a transparent pixel leaves what is under it.
    // A fixture's alpha is not premultiplied in, so a read gives the bytes drawn.
    drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) {
        assert.equal(sw, dw, 'drawn 1:1');
        assert.equal(sh, dh, 'drawn 1:1');

        this.canvas.log.draws.push({ canvas: this.canvas, sx, sy, sw, sh, dx, dy, smoothing: this.imageSmoothingEnabled });

        const { pixels, width } = this.canvas;

        for (let row = 0; row < sh; row++) {
            for (let column = 0; column < sw; column++) {
                const from = (((sy + row) * image.width) + sx + column) * 4;
                const to = (((dy + row) * width) + dx + column) * 4;

                if (image.rgba[from + 3] === 0) continue;

                pixels.set(image.rgba.subarray(from, from + 4), to);
            }
        }
    }

    clearRect(x, y, width, height) {
        for (let row = y; row < y + height; row++) this.canvas.pixels.fill(0, ((row * this.canvas.width) + x) * 4, ((row * this.canvas.width) + x + width) * 4);
    }

    getImageData(x, y, width, height) {
        if (this.canvas.tainted) throw new Error('SecurityError: the canvas has been tainted by cross-origin data');

        const data = new Uint8ClampedArray(width * height * 4);

        for (let row = 0; row < height; row++) data.set(this.canvas.pixels.subarray((((y + row) * this.canvas.width) + x) * 4, (((y + row) * this.canvas.width) + x + width) * 4), row * width * 4);

        return new FakeImageData(data, width, height);
    }

    putImageData(imageData, x, y) {
        this.canvas.log.puts.push({ imageData, x, y });
    }
}

/** Loads `GraphicAssetPalette` (and, for the collection test, `GraphicAsset` and `GraphicAssetCollection`) against fakes. */
const load = ({ gpuPixels } = {}) => {
    const log = { draws: [], puts: [], gpuReads: [], sprites: [], destroyed: [], canvases: [] };

    class Sprite {
        constructor(texture) {
            this.texture = texture;
            this.destroyed = false;
            log.sprites.push(this);
        }

        destroy() {
            this.destroyed = true;
        }
    }

    class Texture {
        static from(canvas) {
            const texture = new Texture();

            texture.source = { width: canvas.width, height: canvas.height, canvas };
            texture.frame = { x: 0, y: 0, width: canvas.width, height: canvas.height };
            texture.width = canvas.width;
            texture.height = canvas.height;

            return texture;
        }
    }

    class Rectangle {}

    const utils = {
        isCpuReadable: resource => (resource instanceof FakeBitmap) && (resource.width > 0),
        GetTickerTime: () => 0,
        TextureUtils: {
            // As `ExtractSystem.pixels` of a sprite: what it draws, read back.
            getPixels: (options) => {
                log.gpuReads.push(options);

                return gpuPixels(options.target.texture);
            },
            destroyTexture: texture => log.destroyed.push(texture),
        },
    };

    const context = createContext({
        exports: {},
        ImageData: FakeImageData,
        document: {
            createElement: (tag) => {
                assert.equal(tag, 'canvas');

                const canvas = new FakeCanvas(log);

                log.canvases.push(canvas);

                return canvas;
            },
        },
    });
    const modules = {};
    const run = (path, name) => {
        const exports = {};

        context.exports = exports;
        context.require = (dependency) => {
            if (dependency === '@nitrodevco/nitro-api') return {};
            if (dependency === 'pixi.js') return { Sprite, Texture, Rectangle };
            if ((dependency === '../utils') || (dependency === '#renderer/utils')) return utils;
            if (modules[dependency]) return modules[dependency];
            throw new Error(`Unexpected dependency: ${dependency}`);
        };

        runInContext(`(function (exports, require) { ${transpileFile(path)}\n})(exports, require);`, context);

        modules[`./${name}`] = exports;

        return exports[name];
    };

    const GraphicAssetPalette = run('assets/GraphicAssetPalette.ts', 'GraphicAssetPalette');

    run('assets/GraphicAsset.ts', 'GraphicAsset');

    const GraphicAssetCollection = run('assets/GraphicAssetCollection.ts', 'GraphicAssetCollection');

    return { GraphicAssetPalette, GraphicAssetCollection, log };
};

/** Four palette colours; the rest of the 256 are padded black, as Flash's constructor pads them. */
const PALETTE = [ [ 11, 12, 13 ], [ 21, 22, 23 ], [ 31, 32, 33 ], [ 41, 42, 43 ] ];
const palette = GraphicAssetPalette => new GraphicAssetPalette(PALETTE.map(color => [ ...color ]), 0xffffff, 0xffffff);

/** A sheet `width` x `height` whose pixel (x, y) is `pixel(x, y)` as [r, g, b, a]. */
const sheet = (width, height, pixel) => {
    const rgba = new Uint8ClampedArray(width * height * 4);

    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) rgba.set(pixel(x, y), ((y * width) + x) * 4);

    return new FakeBitmap(width, height, rgba);
};

const sourceOf = (bitmap, extra = {}) => ({ resource: bitmap, resolution: 1, pixelWidth: bitmap.width, pixelHeight: bitmap.height, ...extra });
const textureOf = (source, frame, { orig, trim, rotate = 0 } = {}) => ({
    source,
    frame,
    orig: orig ?? { x: 0, y: 0, width: frame.width, height: frame.height },
    trim,
    rotate,
});

/**
 * `colorizeBitmap` written out: RGB from the palette entry the green picks (black past the four),
 * alpha kept. A transparent pixel has no colour to read on a canvas (its RGB is premultiplied away),
 * so it picks the first entry.
 */
const colourOf = ([ , green, , alpha ]) => [ ...(PALETTE[alpha ? green : 0] ?? [ 0, 0, 0 ]), alpha ];

/** The coloured RGBA of an image `width` x `height` whose pixel (x, y) is `pixel(x, y)`. */
const expected = (width, height, pixel) => {
    const out = [];

    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) out.push(...colourOf(pixel(x, y)));

    return out;
};

const hitMapOf = texture => [ ...texture.source.hitMap ];

await test('each pixel takes the palette colour its green picks and keeps its alpha; the RGBA is the hit map', () => {
    const { GraphicAssetPalette, log } = load({ gpuPixels: () => assert.fail('no GPU readback') });
    // Red and blue are ignored; green 200 is past the four colours given, so black.
    const pixels = [ [ 99, 0, 99, 255 ], [ 7, 1, 7, 128 ], [ 5, 2, 5, 0 ], [ 3, 3, 3, 255 ], [ 1, 200, 1, 255 ], [ 0, 1, 0, 64 ] ];
    const pixel = (x, y) => pixels[(y * 3) + x];
    const bitmap = sheet(3, 2, pixel);
    const coloured = palette(GraphicAssetPalette).applyPalette(textureOf(sourceOf(bitmap), { x: 0, y: 0, width: 3, height: 2 }));

    assert.deepEqual(hitMapOf(coloured), expected(3, 2, pixel));
    assert.deepEqual([ coloured.source.canvas.width, coloured.source.canvas.height ], [ 3, 2 ]);
    assert.equal(log.puts.length, 1);
    assert.equal(log.puts[0].imageData.data, coloured.source.hitMap, 'the canvas is given the very RGBA kept as the hit map');
    assert.equal(log.gpuReads.length, 0);
});

await test('a frame is copied from its own rectangle of the sheet, smoothing off, nothing left over from the frame before', () => {
    const { GraphicAssetPalette, log } = load({ gpuPixels: () => assert.fail('no GPU readback') });
    // A 6x3 sheet: the left 2x2 frame is opaque, green 1; the frame at (3, 1) is opaque, green 2, only on its diagonal.
    const pixel = (x, y) => {
        if ((x < 2) && (y < 2)) return [ 0, 1, 0, 255 ];
        if ((x >= 3) && (x < 5) && (y >= 1) && ((x - 3) === (y - 1))) return [ 0, 2, 0, 255 ];

        return [ 0, 0, 0, 0 ];
    };
    const source = sourceOf(sheet(6, 3, pixel));
    const colours = palette(GraphicAssetPalette);

    colours.applyPalette(textureOf(source, { x: 0, y: 0, width: 2, height: 2 }));

    const diagonal = colours.applyPalette(textureOf(source, { x: 3, y: 1, width: 2, height: 2 }));

    assert.deepEqual(hitMapOf(diagonal), expected(2, 2, (x, y) => pixel(x + 3, y + 1)));
    assert.deepEqual(log.draws.map(({ sx, sy, sw, sh, dx, dy }) => [ sx, sy, sw, sh, dx, dy ]), [ [ 0, 0, 2, 2, 0, 0 ], [ 3, 1, 2, 2, 0, 0 ] ], 'only each frame is drawn');
    assert.ok(log.draws.every(draw => !draw.smoothing), 'drawn without smoothing');
    assert.equal(log.gpuReads.length, 0);

    const scratch = log.canvases[0];

    assert.equal(scratch.ctx.options?.willReadFrequently, true, 'the scratch canvas is a CPU canvas, read without the GPU');
    assert.ok(log.draws.every(draw => draw.canvas === scratch), 'both frames are copied on the one scratch canvas');
    assert.equal(log.canvases.length, 3, 'the scratch canvas, and one canvas per coloured frame');
});

await test('a trimmed frame sits at its trim offset in an image `orig` in size, its margin transparent', () => {
    const { GraphicAssetPalette, log } = load({ gpuPixels: () => assert.fail('no GPU readback') });
    // The frame is the 2x2 at (1, 1) of a 4x3 sheet, cut from a 5x4 original at (2, 1).
    const sheetPixel = (x, y) => [ 0, ((x + y) % 4), 0, ((x === 1) && (y === 2)) ? 0 : 255 ];
    const source = sourceOf(sheet(4, 3, sheetPixel));
    const texture = textureOf(source, { x: 1, y: 1, width: 2, height: 2 }, {
        orig: { x: 0, y: 0, width: 5, height: 4 },
        trim: { x: 2, y: 1, width: 2, height: 2 },
    });
    const coloured = palette(GraphicAssetPalette).applyPalette(texture);
    const imagePixel = (x, y) => (((x >= 2) && (x < 4) && (y >= 1) && (y < 3)) ? sheetPixel(x - 2 + 1, y - 1 + 1) : [ 0, 0, 0, 0 ]);

    assert.deepEqual([ coloured.source.canvas.width, coloured.source.canvas.height ], [ 5, 4 ]);
    assert.deepEqual(hitMapOf(coloured), expected(5, 4, imagePixel));
    assert.deepEqual(log.draws.map(({ sx, sy, sw, sh }) => [ sx, sy, sw, sh ]), [ [ 1, 1, 2, 2 ] ]);
    assert.equal(log.gpuReads.length, 0);
});

/** What the GPU draw of a 2x2 frame reads back here: every pixel green 3. */
const gpuDraw = () => ({ pixels: new Uint8Array([ 0, 3, 0, 255, 0, 3, 0, 255, 0, 3, 0, 255, 0, 3, 0, 255 ]), width: 2, height: 2 });

for (const { name, makeTexture } of [
    { name: 'a sheet whose bitmap was closed once on the GPU (`makeGpuResident`)', makeTexture: () => textureOf(sourceOf(new FakeBitmap(0, 0, new Uint8ClampedArray())), { x: 0, y: 0, width: 2, height: 2 }) },
    { name: 'a sheet with no CPU image', makeTexture: () => textureOf({ resource: {}, resolution: 1, pixelWidth: 4, pixelHeight: 4 }, { x: 0, y: 0, width: 2, height: 2 }) },
    { name: 'a rotated frame', makeTexture: () => textureOf(sourceOf(sheet(4, 4, () => [ 0, 1, 0, 255 ])), { x: 0, y: 0, width: 2, height: 2 }, { rotate: 2 }) },
    { name: 'a source at resolution 2', makeTexture: () => textureOf(sourceOf(sheet(4, 4, () => [ 0, 1, 0, 255 ]), { resolution: 2 }), { x: 0, y: 0, width: 2, height: 2 }) },
    { name: 'a frame drawn scaled to its trim', makeTexture: () => textureOf(sourceOf(sheet(4, 4, () => [ 0, 1, 0, 255 ])), { x: 0, y: 0, width: 2, height: 2 }, { orig: { x: 0, y: 0, width: 4, height: 4 }, trim: { x: 0, y: 0, width: 4, height: 4 } }) },
    { name: 'a frame off the pixel grid', makeTexture: () => textureOf(sourceOf(sheet(4, 4, () => [ 0, 1, 0, 255 ])), { x: 0.5, y: 0, width: 2, height: 2 }) },
    { name: 'a frame past the edge of its sheet', makeTexture: () => textureOf(sourceOf(sheet(2, 2, () => [ 0, 1, 0, 255 ])), { x: 1, y: 0, width: 2, height: 2 }) },
]) {
    await test(`${name} is drawn and read back from the GPU instead`, () => {
        const { GraphicAssetPalette, log } = load({ gpuPixels: gpuDraw });
        const texture = makeTexture();
        const coloured = palette(GraphicAssetPalette).applyPalette(texture);

        assert.equal(log.gpuReads.length, 1);
        assert.equal(log.gpuReads[0].target.texture, texture);
        assert.equal(log.gpuReads[0].resolution, 1);
        assert.equal(log.gpuReads[0].antialias, false);
        assert.equal(log.sprites[0].destroyed, true, 'the sprite drawn is destroyed');
        assert.equal(log.draws.length, 0);
        assert.deepEqual(hitMapOf(coloured), expected(2, 2, () => [ 0, 3, 0, 255 ]));
    });
}

await test('a sheet a 2D canvas may not read (cross-origin) is read back from the GPU instead', () => {
    const { GraphicAssetPalette, log } = load({ gpuPixels: gpuDraw });
    const texture = textureOf(sourceOf(sheet(2, 2, () => [ 0, 1, 0, 255 ])), { x: 0, y: 0, width: 2, height: 2 });
    const colours = palette(GraphicAssetPalette);

    colours.applyPalette(textureOf(sourceOf(sheet(1, 1, () => [ 0, 1, 0, 255 ])), { x: 0, y: 0, width: 1, height: 1 }));
    log.canvases[0].tainted = true;

    const coloured = colours.applyPalette(texture);

    assert.equal(log.gpuReads.length, 1);
    assert.deepEqual(hitMapOf(coloured), expected(2, 2, () => [ 0, 3, 0, 255 ]));
});

await test('the collection colours a frame once per palette, hands out an unpaletted asset as it is, and disposes the coloured', () => {
    const { GraphicAssetCollection, log } = load({ gpuPixels: () => assert.fail('no GPU readback') });
    const bitmap = sheet(4, 2, x => [ 0, x, 0, 255 ]);
    const source = sourceOf(bitmap);
    const textures = {
        pet_64_a_0_0: textureOf(source, { x: 0, y: 0, width: 2, height: 2 }),
        pet_64_sd_0_0: textureOf(source, { x: 2, y: 0, width: 2, height: 2 }),
    };
    const data = {
        type: 'pet',
        assets: [ { name: 'pet_64_a_0_0', x: 0, y: 0, usesPalette: true }, { name: 'pet_64_sd_0_0', x: 0, y: 0 } ],
        palettes: [ { id: 3, rgb: PALETTE.map(color => [ ...color ]), color1: 'ffffff' }, { id: 4, rgb: [ [ 1, 1, 1 ], [ 2, 2, 2 ] ] } ],
    };
    const collection = new GraphicAssetCollection(data, source, textures);
    const first = collection.getAssetWithPalette('pet_64_a_0_0', 3);

    assert.equal(collection.getAssetWithPalette('pet_64_a_0_0', 3), first, 'cached as name@palette');
    assert.equal(log.draws.length, 1, 'coloured once');
    assert.deepEqual(hitMapOf(first.texture), expected(2, 2, x => [ 0, x, 0, 255 ]));

    const other = collection.getAssetWithPalette('pet_64_a_0_0', 4);

    assert.notEqual(other, first);
    assert.deepEqual(hitMapOf(other.texture), [ 1, 1, 1, 255, 2, 2, 2, 255, 1, 1, 1, 255, 2, 2, 2, 255 ]);
    assert.equal(collection.getAssetWithPalette('pet_64_sd_0_0', 3).texture, textures.pet_64_sd_0_0, 'a shadow uses no palette');

    const coloured = [ first.texture, other.texture ];

    collection.dispose();

    assert.deepEqual(log.destroyed, coloured, 'the coloured textures are destroyed with the collection, not the frames of the sheet');
    assert.equal(log.gpuReads.length, 0);
});

/**
 * `ExtendedSprite.containsXY`'s alpha test: each texture's own frame is read once - from the
 * palette RGBA, from the decoded image on a 2D canvas, or from the GPU - and a source drawn again
 * (`removeHitmap`) is read again.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

/** A 4x2 RGBA sheet: the left frame (0,0 2x2) opaque only at (1,1), the right frame (2,0 2x2) opaque only at (0,0). */
const SHEET_WIDTH = 4;
const SHEET_HEIGHT = 2;
const sheetRgba = () => {
    const rgba = new Uint8ClampedArray(SHEET_WIDTH * SHEET_HEIGHT * 4);

    rgba[((1 * SHEET_WIDTH) + 1) * 4 + 3] = 255;
    rgba[((0 * SHEET_WIDTH) + 2) * 4 + 3] = 255;

    return rgba;
};

const load = (overrides = {}) => {
    const source = readFileSync(new URL('../packages/nitro-renderer/src/utils/ExtendedSprite.ts', import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const gpuReads = [];

    class Sprite {
        constructor() {
            this.scale = { x: 1, y: 1 };
            this.texture = undefined;
        }

        containsPoint({ x, y }) {
            const { width, height } = this.texture.orig ?? this.texture.frame;

            return (x >= 0) && (y >= 0) && (x < width) && (y < height);
        }
    }

    class Texture {
        static EMPTY = { frame: { x: 0, y: 0, width: 0, height: 0 } };

        constructor({ source }) {
            this.source = source;
            this.frame = { x: 0, y: 0, width: source.width, height: source.height };
        }

        destroy() {}
    }

    // As WebGPU's `getPixels` does: the whole source from its corner, whatever the texture's frame.
    const TextureUtils = {
        getPixels: (texture) => {
            gpuReads.push(texture);

            return { pixels: sheetRgba(), width: SHEET_WIDTH, height: SHEET_HEIGHT };
        },
    };
    const exports = {};

    runInNewContext(outputText, {
        exports,
        ImageBitmap: overrides.ImageBitmap,
        OffscreenCanvas: overrides.OffscreenCanvas,
        require: (name) => {
            if (name === '@nitrodevco/nitro-api') return { AlphaTolerance: { MATCH_OPAQUE_PIXELS: 128 } };
            if (name === 'pixi.js') return { Sprite, Texture };
            if (name === '.') return { TextureUtils };
            throw new Error(`Unexpected dependency: ${name}`);
        },
    });

    return { ExtendedSprite: exports.ExtendedSprite, gpuReads };
};

const sheetSource = (extra = {}) => ({ resolution: 1, pixelWidth: SHEET_WIDTH, width: SHEET_WIDTH, height: SHEET_HEIGHT, ...extra });
const frameTexture = (source, x) => ({ source, frame: { x, y: 0, width: 2, height: 2 } });
const spriteOf = (ExtendedSprite, texture) => {
    const sprite = new ExtendedSprite();

    sprite.texture = texture;

    return sprite;
};

await test('each frame is tested against its own pixels, cut from one readback of the whole source', () => {
    const { ExtendedSprite, gpuReads } = load();
    const source = sheetSource();
    const left = spriteOf(ExtendedSprite, frameTexture(source, 0));
    const right = spriteOf(ExtendedSprite, frameTexture(source, 2));

    assert.equal(left.containsXY(1, 1), true);
    assert.equal(left.containsXY(0, 0), false);
    assert.equal(right.containsXY(0, 0), true);
    assert.equal(right.containsXY(1, 1), false);
    assert.equal(left.containsXY(1, 1), true, 'a second test reads nothing again');
    assert.equal(gpuReads.length, 1, 'the source is read back once for all its frames');
});

await test('a source drawn again is read again', () => {
    const { ExtendedSprite, gpuReads } = load();
    const source = sheetSource();
    const sprite = spriteOf(ExtendedSprite, frameTexture(source, 0));

    sprite.containsXY(1, 1);
    sprite.containsXY(1, 1);
    ExtendedSprite.removeHitmap(source);
    sprite.containsXY(1, 1);

    assert.equal(gpuReads.length, 2);
});

await test('a palette-coloured pet is read from the RGBA it keeps, not the GPU', () => {
    const { ExtendedSprite, gpuReads } = load();
    const source = sheetSource({ hitMap: sheetRgba() });
    const right = spriteOf(ExtendedSprite, frameTexture(source, 2));

    assert.equal(right.containsXY(0, 0), true);
    assert.equal(right.containsXY(1, 0), false);
    assert.equal(gpuReads.length, 0);
});

await test('a decoded bitmap is read on a 2D canvas, with no GPU readback', () => {
    class ImageBitmap {
        constructor() {
            this.width = SHEET_WIDTH;
            this.height = SHEET_HEIGHT;
        }
    }

    const drawn = [];

    class OffscreenCanvas {
        constructor(width, height) {
            this.width = width;
            this.height = height;
        }

        getContext() {
            const { width } = this;
            let region;

            return {
                drawImage: (_image, sx, sy, sw, sh) => {
                    region = { sx, sy, sw, sh };
                    drawn.push(region);
                },
                getImageData: () => {
                    const sheet = sheetRgba();
                    const data = new Uint8ClampedArray(region.sw * region.sh * 4);

                    for (let row = 0; row < region.sh; row++) data.set(sheet.subarray(((region.sy + row) * SHEET_WIDTH + region.sx) * 4, ((region.sy + row) * SHEET_WIDTH + region.sx + region.sw) * 4), row * width * 4);

                    return { data };
                },
            };
        }
    }

    const { ExtendedSprite, gpuReads } = load({ ImageBitmap, OffscreenCanvas });
    const source = sheetSource({ resource: new ImageBitmap() });
    const right = spriteOf(ExtendedSprite, frameTexture(source, 2));

    assert.equal(right.containsXY(0, 0), true);
    assert.equal(right.containsXY(1, 1), false);
    assert.deepEqual(drawn, [ { sx: 2, sy: 0, sw: 2, sh: 2 } ], 'only the frame is drawn');
    assert.equal(gpuReads.length, 0);
});

await test('a closed bitmap falls back to the GPU readback', () => {
    class ImageBitmap {
        constructor() {
            this.width = 0;
            this.height = 0;
        }
    }

    const { ExtendedSprite, gpuReads } = load({ ImageBitmap, OffscreenCanvas: class {} });
    const sprite = spriteOf(ExtendedSprite, frameTexture(sheetSource({ resource: new ImageBitmap() }), 0));

    assert.equal(sprite.containsXY(1, 1), true);
    assert.equal(gpuReads.length, 1);
});

await test('a render texture with an alpha provider is read from it, not the GPU, and again once drawn again', () => {
    const { ExtendedSprite, gpuReads } = load();
    const source = sheetSource();
    const sprite = spriteOf(ExtendedSprite, frameTexture(source, 0));
    const alphaOf = (opaqueX, opaqueY) => {
        const alpha = new Uint8Array(SHEET_WIDTH * SHEET_HEIGHT);

        alpha[(opaqueY * SHEET_WIDTH) + opaqueX] = 255;

        return { alpha, width: SHEET_WIDTH, height: SHEET_HEIGHT };
    };

    ExtendedSprite.setAlphaProvider(source, () => alphaOf(0, 0));

    assert.equal(sprite.containsXY(0, 0), true);
    assert.equal(sprite.containsXY(1, 1), false);

    // An avatar drawn again in place: a new frame, a new provider.
    ExtendedSprite.removeHitmap(source);
    ExtendedSprite.setAlphaProvider(source, () => alphaOf(1, 1));

    assert.equal(sprite.containsXY(0, 0), false);
    assert.equal(sprite.containsXY(1, 1), true);

    // Released to the pool: back to reading the GPU.
    ExtendedSprite.removeHitmap(source);
    ExtendedSprite.setAlphaProvider(source, undefined);
    sprite.containsXY(1, 1);

    assert.equal(gpuReads.length, 1);
});

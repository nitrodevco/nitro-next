/** Deterministic AS3-derived checks for water border selection and shore masks. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const PIXI = {
    CanvasSource: class CanvasSource {},
    DOMAdapter: { get: () => ({ createCanvas: () => { throw new Error('canvas is not used by these tests'); } }) },
    ICanvas: class ICanvas {},
    Rectangle: class Rectangle {},
    Sprite: class Sprite {},
    Texture: class Texture {},
};

const AnimatedFurnitureVisualization = class {
    direction = 0;
    object;
    totalSprites = 0;
    asset;

    updateObject() { return true; }
    updateAnimation() { return 0; }
    setAnimation() {}
    getLayerTag() { return ''; }
    getSpriteAssetName(_scale, layerId) { return `layer_${layerId}`; }
    getValidSize() { return 32; }
    dispose() {}
};

const load = (name, dependencies) => {
    const source = readFileSync(new URL(`../packages/nitro-renderer/src/room/object/visualization/furniture/${name}.ts`, import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    });
    const exports = {};

    runInNewContext(outputText, {
        exports,
        require: (dependency) => {
            assert.ok(Object.hasOwn(dependencies, dependency), `Unexpected dependency: ${dependency}`);
            return dependencies[dependency];
        },
    });

    return exports[name];
};

const ShoreMaskCreatorUtility = load('ShoreMaskCreatorUtility', {
    '@nitrodevco/nitro-api': {},
    'pixi.js': PIXI,
    '../../../../utils': { TextureUtils: {} },
});

const FurnitureWaterAreaVisualization = load('FurnitureWaterAreaVisualization', {
    '@nitrodevco/nitro-api': { RoomObjectVariableEnum: { FurnitureSizeX: 'size_x', FurnitureSizeY: 'size_y' } },
    './AnimatedFurnitureVisualization': { AnimatedFurnitureVisualization },
    './ShoreMaskCreatorUtility': { ShoreMaskCreatorUtility },
});

const cut = (across, beside) => {
    if (!across && !beside) return 0;
    return beside ? 2 : 1;
};

const borderType = (start, end) => start + (end * 3);

const expectedBorders = (sizeX, sizeY, state) => {
    const width = sizeX + 2;
    const height = sizeY + 2;
    const area = Array.from({ length: height }, () => Array(width).fill(false));
    let remaining = state;
    const bottom = area[height - 1];

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) area[y][x] = true;
    }

    for (let x = width - 1; x >= 0; x--) {
        if (remaining & 1) bottom[x] = true;
        remaining >>= 1;
    }

    for (let y = height - 2; y >= 1; y--) {
        if (remaining & 1) area[y][width - 1] = true;
        remaining >>= 1;
        if (remaining & 1) area[y][0] = true;
        remaining >>= 1;
    }

    const top = area[0];
    for (let x = width - 1; x >= 0; x--) {
        if (remaining & 1) top[x] = true;
        remaining >>= 1;
    }

    const shown = [];
    const types = [];
    const add = (value) => {
        shown.push(value);
        types.push(1);
    };

    for (let x = 1; x < width - 1; x++) {
        if (!top[x]) {
            shown.push(true);
            types.push(borderType(cut(area[1][x - 1], top[x - 1]), cut(area[1][x + 1], top[x + 1])));
        } else add(false);
    }
    for (let y = 1; y < height - 1; y++) {
        if (!area[y][width - 1]) {
            shown.push(true);
            types.push(borderType(cut(area[y - 1][width - 2], area[y - 1][width - 1]), cut(area[y + 1][width - 2], area[y + 1][width - 1])));
        } else add(false);
    }
    for (let x = width - 2; x >= 1; x--) {
        if (!bottom[x]) {
            shown.push(true);
            types.push(borderType(cut(area[height - 2][x + 1], bottom[x + 1]), cut(area[height - 2][x - 1], bottom[x - 1])));
        } else add(false);
    }
    for (let y = height - 2; y >= 1; y--) {
        if (!area[y][0]) {
            shown.push(true);
            types.push(borderType(cut(area[y + 1][1], area[y + 1][0]), cut(area[y - 1][1], area[y - 1][0])));
        } else add(false);
    }

    return { shown, types };
};

const callBorderUpdate = (sizeX, sizeY, state) => {
    const view = new FurnitureWaterAreaVisualization();
    view.object = {
        getState: () => state,
        model: { getValue: key => ({ size_x: sizeX, size_y: sizeY })[key] },
    };
    view.updateBorderData();
    return { shown: view._borders, types: view._borderTypes, hasShore: view._hasShore };
};

for (const [ sizeX, sizeY ] of [ [ 1, 1 ], [ 2, 1 ], [ 1, 2 ], [ 2, 2 ] ]) {
    await test(`FurnitureWaterAreaVisualization: AS3 border order and cuts for ${sizeX}x${sizeY}`, () => {
        const expectedLength = (sizeX * 2) + (sizeY * 2);

        const stateCount = 1 << (expectedLength + 4);

        for (let state = 0; state < stateCount; state++) {
            const expected = expectedBorders(sizeX, sizeY, state);
            const actual = callBorderUpdate(sizeX, sizeY, state);

            assert.equal(actual.shown.length, expectedLength);
            assert.deepEqual([ ...actual.shown ], expected.shown, `state ${state}`);
            assert.deepEqual([ ...actual.types ], expected.types, `state ${state}`);
            assert.equal(actual.hasShore, expected.shown.includes(true), `state ${state}`);
        }
    });
}

const pixelMask = (width, height) => ({ width, height, alpha: new Uint8Array(width * height) });
const setPixel = (mask, x, y, value) => {
    x = Math.trunc(x);
    y = Math.trunc(y);
    if (x >= 0 && y >= 0 && x < mask.width && y < mask.height) mask.alpha[(y * mask.width) + x] = value;
};
const fillRect = (mask, x, y, width, height, value) => {
    const left = Math.max(0, Math.floor(x));
    const top = Math.max(0, Math.floor(y));
    // Native AIR rounds the far edge; exact halfway values select the even integer.
    const edge = n => n % 1 === 0.5 ? 2 * Math.round(n / 2) : Math.round(n);
    const right = Math.min(mask.width, edge(x + width));
    const bottom = Math.min(mask.height, edge(y + height));
    for (let row = top; row < bottom; row++) mask.alpha.fill(value, (row * mask.width) + left, (row * mask.width) + Math.max(left, right));
};
const topLeft = (mask, x, y, phase, value) => {
    while (y >= 0) {
        for (let row = y; row >= 0; row--) setPixel(mask, x, row, value);
        if (++phase >= 2) {
            y--;
            phase = 0;
        }
        x++;
    }
};
const bottomRight = (mask, x, y, value) => {
    while (x < mask.width) {
        for (let column = x; column < mask.width; column++) setPixel(mask, column, y, value);
        y--;
        x += 2;
    }
};
const flip = (mask, flipH, flipV) => {
    const result = pixelMask(mask.width, mask.height);
    for (let y = 0; y < mask.height; y++) for (let x = 0; x < mask.width; x++) {
        const fromX = flipH ? mask.width - 1 - x : x;
        const fromY = flipV ? mask.height - 1 - y : y;
        result.alpha[(y * mask.width) + x] = mask.alpha[(fromY * mask.width) + fromX];
    }
    return result;
};

const expectedMask = (width, height, size, outerCut, innerCut, right) => {
    const mask = pixelMask(width, height);

    if (!right) {
        topLeft(mask, Math.trunc(width / 2), Math.trunc((height / 2) - 1), 1, 255);
        if (outerCut === 1) topLeft(mask, Math.trunc(width / 2), Math.trunc((height / 2) - (size / 2) - 1), 1, 0);
        if (outerCut === 2) fillRect(mask, Math.trunc(width / 2), 0, width, Math.trunc((height / 2) - (size / 2)), 0);
        if (innerCut === 2) fillRect(mask, Math.trunc((width / 2) + (size / 2)), 0, width, height / 2, 0);
        return mask;
    }

    bottomRight(mask, Math.trunc((width / 2) + 1), Math.trunc((height / 2) - 1), 255);
    if (outerCut === 1) bottomRight(mask, Math.trunc((width / 2) + size + 1), Math.trunc((height / 2) - 1), 0);
    if (outerCut === 2) fillRect(mask, Math.trunc((width / 2) + size), 0, width, Math.trunc(height / 2), 0);
    if (innerCut === 2) fillRect(mask, Math.trunc((width / 2) + (size / 2)), 0, width, (height / 2) - (size / 4), 0);
    return mask;
};

const collection = {
    assets: new Map(),
    addAsset(name, asset) { this.assets.set(name, asset); },
    getAsset(name) { return this.assets.get(name); },
};
const shore = { texture: { width: 9, height: 7 } };

await test('ShoreMaskCreatorUtility: AS3 six cut pairs produce all eight orientations', () => {
    assert.equal(ShoreMaskCreatorUtility.initializeShoreMasks(3, collection, shore), true);

    const pairs = [ [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ] ];
    const expected = new Map();
    for (const [ outer, inner ] of pairs) {
        const left = expectedMask(9, 7, 3, outer, inner, false);
        expected.set(`mask_3_0_${borderType(outer, inner)}`, left);
        expected.set(`mask_3_3_${borderType(inner, outer)}`, flip(left, false, true));
        expected.set(`mask_3_4_${borderType(outer, inner)}`, flip(left, true, true));
        expected.set(`mask_3_7_${borderType(inner, outer)}`, flip(left, true, false));

        const right = expectedMask(9, 7, 3, outer, inner, true);
        expected.set(`mask_3_1_${borderType(inner, outer)}`, right);
        expected.set(`mask_3_2_${borderType(outer, inner)}`, flip(right, false, true));
        expected.set(`mask_3_5_${borderType(inner, outer)}`, flip(right, true, true));
        expected.set(`mask_3_6_${borderType(outer, inner)}`, flip(right, true, false));
    }

    assert.equal(expected.size, 48);
    for (const [ name, want ] of expected) {
        const match = /^mask_3_(\d+)_(\d+)$/.exec(name);
        assert.ok(match, name);
        const segment = Number(match[1]);
        const type = Number(match[2]);
        const actual = ShoreMaskCreatorUtility.createShoreMask2x2(pixelMask(9, 7), 3, [ ...Array(segment).fill(false), true ], [ ...Array(segment).fill(0), type ], collection);
        assert.deepEqual([ ...actual.alpha ], [ ...want.alpha ], name);
    }
});

await test('ShoreMaskCreatorUtility: createShoreMask2x2 ORs shown masks in segment order', () => {
    const target = pixelMask(3, 2);
    const borders = [ true, false, true ];
    const types = [ 4, 0, 7 ];
    ShoreMaskCreatorUtility.initializeShoreMasks(5, collection, shore);
    const result = ShoreMaskCreatorUtility.createShoreMask2x2(target, 5, borders, types, collection);
    const first = ShoreMaskCreatorUtility.createShoreMask2x2(pixelMask(3, 2), 5, [ true, false, false ], [ 4 ], collection);
    const last = ShoreMaskCreatorUtility.createShoreMask2x2(pixelMask(3, 2), 5, [ false, false, true ], [ 0, 0, 7 ], collection);
    const expected = new Uint8Array(6);
    for (let i = 0; i < expected.length; i++) expected[i] = first.alpha[i] || last.alpha[i] ? 255 : 0;
    assert.deepEqual([ ...result.alpha ], [ ...expected ]);
});

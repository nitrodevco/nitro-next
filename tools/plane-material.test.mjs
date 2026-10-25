/** Deterministic parity checks for AS3 plane material cell and matrix repetition. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const load = (path, dependencies) => {
    const source = readFileSync(new URL(`../packages/nitro-renderer/src/${path}.ts`, import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    });
    const exports = {};
    runInNewContext(outputText, { exports, require: (name) => {
        assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);
        return dependencies[name];
    } });
    return exports;
};

class Vector3d {
    constructor(x = 0, y = 0, z = 0) { Object.assign(this, { x, y, z }); }
    assign(value) { Object.assign(this, value); }
    static isEqual(a, b) { return a.x === b.x && a.y === b.y && a.z === b.z; }
}

class Point {
    constructor(x, y) { Object.assign(this, { x, y }); }
}

class Rectangle {
    constructor(x, y, width, height) { Object.assign(this, { x, y, width, height }); }
}

const makeCanvasMocks = () => {
    const operations = [];
    const makeCanvas = (width, height) => ({ width, height, id: `canvas-${operations.length}` });
    const planeCanvas = {
        createPlaneCanvas: makeCanvas,
        clearPlaneCanvas() {},
        releasePlaneCanvas() {},
        fillPlaneCanvas() {},
        // The real one defers the copies to one render pass; the order they are made in is what counts here.
        batchPlaneCanvas: (canvas, draw) => draw(),
        copyToPlaneCanvas(destination, source, x, y, frame) {
            operations.push({ destination, source, x, y, frame });
        },
    };
    return { operations, planeCanvas };
};

const makeColumn = canvasMocks => load(
    'room/object/visualization/room/rasterizer/basic/PlaneMaterialCellColumn',
    {
        '@nitrodevco/nitro-api': { Vector3d },
        'pixi.js': {},
        '../PlaneCanvas': canvasMocks.planeCanvas,
        './PlaneMaterialCell': { PlaneMaterialCell: class {} },
    },
).PlaneMaterialCellColumn;

const makeMatrix = (canvasMocks, randomValues = [ 0 ]) => load(
    'room/object/visualization/room/rasterizer/basic/PlaneMaterialCellMatrix',
    {
        '@nitrodevco/nitro-api': { Vector3d },
        'pixi.js': { Point, Rectangle },
        '../../utils': { Randomizer: { getValues: () => [ randomValues.shift() ?? 0 ] } },
        '../PlaneCanvas': canvasMocks.planeCanvas,
        './PlaneMaterialCell': { PlaneMaterialCell: class {} },
        './PlaneMaterialCellColumn': { PlaneMaterialCellColumn: class {} },
    },
).PlaneMaterialCellMatrix;

const texture = (id, width, height) => ({ id, width, height });
const normal = { x: 0, y: 0, z: 1 };

await test('PlaneMaterialCellColumn repeats all modes and preserves negative offsets', () => {
    const expected = {
        1: [ [ 'a', 0 ], [ 'b', 2 ], [ 'c', 5 ], [ 'a', 6 ] ],
        2: [ [ 'b', 2 ], [ 'a', 0 ], [ 'a', -2 ], [ 'c', 5 ], [ 'c', 6 ], [ 'c', 7 ] ],
        3: [ [ 'b', 2 ], [ 'b', 5 ], [ 'a', 0 ], [ 'c', 7 ] ],
        4: [ [ 'c', 7 ], [ 'b', 4 ], [ 'a', 2 ], [ 'a', 0 ], [ 'a', -2 ] ],
        5: [ [ 'a', 0 ], [ 'b', 2 ], [ 'c', 5 ], [ 'c', 6 ], [ 'c', 7 ] ],
    };
    for (const mode of Object.keys(expected).map(Number)) {
        const canvasMocks = makeCanvasMocks();
        const Column = makeColumn(canvasMocks);
        const cells = [ 2, 3, 1 ].map((height, index) => ({
            isStatic: true,
            getHeight: () => height,
            render: (_normal, offsetX, offsetY) => {
                assert.deepEqual([ offsetX, offsetY ], mode === 1 ? [ -3, -5 ] : [ 0, 0 ]);
                return texture(String.fromCharCode(97 + index), 1, height);
            },
            dispose() {},
            clearCache() {},
        }));
        const result = new Column(1, cells, mode).render(8, normal, -3, -5);
        assert.equal(result.height, 8);
        assert.deepEqual(canvasMocks.operations.map(({ source, y }) => [ source.id, y ]), expected[mode]);
    }
});

await test('PlaneMaterialCellMatrix repeats all modes, including deterministic RANDOM, with bottom alignment', () => {
    const expected = {
        1: [ [ 'a', 0, 8 ], [ 'b', 2, 7 ], [ 'c', 5, 9 ], [ 'a', 6, 8 ] ],
        2: [ [ 'b', 2, 7 ], [ 'a', 0, 8 ], [ 'a', -2, 8 ], [ 'c', 5, 9 ], [ 'c', 6, 9 ], [ 'c', 7, 9 ], [ 'c', 8, 9 ], [ 'c', 9, 9 ] ],
        3: [ [ 'b', 2, 7 ], [ 'b', 5, 7 ], [ 'a', 0, 8 ], [ 'c', 7, 9 ] ],
        4: [ [ 'c', 7, 9 ], [ 'b', 4, 7 ], [ 'a', 2, 8 ], [ 'a', 0, 8 ], [ 'a', -2, 8 ] ],
        5: [ [ 'a', 0, 8 ], [ 'b', 2, 7 ], [ 'c', 5, 9 ], [ 'c', 6, 9 ], [ 'c', 7, 9 ] ],
        6: [ [ 'a', 0, 8 ], [ 'a', 2, 8 ], [ 'a', 4, 8 ], [ 'a', 6, 8 ] ],
    };
    for (const mode of Object.keys(expected).map(Number)) {
        const canvasMocks = makeCanvasMocks();
        const Matrix = makeMatrix(canvasMocks, [ 0 ]);
        const matrix = new Matrix(3, mode, 2);
        matrix._columns = [
            { width: 2, render: () => texture('a', 2, 2) },
            { width: 3, render: () => texture('b', 3, 3) },
            { width: 1, render: () => texture('c', 1, 1) },
        ];
        const result = matrix.render(undefined, 8, 10, normal, true, -3, -5, true);
        assert.equal(result.width, 8);
        assert.equal(result.height, 10);
        assert.deepEqual(canvasMocks.operations.map(({ source, x, y }) => [ source.id, x, y ]), expected[mode]);
    }
});

await test('PlaneMaterial normal ranges use inclusive AS3 boundaries', () => {
    const matrix = makeMatrix(makeCanvasMocks());
    const { PlaneMaterial } = load(
        'room/object/visualization/room/rasterizer/basic/PlaneMaterial',
        {
            '@nitrodevco/nitro-api': {},
            'pixi.js': {},
            './PlaneMaterialCellMatrix': { PlaneMaterialCellMatrix: matrix },
        },
    );
    const material = new PlaneMaterial();
    const selected = material.addMaterialCellMatrix(1, 1, 1, -0.25, 0.5, -0.75, 0.25);
    assert.equal(material.getMaterialCellMatrix({ x: -0.25, y: -0.75 }), selected);
    assert.equal(material.getMaterialCellMatrix({ x: 0.5, y: 0.25 }), selected);
    assert.equal(material.getMaterialCellMatrix({ x: -0.2501, y: 0 }), undefined);
    assert.equal(material.getMaterialCellMatrix({ x: 0, y: 0.2501 }), undefined);
});

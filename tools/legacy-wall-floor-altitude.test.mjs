/** LegacyWallGeometry floor altitude checks against Flash's stair comparison (every height through AS3 `int()`). */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const load = () => {
    const source = readFileSync(new URL('../packages/nitro-renderer/src/room/utils/LegacyWallGeometry.ts', import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    });
    const exports = {};
    runInNewContext(outputText, {
        exports,
        require: (dependency) => {
            assert.equal(dependency, '@nitrodevco/nitro-api');
            return { Vector3d: class {}, RoomGeometryScaleType: { ZoomedIn: 64 } };
        },
    });
    return exports.LegacyWallGeometry;
};

const createGeometry = () => {
    const LegacyWallGeometry = load();
    const geometry = new LegacyWallGeometry();

    geometry.initialize(3, 3, 0);
    geometry.setHeight(1, 1, 2);

    return geometry;
};

for (const [ x, y, direction ] of [
    [ 0, 0, 'diagonal' ],
    [ 1, 0, 'cardinal' ],
]) {
    await test(`fractional ${direction} neighbor is truncated before the comparison`, () => {
        const geometry = createGeometry();

        geometry.setHeight(x, y, 3.6);

        assert.equal(geometry.getFloorAltitude(1, 1), 2.5);
    });
}

await test('an integer cardinal or diagonal stair neighbor lifts the plateau', () => {
    for (const [ x, y ] of [ [ 1, 0 ], [ 0, 0 ] ]) {
        const geometry = createGeometry();

        geometry.setHeight(x, y, 3);

        assert.equal(geometry.getFloorAltitude(1, 1), 2.5);
    }
});

await test('the current tile is truncated before calculating the next height', () => {
    const geometry = createGeometry();

    geometry.setHeight(1, 1, 2.9);
    geometry.setHeight(1, 0, 3);

    assert.equal(geometry.getFloorAltitude(1, 1), 2.5);
});

const neighbors = [ [ -1, -1 ], [ 0, -1 ], [ 1, -1 ], [ -1, 0 ], [ 1, 0 ], [ -1, 1 ], [ 0, 1 ], [ 1, 1 ] ];

await test('all eight neighbors lift when their truncated height is the next integer', () => {
    for (const [ dx, dy ] of neighbors) {
        for (const neighbor of [ 1, 2, 2.5, 2.999, 3, 3.001, 3.5, 4 ]) {
            const geometry = createGeometry();
            geometry.setHeight(1 + dx, 1 + dy, neighbor);
            assert.equal(geometry.getFloorAltitude(1, 1), Math.trunc(neighbor) === 3 ? 2.5 : 2, `${dx},${dy}: ${neighbor}`);
        }
    }
});

await test('current and next heights follow AS3 int coercion', () => {
    for (const [ height, next, expected ] of [
        [ -2.9, -1, -1.5 ],
        [ 2147483647, -2147483648, 2147483647.5 ],
        [ 4294967298, 3, 2.5 ],
        [ NaN, 1, 0.5 ],
        [ Infinity, 1, 0.5 ],
    ]) {
        const geometry = createGeometry();
        geometry.setHeight(1, 1, height);
        geometry.setHeight(0, 0, next);
        assert.equal(geometry.getFloorAltitude(1, 1), expected);
    }
});

await test('flat rooms, map boundaries and multiple matching neighbors preserve the half-step rule', () => {
    const geometry = createGeometry();
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) geometry.setHeight(x, y, 2);
    }
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) assert.equal(geometry.getFloorAltitude(x, y), 2);
    }
    geometry.setHeight(1, 0, 3);
    geometry.setHeight(0, 1, 3);
    assert.equal(geometry.getFloorAltitude(0, 0), 2.5);
    assert.equal(geometry.getFloorAltitude(1, 1), 2.5, 'multiple neighbors must not add multiple half-steps');
    assert.equal(geometry.getFloorAltitude(-1, -1), 0);
    assert.equal(geometry.getFloorAltitude(3, 3), 0);
});

await test('deterministic height maps match a source-derived AS3 altitude oracle', () => {
    // AS3 declares current and next as int, int()-coerces all eight neighbors, and adds once.
    const heights = [ -1, 0, 0.5, 1, 1.25, 2, 2.9, 3, 3.6, 20 ];
    let comparisons = 0;
    for (let seed = 0; seed < 100; seed++) {
        const geometry = createGeometry();
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) geometry.setHeight(x, y, heights[(seed * (x + 1) + y * 7 + x * y) % heights.length]);
        }
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                const current = geometry.getHeight(x, y) | 0;
                const next = (current + 1) | 0;
                const raised = neighbors.some(([ dx, dy ]) => (geometry.getHeight(x + dx, y + dy) | 0) === next);
                assert.equal(geometry.getFloorAltitude(x, y), current + (raised ? 0.5 : 0));
                comparisons++;
            }
        }
    }
    assert.equal(comparisons, 900);
});

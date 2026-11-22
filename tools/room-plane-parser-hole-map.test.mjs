/**
 * `RoomPlaneParser.initializeFromMapData` adds every floor hole of the map's hole list and steps past
 * an empty slot in it: without the step the loop never ended and the tab hung.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createContext, runInContext } from 'node:vm';

import { createLoader } from './load-source.mjs';

const external = {};

const loader = createLoader();
const loadFile = url => loader(url, external);

external['@nitrodevco/nitro-api'] = loadFile(new URL('../packages/nitro-api/src/utils/Vector3d.ts', import.meta.url));
external['pixi.js'] = {
    Point: class {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
    },
};

const { RoomPlaneParser } = loadFile(new URL('../packages/nitro-renderer/src/room/object/RoomPlaneParser.ts', import.meta.url));

/** A 6 x 6 room of flat tiles with the given hole list. */
const mapData = holeMap => ({
    width: 6,
    height: 6,
    wallHeight: 0,
    fixedWallsHeight: -1,
    tileMap: Array.from({ length: 6 }, (_, y) => Array.from({ length: 6 }, (_, x) => ({ height: (x === 0 || y === 0) ? -110 : 0 }))),
    holeMap,
    doors: [],
    dimensions: { minX: 1, maxX: 5, minY: 1, maxY: 5 },
});

/** Parses in a context that stops the parse after 2 s, so a parser that never returns fails rather than hangs. */
const parse = (data) => {
    const context = createContext({ parser: new RoomPlaneParser(), data });

    const result = runInContext('parser.initializeFromMapData(data)', context, { timeout: 2000 });

    return { result, parser: context.parser };
};

const hole = { id: 7, x: 2, y: 2, width: 2, height: 2, invert: false };

await test('an empty slot in the hole list is stepped past', () => {
    const { result, parser } = parse(mapData([ undefined, hole, null ]));

    assert.equal(result, true);
    assert.ok(parser._floorHoles.has(7));
});

await test('the empty slot makes no difference to the planes', () => {
    const withGap = parse(mapData([ undefined, hole ])).parser;
    const without = parse(mapData([ hole ])).parser;

    assert.equal(withGap.planeCount, without.planeCount);
    assert.ok(without.planeCount > 0);
});

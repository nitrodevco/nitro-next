/**
 * `chatScreenPoint` - `HabboFreeFlowChat.getScreenPointFromRoomLocation`: a room location on screen
 * from the canvas's middle at its scale, negated in a flipped room, plus the canvas offset.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const load = () => {
    const source = readFileSync(new URL('../packages/nitro-react/src/chat/chatScreenPoint.ts', import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};

    class Point {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
    }

    runInNewContext(outputText, {
        exports,
        require: (name) => {
            if (name === 'pixi.js') return { Point };
            if (name === '@nitrodevco/nitro-api') return {};
            throw new Error(`Unexpected dependency: ${name}`);
        },
    });

    return exports.chatScreenPoint;
};

const chatScreenPoint = load();
// The geometry's screen point for the location: 10 right, 4 down of the room's origin.
const canvas = isFlipped => ({ width: 800, height: 600, scale: 2, isFlipped, geometry: { getScreenPoint: () => ({ x: 10, y: 4 }) } });
const offset = { x: 30, y: 20 };

await test('a location lands at the canvas middle plus its screen point, both at the scale, and the offset', () => {
    const point = chatScreenPoint(canvas(false), offset, { x: 1, y: 1, z: 0 });

    assert.deepEqual([ point.x, point.y ], [ (800 * 2 / 2) + (10 * 2) + 30, (600 * 2 / 2) + (4 * 2) + 20 ]);
});

await test('a flipped room negates the scale, as getRoomCanvasIsFlipped does', () => {
    const point = chatScreenPoint(canvas(true), offset, { x: 1, y: 1, z: 0 });

    assert.deepEqual([ point.x, point.y ], [ (800 * -2 / 2) + (10 * -2) + 30, (600 * -2 / 2) + (4 * -2) + 20 ]);
});

await test('no location is the canvas middle alone, without the offset', () => {
    const point = chatScreenPoint(canvas(false), offset, undefined);

    assert.deepEqual([ point.x, point.y ], [ 800, 600 ]);
});

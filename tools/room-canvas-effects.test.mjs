/** Regressions for Flash RotatingRoomSpriteCanvas: the room effects SpecialRoomEffect starts. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

class Vector3d {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    assign(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
    }

    static sum(a, b) {
        return new Vector3d(a.x + b.x, a.y + b.y, a.z + b.z);
    }
}

// The effects are static singletons in the renderer; the canvas only asks whether each is on.
const effects = { shaking: false, rotating: false };
const RoomShakingEffect = { isVisualizationOn: () => effects.shaking };
const RoomRotatingEffect = { isVisualizationOn: () => effects.rotating };

// Run the production methods without constructing a GPU renderer or loading room assets.
const source = readFileSync(new URL('../packages/nitro-renderer/src/room/RoomSpriteCanvas.ts', import.meta.url), 'utf8');
const ast = ts.createSourceFile('RoomSpriteCanvas.ts', source, ts.ScriptTarget.Latest, true);
const names = [ 'render', 'doMagic', 'changeShaking', 'changeRotation' ];
const members = ast.statements.find(ts.isClassDeclaration).members.filter(m => names.includes(m.name?.getText(ast)));
assert.equal(members.length, names.length);
const code = `class Subject { ${members.map(m => m.getText(ast)).join('\n')} }; Subject;`;
const Canvas = runInNewContext(ts.transpileModule(code, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, { Vector3d, RoomShakingEffect, RoomRotatingEffect, performance, drawnRoomSpriteShift: () => 0 });

const BASE = Object.freeze({ x: -45, y: 30, z: 0 });

const fixture = () => {
    const geometry = {
        _direction: new Vector3d(BASE.x, BASE.y, BASE.z),
        get direction() {
            return this._direction;
        },
        // RoomGeometry ignores an empty direction, so an idle canvas leaves the camera alone.
        set direction(v) {
            if (v) this._direction = new Vector3d(v.x, v.y, v.z);
        },
    };

    return Object.assign(new Canvas(), {
        _geometry: geometry,
        geometry,
        _renderTimestamp: 0,
        _rotation: 0,
        _SafeStr_4507: false,
        _SafeStr_795: 0,
        _room: { objects: new Map() },
        _sortableSprites: [],
        updateZoomSampling() {},
        cleanSprites() {},
        calculateUpdateInterval() {},
    });
};

const direction = canvas => ({ ...canvas.geometry.direction });

await test('a shaking room wobbles the camera once per frame and settles back when it ends', () => {
    effects.shaking = false;
    const canvas = fixture();

    canvas.render(1);
    assert.deepEqual(direction(canvas), BASE, 'an idle canvas does not move the camera');

    effects.shaking = true;
    canvas.render(2);
    const first = direction(canvas);
    assert.notDeepEqual(first, BASE, 'the shake reaches the geometry the frame is drawn with');

    canvas.render(2);
    assert.deepEqual(direction(canvas), first, 'a second render of the same frame does not step it again');

    canvas.render(3);
    assert.notDeepEqual(direction(canvas), first, 'the next frame steps it on');

    effects.shaking = false;
    canvas.render(4);
    assert.deepEqual(direction(canvas), BASE, 'the camera returns to where it stood');
});

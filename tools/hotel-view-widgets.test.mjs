/**
 * Reception widget arithmetic against the AS3: `MovingBackgroundObjects` and its four object types,
 * and the community goal meter's needle (`CommunityGoalWidget`, `CommunityGoalVsModeWidget`).
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const load = (path, dependencies = {}) => {
    const source = readFileSync(new URL(`../packages/${path}.ts`, import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};

    runInNewContext(outputText, { exports, require: (name) => {
        assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);

        return dependencies[name];
    } });

    return exports;
};

const objects = load('nitro-react/src/views/hotel-view/movingBackgroundObjects');
const widgets = load('nitro-react/src/context/system/store/HotelViewWidgets', { './HotelViewSlice': load('nitro-react/src/context/system/store/HotelViewSlice'), '#base/utils': load('nitro-theme/src/utils/cssHexColor') });

const LIBRARY = 'https://images.example/';
const stage = { width: 1000, height: 800, desktopHeight: 800, random: () => 0.5 };
const make = (variables, code = '') => objects.createMovingBackgroundObjects(key => variables[key] ?? '', code, LIBRARY);
const step = (list, dt, size = { width: 20, height: 10 }) => objects.updateMovingBackgroundObjects(list, dt, stage, () => size);
/** The module runs in its own realm: its arrays are compared by value. */
const plain = value => JSON.parse(JSON.stringify(value));

await test('objects are read by index from the default or the timing code\'s variables, skipping what is not one', () => {
    const variables = {
        'landing.view.bgobject.1': 'cloud;line;0;-100;0.1;0',
        'landing.view.bgobject.3': 'bird;spiral;100;0;-0.01;0.001;500;300',
        'landing.view.bgobject.4': 'nothing',
        'landing.view.bgobject.5': 'x;teleport;1;2',
        'landing.view.night.bgobject.2': 'star;animated;3;10;5;6;1',
    };

    assert.deepEqual(plain(make(variables).map(object => [ object.id, object.sprite.asset ])), [
        [ 1, `${LIBRARY}reception/cloud.png` ],
        [ 3, `${LIBRARY}reception/bird.png` ],
    ]);
    assert.deepEqual(plain(make(variables, 'night').map(object => [ object.id, object.sprite.asset ])), [ [ 2, `${LIBRARY}reception/star1.png` ] ]);
    // A random walk's image is the library's own, without `reception/`.
    assert.equal(make({ 'landing.view.bgobject.1': 'fly;randomwalk;0;0;10;0;5;5;1000' })[0].sprite.asset, `${LIBRARY}fly.png`);
});

await test('a line counts y from the desktop bottom and starts over once past the edge it moves to', () => {
    const [ line ] = make({ 'landing.view.bgobject.1': 'cloud;line;990;-100;0.1;0' });

    step([ line ], 50);
    assert.deepEqual([ line.sprite.x, line.sprite.y ], [ 995, 700 ]);

    step([ line ], 100);
    // Past the right edge: drawn there this frame, back at the start for the next.
    assert.equal(line.sprite.x, 1005);
    step([ line ], 0);
    assert.equal(line.sprite.x, 990);
});

await test('a random walk drifts by its speed in pixels a second', () => {
    const [ walker ] = make({ 'landing.view.bgobject.1': 'fly;randomwalk;10;20;100;0;0;0;1000' });

    step([ walker ], 500);
    assert.deepEqual([ walker.sprite.x, walker.sprite.y ], [ 60, 20 ]);
});

await test('a spiral closes in on its centre, drawn larger, and starts over at the centre', () => {
    const [ spiral ] = make({ 'landing.view.bgobject.1': 'bird;spiral;100;0;-0.1;0;500;300' });

    step([ spiral ], 100, { width: 90, height: 90 });
    // Radius 100 -> 90 at angle 0: straight below the centre, at the start radius' scale 1 + 1/8.
    assert.deepEqual([ spiral.sprite.x, spiral.sprite.y, spiral.sprite.width ], [ 500, 390, 80 ]);

    step([ spiral ], 1000, { width: 90, height: 90 });
    // Through the centre: back out at the start radius, its native size before this frame's scale.
    assert.equal(spiral.sprite.y, 400);
});

await test('an animation plays once, then again when an object it watches starts over', () => {
    const name = object => object.sprite.asset.slice(LIBRARY.length + 'reception/'.length);
    const [ alone ] = make({ 'landing.view.bgobject.2': 'star;animated;3;10;5;6;1' });
    const frames = [];

    for (let i = 0; i < 4; i++) {
        step([ alone ], 100);
        frames.push(name(alone));
    }

    // 10 frames a second: a frame each 100 ms, then the last held.
    assert.deepEqual(frames, [ 'star1.png', 'star2.png', 'star3.png', 'star3.png' ]);
    assert.deepEqual([ alone.sprite.x, alone.sprite.y ], [ 5, 6 ]);

    // A cloud (object 1) the star watches: once it has left the stage, the strip plays again.
    const list = make({ 'landing.view.bgobject.1': 'cloud;line;0;0;1;0', 'landing.view.bgobject.2': 'star;animated;3;10;5;6;1' });

    for (let i = 0; i < 5; i++) step(list, 100);
    assert.equal(name(list[1]), 'star3.png');

    // The frame the cloud starts over on shows the strip's first again.
    step(list, 1001);
    assert.equal(name(list[1]), 'star1.png');
});

await test('the community goal needle starts each level at its base frame and moves on by its share', () => {
    const frame = (level, percent) => widgets.communityGoalNeedleFrame({ communityHighestAchievedLevel: level, percentCompletionTowardsNextLevel: percent, scoreRemainingUntilNextLevel: 1 });

    assert.deepEqual([ frame(0, 0), frame(0, 50), frame(0, 100), frame(1, 50), frame(2, 99), frame(3, 0), frame(5, 40) ], [ 0, 4, 8, 12, 22, 23, 23 ]);
});

await test('the VS needle swings from the middle towards the side the score moves to', () => {
    const frame = (level, percent, remaining) => widgets.communityGoalVsNeedleFrame({ communityHighestAchievedLevel: level, percentCompletionTowardsNextLevel: percent, scoreRemainingUntilNextLevel: remaining });

    assert.deepEqual([ frame(0, 0, 1), frame(0, 50, 1), frame(0, 50, -1), frame(-3, 50, 1), frame(3, 0, 1), frame(2, 50, 1) ], [ 12, 14, 8, 0, 23, 23 ]);
});

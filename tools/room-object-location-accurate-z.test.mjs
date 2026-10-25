/**
 * RoomObjectLocationCacheItem: depth from the rounded tile unless the model sets `object_accurate_z_value`
 * (wall items), and screen x/y left unrounded for the canvas's one snap (2026 client).
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const ACCURATE_Z = 'object_accurate_z_value';

class Vector3d {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    assign(vector) {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
    }
}

const load = () => {
    const source = readFileSync(new URL('../packages/nitro-renderer/src/room/object/cache/RoomObjectLocationCacheItem.ts', import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    });
    const exports = {};
    runInNewContext(outputText, {
        exports,
        require: (dependency) => {
            assert.equal(dependency, '@nitrodevco/nitro-api');
            return { Vector3d, RoomObjectVariableEnum: { ObjectAccurateZValue: ACCURATE_Z } };
        },
    });
    return exports.RoomObjectLocationCacheItem;
};

// A depth that differs between a location and its rounded tile, so the two paths are told apart.
const geometry = { updateId: 1, getScreenPosition: location => new Vector3d(location.x * 32, location.y * 16, (location.x * 10) + location.y) };

const object = (x, y, accurate) => ({
    updateCounter: 1,
    getLocation: () => new Vector3d(x, y, 0),
    model: { getValue: key => ((key === ACCURATE_Z) ? accurate : undefined) },
});

await test('an object without the variable sorts by its rounded tile', () => {
    const RoomObjectLocationCacheItem = load();
    const location = new RoomObjectLocationCacheItem(ACCURATE_Z).updateLocation(object(2.4, 3.6, undefined), geometry);

    assert.equal(location.z, (2 * 10) + 4);
});

await test('an object with the variable set keeps its exact depth', () => {
    const RoomObjectLocationCacheItem = load();
    const location = new RoomObjectLocationCacheItem(ACCURATE_Z).updateLocation(object(2.4, 3.6, 1), geometry);

    assert.equal(location.z, (2.4 * 10) + 3.6);
});

await test('the variable set to 0 is the same as unset', () => {
    const RoomObjectLocationCacheItem = load();
    const location = new RoomObjectLocationCacheItem(ACCURATE_Z).updateLocation(object(2.4, 3.6, 0), geometry);

    assert.equal(location.z, (2 * 10) + 4);
});

await test('the screen x and y are left unrounded', () => {
    const RoomObjectLocationCacheItem = load();
    const location = new RoomObjectLocationCacheItem(ACCURATE_Z).updateLocation(object(2.4, 3.6, undefined), geometry);

    assert.equal(location.x, 2.4 * 32);
    assert.equal(location.y, 3.6 * 16);
});

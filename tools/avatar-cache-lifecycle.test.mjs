/** AvatarVisualization cache ownership and scale/effect lifecycle checks. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

class AdvancedMap {
    values = new Map();

    get length() { return this.values.size; }

    getValue(key) { return this.values.get(key); }

    add(key, value) { this.values.set(key, value); }

    getKey(index) { return [ ...this.values.keys() ][index]; }

    remove(key) {
        const value = this.values.get(key);
        this.values.delete(key);
        return value;
    }

    getValues() { return [ ...this.values.values() ]; }

    reset() { this.values.clear(); }
}

class RoomObjectSpriteVisualization {
    static UPDATE_TIME_INCREASER = 1;
    static NO_FILTERS = [];
}

const load = () => {
    const source = readFileSync(new URL('../packages/nitro-renderer/src/room/object/visualization/avatar/AvatarVisualization.ts', import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    });
    const exports = {};
    const dependencies = {
        '@nitrodevco/nitro-api': {
            AdvancedMap,
            AvatarActionStateType: {},
            AvatarActionStateTypeUtilities: {},
            AvatarGenderType: { Male: 'M' },
            AvatarGuideStatus: {},
            AvatarSetType: {},
            IRoomObject: {},
            RoomGeometryScaleType: { AvatarSizeNormal: 64 },
            RoomObjectSpriteTypeEnum: {},
            RoomObjectVariableEnum: {},
        },
        'pixi.js': { ColorMatrixFilter: class {}, Filter: class {}, Texture: { EMPTY: {} } },
        'pixi-filters': { GlowFilter: class {} },
        '#renderer/assets': {},
        '#renderer/utils': { createFlashGlowFilter: () => ({}), GetTickerTime: () => 0 },
        '../furniture/FurnitureHighlightComposite': { FurnitureHighlightComposite: class { update() {} clear() {} dispose() {} } },
        '../furniture/FurnitureHighlightFilters': { FurnitureHighlightFilters: { quantizeStrength: () => 0, create: () => [], usesCompositeSilhouette: () => false } },
        '../RoomObjectSprite': { RoomObjectSprite: class {} },
        '../RoomObjectSpriteVisualization': { RoomObjectSpriteVisualization },
        '../variablefx/IVariableFxVisualizationRoomData': {},
        '../variablefx/VariableFxStatusReconciler': { VariableFxStatusReconciler: class {} },
        './additions': {},
        './AvatarVisualizationData': { AvatarVisualizationData: class {} },
    };

    runInNewContext(outputText, {
        exports,
        require: (dependency) => {
            assert.ok(Object.hasOwn(dependencies, dependency), `Unexpected dependency: ${dependency}`);
            return dependencies[dependency];
        },
    });

    return exports.AvatarVisualization;
};

const image = (name, disposeCalls) => ({
    name,
    dispose: () => disposeCalls.set(name, (disposeCalls.get(name) ?? 0) + 1),
    disposeInactiveActionCache() {},
    isPlaceholder: () => false,
    isBlocked: () => false,
    updateAnimationByFrames() {},
    getCanvasOffsets: () => [ 0, 0, 0 ],
    getImageWithCroppedTop: () => ({ width: 64, height: 64 }),
    isAnimating: () => false,
    getDirection: () => 0,
    getSprites: () => [],
    avatarSpriteData: undefined,
});

await test('update reuses cached scale/effect images and reset disposes each image once', () => {
    const AvatarVisualization = load();
    const disposeCalls = new Map();
    const created = [];
    const visualization = new AvatarVisualization();
    const sprite = { alpha: 255, color: 0xFFFFFF, filters: [] };
    const next = { scale: 64, effect: 0, alpha: 1 };

    Object.assign(visualization, {
        object: { model: { getValue: () => undefined } },
        _figure: 'hd-180-1',
        _gender: 'M',
        _additions: new Map(),
        _data: { createAvatarImage: (_figure, scale, _gender, _listener, _effectListener, _blocked) => {
            const name = `${scale}-${next.effect}`;
            const createdImage = image(name, disposeCalls);
            created.push(createdImage);
            return createdImage;
        } },
        updateModel: () => {
            visualization._effect = next.effect;
            visualization._alphaMultiplier = next.alpha;
            return true;
        },
        getSprite: () => sprite,
        updateShadow: () => {},
        updateObject: () => false,
        processActionsForAvatar: () => {},
    });

    const update = () => visualization.update({ scale: next.scale }, 0, false, false);

    update();
    next.scale = 32;
    update();
    next.scale = 64;
    update();
    next.effect = 2;
    update();
    next.alpha = 0.5;
    update();
    next.effect = 0;
    next.alpha = 1;
    update();

    assert.equal(created.length, 3, 'scale/effect selections create one image per cache key');
    assert.equal(visualization._avatarImage, created[0], '64/effect 0 is reused after returning from 32');
    assert.equal(disposeCalls.size, 0, 'cached images stay alive while selections change');

    visualization.resetAvatar();
    visualization.resetAvatar();

    assert.deepEqual([ ...disposeCalls.entries() ], [ [ '64-0', 1 ], [ '32-0', 1 ], [ '64-2', 1 ] ]);
});

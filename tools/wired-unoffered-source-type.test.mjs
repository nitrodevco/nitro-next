/**
 * A box saved with a source type its own type picker does not offer keeps it (`docs/wired.md`, "A
 * source type the picker does not offer"): Flash's `onEditInitialized` `select`s only an option equal
 * to the saved value, and `readIntParamsFromForm` writes the field as it is. The forms used to
 * resolve it to the picker's first option at `createForm`, so saving such a box sent furni.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const packets = new URL('../packages/nitro-packets/src/', import.meta.url);
const cache = new Map();

// Transpiled to CommonJS and run in a sandbox, as in wired-release-20261012.test.mjs.
const loadFile = (url, external) => {
    if (cache.has(url.href)) return cache.get(url.href);

    const source = readFileSync(url, 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};

    cache.set(url.href, exports);

    runInNewContext(outputText, { exports, require: (name) => {
        if (name.startsWith('.')) {
            const file = new URL(`${name}.ts`, url);

            return loadFile(existsSync(file) ? file : new URL(`${name}/index.ts`, url), external);
        }

        assert.ok(Object.hasOwn(external, name), `Unexpected dependency: ${name}`);

        return external[name];
    } });

    return exports;
};

const packetFile = path => loadFile(new URL(path, packets), {});
const external = {
    '@nitrodevco/nitro-api': { ColorConverter: {} },
    // `WiredUtil.clampSliderValue` is the theme's clamp.
    '#base/utils/clamp': loadFile(new URL('../packages/nitro-theme/src/utils/clamp.ts', import.meta.url), {}),
    '@nitrodevco/nitro-packets': {
        ...packetFile('incoming/Userdefinedroomevents/Data/WiredVariableTarget.ts'),
        ...packetFile('incoming/Userdefinedroomevents/Data/WiredVariableAvailability.ts'),
        ...packetFile('incoming/Userdefinedroomevents/Wiredmenu/Data/VariableExtraSourceTypes.ts'),
        ...packetFile('incoming/Userdefinedroomevents/Wiredmenu/Data/VariableType.ts'),
    },
};
const load = path => loadFile(new URL(`../packages/nitro-react/src/wired/${path}.ts`, import.meta.url), external);

const { hasVariableCondition } = load('elements/condition/HasVariable');
const { variableValueCondition } = load('elements/condition/VariableValue');
const { progressAchievementAction } = load('elements/action/ProgressAchievement');
const { createWithVariableSelector } = load('elements/selector/WithVariable');

const FURNI = 0;
/** No picker offers it: furni, users, global and context are the most any of these list. */
const UNOFFERED = 99;

const context = () => ({
    localize: key => key,
    // `wired.variables.context_visible` off, as on a hotel that has not turned it on.
    configBoolean: () => false,
    configString: () => '',
    menuEnabled: true,
    hasWritePermission: true,
    userId: 1,
    roomId: 1,
    guildMemberships: [],
    achievementsInRoom: [],
    roomVariables: [],
    elementMemory: () => ({}),
});

const triggerable = intParams => ({
    intParams,
    variableIds: [],
    stringParam: '',
    stuffIds: [],
    stuffIds2: [],
    wiredContext: { roomVariablesList: { hash: 1, variables: [] } },
});

// Spread: the sandbox's arrays are another realm's, which `deepStrictEqual` tells apart.
const saved = (definition, intParams) => [ ...definition.readIntParams(definition.createForm(triggerable(intParams), context()), context()) ];

await test('the variable conditions save an unoffered merged type as it was', () => {
    assert.equal(saved(hasVariableCondition, [ UNOFFERED ])[0], UNOFFERED);

    const ints = saved(variableValueCondition, [ UNOFFERED, 0, 0, 0, 0, UNOFFERED, 0 ]);

    assert.equal(ints[0], UNOFFERED);
    assert.equal(ints[5], UNOFFERED);
});

await test('a variable reference action saves an unoffered target as it was', () => {
    assert.equal(saved(progressAchievementAction, [ 0, 1, 0, UNOFFERED ])[3], UNOFFERED);
});

await test('with variable saves an unoffered reference target as it was', () => {
    assert.equal(saved(createWithVariableSelector(1, FURNI), [ 0, 2, 0, 0, UNOFFERED, 0 ])[4], UNOFFERED);
});

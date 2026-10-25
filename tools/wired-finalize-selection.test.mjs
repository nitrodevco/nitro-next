import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

// `VariablePickerPreset.finalizeSelection`: a box's `readVariableIds` sends a picked variable only
// while the room's list still has it, and `WiredVariable.§_-7h§` ("n") otherwise - the p-code's
// null branch, and what the official client sends (Variable Age ["n","n"], WIN63-202610121709).

const packets = new URL('../packages/nitro-packets/src/', import.meta.url);
const cache = new Map();

// Transpiled to CommonJS and run in a sandbox; relative imports load the real sources, the packets
// package is only the enums these modules use. Anything else is a dependency the test must name.
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

const external = {
    // `WiredUtil` colours with it; nothing here reaches that.
    '@nitrodevco/nitro-api': { ColorConverter: {} },
    // `WiredUtil.clampSliderValue` is the theme's clamp.
    '#base/utils/clamp': loadFile(new URL('../packages/nitro-theme/src/utils/clamp.ts', import.meta.url), {}),
    '@nitrodevco/nitro-packets': {
        ...loadFile(new URL('incoming/Userdefinedroomevents/Data/WiredVariableTarget.ts', packets), {}),
        ...loadFile(new URL('incoming/Userdefinedroomevents/Wiredmenu/Data/VariableExtraSourceTypes.ts', packets), {}),
        ...loadFile(new URL('incoming/Userdefinedroomevents/Wiredmenu/Data/VariableType.ts', packets), {}),
    },
};
const load = path => loadFile(new URL(`../packages/nitro-react/src/wired/${path}.ts`, import.meta.url), external);

const { finalizePickerSelection, createVariablePickerState } = load('common/WiredVariablePickerModel');
const { giveVariableAction } = load('elements/action/GiveVariable');
const { changeVariableAction } = load('elements/action/ChangeVariable');
const { placeFurniAction } = load('elements/action/PlaceFurni');

const FURNI = 0;

const variable = (variableId, variableName) => ({
    variableId,
    variableName,
    variableTarget: FURNI,
    variableType: 0,
    isInvisible: false,
    hasValue: true,
    canWriteValue: true,
    canCreateAndDelete: true,
    hasTextConnector: false,
});

const kept = variable('11', 'kept');
const deleted = variable('22', 'deleted');
const before = [ kept, deleted ];
const after = [ kept ];

const context = roomVariables => ({
    localize: key => key,
    configBoolean: () => false,
    configString: () => '',
    menuEnabled: true,
    hasWritePermission: true,
    userId: 1,
    roomId: 1,
    guildMemberships: [],
    achievementsInRoom: [],
    roomVariables,
    elementMemory: () => ({}),
});

// Spread: the sandbox's arrays are another realm's, which `deepStrictEqual` tells apart.
const read = (definition, form, roomVariables) => [ ...definition.readVariableIds(form, context(roomVariables)) ];

const triggerable = (intParams, variableIds) => ({
    intParams,
    variableIds,
    stringParam: '',
    stuffIds: [],
    stuffIds2: [],
    wiredContext: { roomVariablesList: { hash: 1, variables: before } },
});

await test('finalizePickerSelection sends only a variable the list still has', () => {
    const picker = createVariablePickerState(before, deleted.variableId, FURNI);

    assert.equal(finalizePickerSelection(before, picker), deleted.variableId);
    assert.equal(finalizePickerSelection(after, picker), 'n');
    assert.equal(finalizePickerSelection(before, createVariablePickerState(before, '', FURNI)), 'n');
    assert.equal(finalizePickerSelection(after, createVariablePickerState(before, kept.variableId, FURNI)), kept.variableId);
    // No list to check against: the id `init` kept is passed through.
    assert.equal(finalizePickerSelection(undefined, createVariablePickerState(undefined, 'n', FURNI)), 'n');
});

// WIN63-202610121624 `GiveVariable.readVariableIdsFromForm`: `[ picker, option == 1 ? reference : WiredVariable.§_-7h§ ]`.
await test('GIVE_VARIABLE drops a deleted variable and sends "n" for a typed initial value', () => {
    const form = giveVariableAction.createForm(triggerable([ FURNI, 0, 0, 0 ], [ deleted.variableId ]), context(before));

    assert.deepEqual(read(giveVariableAction, form, before), [ deleted.variableId, 'n' ]);
    assert.deepEqual(read(giveVariableAction, form, after), [ 'n', 'n' ]);

    const keptForm = giveVariableAction.createForm(triggerable([ FURNI, 0, 0, 0 ], [ kept.variableId ]), context(before));

    assert.deepEqual(read(giveVariableAction, keptForm, after), [ kept.variableId, 'n' ]);
});

await test('a picker and a value-or-variable section (CHANGE_VARIABLE) are finalized one by one', () => {
    // [ target, operator, option (1 = variable), value high, value low, reference target ]
    const form = changeVariableAction.createForm(triggerable([ FURNI, 0, 1, 0, 0, FURNI ], [ kept.variableId, deleted.variableId ]), context(before));

    assert.deepEqual(read(changeVariableAction, form, before), [ kept.variableId, deleted.variableId ]);
    assert.deepEqual(read(changeVariableAction, form, after), [ kept.variableId, 'n' ]);
});

await test('PLACE_FURNI keeps WiredVariable.§_-i8§ for an unused picker and finalizes a used one', () => {
    // [ ..., spawn with variable, value option, value, value target ]
    const spawning = placeFurniAction.createForm(triggerable([ 0, 0, 0, 0, 0, 0, 1, 0, 0, FURNI ], [ deleted.variableId, 'n' ]), context(before));
    const idle = placeFurniAction.createForm(triggerable([ 0, 0, 0, 0, 0, 0, 0, 0, 0, FURNI ], [ deleted.variableId, 'n' ]), context(before));

    assert.deepEqual(read(placeFurniAction, spawning, before), [ deleted.variableId, 'n' ]);
    assert.deepEqual(read(placeFurniAction, spawning, after), [ 'n', 'n' ]);
    assert.deepEqual(read(placeFurniAction, idle, after), [ 'n', 'n' ]);
});

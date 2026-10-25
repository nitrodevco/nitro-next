/**
 * WIN63-202610121624 wired variables round: what the new editors write and read
 * (`readIntParamsFromForm` / `onEditStart` of GiveVariable, ChangeVariable, VariableValue,
 * WithVariable, VariableAge, VariableUpdate and `variablefx/_-j10`), the unified input's text rules
 * (`ValueOrVariableSection.onInputTextChanged` / `currentValidationError`), the precise delay
 * converter (`slider_converter/_-Cw`), `WiredVariable`'s two new fields and `Util`'s connected and
 * packed texts.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const packets = new URL('../packages/nitro-packets/src/', import.meta.url);
const cache = new Map();

// Transpiled to CommonJS and run in a sandbox; relative imports load the real sources, the
// packages are only what these modules use (as in wired-finalize-selection.test.mjs).
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

const { giveVariableAction } = load('elements/action/GiveVariable');
const { changeVariableAction } = load('elements/action/ChangeVariable');
const { variableValueCondition } = load('elements/condition/VariableValue');
const { variableAgeCondition } = load('elements/condition/VariableAge');
const { createWithVariableSelector } = load('elements/selector/WithVariable');
const { variableUpdateTrigger } = load('elements/trigger/VariableUpdate');
const { readValueOrVariableText, valueOrVariableValidationError, createValueOrVariableState } = load('common/WiredVariableSections');
const { SLIDER_CONVERTER_PRECISE_DELAY } = load('common/sliderConverters');
const { getConnectedText, getPackedVariableText } = load('common/WiredUtil');

const FURNI = 0;
const USER = 1;

const variable = (variableId, variableName, extra = {}) => ({
    variableId,
    variableName,
    variableTarget: FURNI,
    variableType: 0,
    availabilityType: 1,
    isInvisible: false,
    hasValue: true,
    canWriteValue: true,
    canCreateAndDelete: true,
    canInterceptChanges: true,
    canReadCreationTime: true,
    canReadLastUpdateTime: true,
    requiresExecutionContext: false,
    ...extra,
});

const level = variable('11', 'level');
const bonus = variable('22', 'bonus');
const variables = [ level, bonus ];

const context = () => ({
    localize: key => key,
    configBoolean: () => false,
    configString: () => '',
    menuEnabled: true,
    hasWritePermission: true,
    userId: 1,
    roomId: 1,
    guildMemberships: [],
    achievementsInRoom: [],
    roomVariables: variables,
    elementMemory: () => ({}),
});

const triggerable = (intParams, variableIds) => ({
    intParams,
    variableIds,
    stringParam: '',
    stuffIds: [],
    stuffIds2: [],
    wiredContext: { roomVariablesList: { hash: 1, variables } },
});

// Spread: the sandbox's arrays are another realm's, which `deepStrictEqual` tells apart.
const ints = (definition, form) => [ ...definition.readIntParams(form, context()) ];
const ids = (definition, form) => [ ...definition.readVariableIds(form, context()) ];
const roundTrip = (definition, intParams, variableIds) => {
    const form = definition.createForm(triggerable(intParams, variableIds), context());

    return { ints: ints(definition, form), ids: ids(definition, form) };
};

await test('GiveVariable writes [target, value hi, lo, override, option, ref target, same holder] and [variable, reference]', () => {
    // A value read from "bonus" on each furni itself.
    assert.deepEqual(roundTrip(giveVariableAction, [ FURNI, 0, 0, 1, 1, FURNI, 1 ], [ level.variableId, bonus.variableId ]), { ints: [ FURNI, 0, 0, 1, 1, FURNI, 1 ], ids: [ level.variableId, bonus.variableId ] });
    // A typed value: the reference is WiredVariable.§_-7h§ ("n").
    assert.deepEqual(roundTrip(giveVariableAction, [ FURNI, -1, -5, 0, 0, FURNI, 0 ], [ level.variableId, 'n' ]), { ints: [ FURNI, -1, -5, 0, 0, FURNI, 0 ], ids: [ level.variableId, 'n' ] });
});

await test('ChangeVariable and VariableValue add "same holder" at [6]; a box saved before reads it as off', () => {
    assert.deepEqual(roundTrip(changeVariableAction, [ FURNI, 1, 1, 0, 0, FURNI, 1 ], [ level.variableId, bonus.variableId ]).ints, [ FURNI, 1, 1, 0, 0, FURNI, 1 ]);
    assert.deepEqual(roundTrip(changeVariableAction, [ FURNI, 1, 1, 0, 0, FURNI ], [ level.variableId, bonus.variableId ]).ints, [ FURNI, 1, 1, 0, 0, FURNI, 0 ]);
    // Same holder only holds while the reference is on the box's own target.
    assert.deepEqual(roundTrip(changeVariableAction, [ FURNI, 1, 1, 0, 0, USER, 1 ], [ level.variableId, '' ]).ints[6], 0);
    assert.deepEqual(roundTrip(variableValueCondition, [ FURNI, 0, 1, 0, 0, FURNI, 1 ], [ level.variableId, bonus.variableId ]).ints, [ FURNI, 0, 1, 0, 0, FURNI, 1 ]);
});

await test('Furni with variable adds "same holder" at [5]', () => {
    const selector = createWithVariableSelector(1, FURNI);

    assert.deepEqual(roundTrip(selector, [ 0, 2, 0, 0, FURNI, 1 ], [ level.variableId, bonus.variableId ]).ints, [ 0, 2, 0, 0, FURNI, 1 ]);
});

await test('VariableAge writes the duration option and target at [6] and [7] and the reference id', () => {
    assert.deepEqual(roundTrip(variableAgeCondition, [ FURNI, 0, 0, 0, 0, 1, 1, FURNI ], [ level.variableId, bonus.variableId ]), { ints: [ FURNI, 0, 0, 0, 0, 1, 1, FURNI ], ids: [ level.variableId, bonus.variableId ] });
    assert.deepEqual(roundTrip(variableAgeCondition, [ FURNI, 0, 0, 0, 30, 1 ], [ level.variableId ]).ints, [ FURNI, 0, 0, 0, 30, 1, 0, FURNI ]);
});

await test('an empty variable slot is sent as "n", as the official client does', () => {
    // Official client capture (WIN63-202610121709): Variable Age with nothing picked ["n","n"];
    // a value-mode Change Variable [variable, "n"].
    assert.deepEqual(roundTrip(variableAgeCondition, [ USER, 0, 0, 0, 0, 1, 0, -10 ], []).ids, [ 'n', 'n' ]);
    assert.deepEqual(roundTrip(changeVariableAction, [ FURNI, 0, 0, 0, 0, -10, 0 ], [ level.variableId ]).ids, [ level.variableId, 'n' ]);
    assert.deepEqual(roundTrip(variableUpdateTrigger, [ 1, 1, 0, 7, -1, 1 ], []).ids, [ 'n' ]);
});

await test('VariableUpdate writes the selection mode at [5] and reads the origins and mode as optional', () => {
    assert.deepEqual(roundTrip(variableUpdateTrigger, [ 0, 1, 0, 0, -1, 1 ], [ level.variableId ]).ints, [ 0, 1, 0, 0, -1, 1 ]);
    // Four params (saved before origins existed): every origin, one variable.
    assert.deepEqual(roundTrip(variableUpdateTrigger, [ 0, 1, 0, 0 ], [ level.variableId ]).ints, [ 0, 1, 0, 0, -1, 0 ]);
    assert.equal(variableUpdateTrigger.forceFurniSelection({}), true);
});

await test('the unified input reads numbers and names as onInputTextChanged does', () => {
    assert.deepEqual({ ...readValueOrVariableText('0x10', -100, 100, variables) }, { option: 0, value: 16, valid: true, ambiguous: false });
    assert.deepEqual({ ...readValueOrVariableText('0b101', 0, 10, variables) }, { option: 0, value: 5, valid: true, ambiguous: false });
    assert.equal(readValueOrVariableText('500', 0, 100, variables).valid, false);
    assert.equal(readValueOrVariableText('-', 0, 100, variables).valid, false);
    assert.equal(readValueOrVariableText('LEVEL', 0, 100, variables).variable, level);
    assert.equal(readValueOrVariableText('nothing', 0, 100, variables).valid, false);
    assert.equal(readValueOrVariableText('level', 0, 100, [ level, variable('33', 'Level') ]).ambiguous, true);
});

await test('an invalid input refuses with Flash\'s two messages', () => {
    const typed = createValueOrVariableState(variables, '', FURNI, 1, 0);

    assert.equal(valueOrVariableValidationError(typed, false, false, variables).key, 'wiredfurni.params.variables.reference_value.invalid');
    assert.equal(valueOrVariableValidationError(typed, false, true, variables).key, 'wiredfurni.params.variables.reference_value.ambiguous');
    assert.equal(valueOrVariableValidationError(createValueOrVariableState(variables, level.variableId, FURNI, 1, 0), true, false, variables), null);
    assert.equal(valueOrVariableValidationError(createValueOrVariableState(variables, '', FURNI, 0, 4), true, false, variables), null);
});

await test('the precise delay converter shows steps of 0.05 s', () => {
    assert.equal(SLIDER_CONVERTER_PRECISE_DELAY.toText(776), '38.8');
    assert.equal(SLIDER_CONVERTER_PRECISE_DELAY.toText(1), '0.05');
    assert.equal(SLIDER_CONVERTER_PRECISE_DELAY.toText(40), '2');
    assert.equal(SLIDER_CONVERTER_PRECISE_DELAY.toIntParam('38.8'), 776);
});

await test('connected text: packed parts first, then the label, then the fallback', () => {
    const position = variable('1', '@position', { variableType: 1, textConnector: new Map() });
    const occupation = variable('2', '@occupation', { variableType: 1, textConnector: new Map() });
    const rgb = variable('3', '~recolorable_furni.color.rgb', { variableType: 3, textConnector: new Map() });
    const labelled = variable('4', 'mood', { textConnector: new Map([ [ 1, 'Happy' ] ]), textConnectorFallback: 'Unknown' });

    assert.equal(getPackedVariableText(position, (14 << 8) | 22), 'x: 14, y: 22');
    assert.equal(getPackedVariableText(occupation, 66819), 'x: 1, y: 5, r: 3');
    assert.equal(getPackedVariableText(rgb, 0xBCB7FF), '#BCB7FF');
    assert.equal(getPackedVariableText({ ...position, textConnector: undefined }, 3344), null);
    assert.equal(getConnectedText(labelled, 1), 'Happy');
    assert.equal(getConnectedText(labelled, 7), 'Unknown');
});

await test('WiredVariable reads requiresExecutionContext and the fallback behind its flag', () => {
    const { WiredVariableParser } = loadFile(new URL('incoming/Userdefinedroomevents/Data/WiredVariableParser.ts', packets), { '@nitrodevco/nitro-api': {} });
    const values = [ '7', 0, 'mood', 1, 0, true, true, true, true, true, false, true, true, true, true, 1, 1, 'Happy', true, 'Unknown' ];
    const wrapper = { readString: () => values.shift(), readInt: () => values.shift(), readBoolean: () => values.shift() };
    const parsed = WiredVariableParser(wrapper);

    assert.equal(parsed.requiresExecutionContext, true);
    assert.equal(parsed.textConnector.get(1), 'Happy');
    assert.equal(parsed.textConnectorFallback, 'Unknown');
    assert.equal(values.length, 0);
});

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import ts from 'typescript';

// Transpiled rather than imported as `.ts`: Node's type stripping rejects the packets' enums. Both
// import only types, so the module has no imports left once transpiled.
const load = async (path) => {
    const source = readFileSync(new URL(`../packages/nitro-packets/src/${path}.ts`, import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 } });

    return import(`data:text/javascript,${encodeURIComponent(outputText)}`);
};

const { TurboCommandTreeMessage } = await load('incoming/Turbo/TurboCommandTreeMessage');
const { TurboCommandSuggestComposer } = await load('outgoing/Turbo/TurboCommandSuggestComposer');

const parameterFields = (name, description) => [ name, 1, false, 0, false, 0, description, '1', '20', 1, 12, '3' ];

await test('v2 tree reads parameter metadata and syntax branch parameters', () => {
    const values = [
        1, 'group', 0, 'General', 'Manage groups', ':group', -1, true,
        0, // Root parameters
        1, 'add', ':group add <name>', 1,
        ...parameterFields('name', 'Group name'),
    ];
    const wrapper = Object.fromEntries([ 'readInt', 'readString', 'readBoolean' ].map(method => [ method, () => values.shift() ]));
    const { commands: [ command ] } = new TurboCommandTreeMessage().parse(wrapper);
    assert.equal(command.parameters.length, 0);
    assert.equal(command.syntax?.[0].path, 'add');
    assert.deepEqual(command.syntax?.[0].parameters[0], {
        name: 'name', kind: 1, optional: false, suggest: 0, selectors: false, members: [],
        description: 'Group name', minimum: '1', maximum: '20', minLength: 1, maxLength: 12, defaultValue: '3',
    });
    assert.equal(values.length, 0);
});

await test('suggest request appends branch path and preceding parsed arguments', () => {
    const packet = new TurboCommandSuggestComposer({ requestId: 7, command: 'group', parameter: 0, prefix: 'al', syntax: 'add', argumentText: 'owner' });
    assert.deepEqual(packet.compose(), [ 7, 'group', 0, 'al', 'add', 'owner' ]);
});

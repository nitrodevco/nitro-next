/**
 * The user chooser while the room's configuration items disable it (WIN63-202610191507):
 * `UserChooserWidgetHandler.isChooserDisabled` = the room value is on and the user has no rights;
 * the list is not built then (open or refresh), and rights holders still get it.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const source = readFileSync(new URL('../packages/nitro-react/src/commands/room/roomChooserCommands.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });

const setup = ({ disabled, controllerLevel, open = false }) => {
    const state = { controllerLevel, userChooserItems: open ? [] : undefined, usersByRoomObjectId: { 7: { objectId: 7, name: 'Bob', userType: 1 } } };
    state.setUserChooserItems = items => (state.userChooserItems = items);
    const room = {
        getRoomValue: key => (key === 'chooser_disabled' ? (disabled ? 1 : 0) : undefined),
        getRoomObjectsForCategory: () => [ { id: 7 } ],
    };
    const api = { RoomControllerLevelEnum: { None: 0, Guest: 1 }, RoomObjectCategoryEnum: { Unit: 100 }, RoomObjectVariableEnum: { ChooserDisabled: 'chooser_disabled' } };
    const modules = {
        '@nitrodevco/nitro-api': api,
        '#base/context/room': { getRoom: () => room, roomStore: { getState: () => state } },
        '#base/context/system': { systemStore: { getState: () => ({ localizations: {}, floorItems: {}, wallItems: {} }) } },
    };
    const exports = {};

    runInNewContext(outputText, { exports, require: name => modules[name] ?? {} });

    return { exports, state };
};

await test('a user without rights gets no list while the room disables the chooser', () => {
    const { exports, state } = setup({ disabled: true, controllerLevel: 0 });

    assert.equal(exports.isUserChooserDisabled(), true);
    exports.openUserChooser();
    assert.equal(state.userChooserItems, undefined);
});

await test('rights holders keep the chooser while it is disabled', () => {
    const { exports, state } = setup({ disabled: true, controllerLevel: 1 });

    assert.equal(exports.isUserChooserDisabled(), false);
    exports.openUserChooser();
    assert.deepEqual(Array.from(state.userChooserItems, item => item.name), [ 'Bob' ]);
});

await test('an open chooser is not rebuilt on refresh once disabled', () => {
    const { exports, state } = setup({ disabled: true, controllerLevel: 0, open: true });

    exports.refreshUserChooser();
    assert.deepEqual(state.userChooserItems, []);
});

await test('not disabled: everyone gets the list', () => {
    const { exports, state } = setup({ disabled: false, controllerLevel: 0 });

    exports.openUserChooser();
    assert.equal(state.userChooserItems.length, 1);
});

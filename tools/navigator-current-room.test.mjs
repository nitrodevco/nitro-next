/**
 * The navigator's current room as `NavigatorData` keeps it: `onRoomEnter` drops the entered room's
 * info until `GetGuestRoomResultMessage` names it, and `onRoomExit` drops the info and the owner
 * flag but keeps the room id - which the groups manager's `onGuildCreated` reads as `_roomId`.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const source = readFileSync(new URL('../packages/nitro-react/src/context/navigator/store/NavigatorCurrentRoomSlice.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
const exports = {};

runInNewContext(outputText, { exports, require: () => ({}) });

const createSlice = () => {
    let state;
    const set = partial => (state = { ...state, ...((typeof partial === 'function') ? partial(state) : partial) });

    state = exports.createNavigatorCurrentRoomSlice(set, () => state);

    return () => state;
};

const entered = roomId => ({ info: { roomId }, isOwner: true, isStaffPicked: false, canMute: false, allInRoomMuted: false });

await test('entering a room drops the previous room\'s info', () => {
    const get = createSlice();

    get().setCurrentRoom(1, true);
    get().setEnteredRoom(entered(1));
    get().setCurrentRoom(2, false);

    assert.equal(get().currentRoomId, 2);
    assert.equal(get().currentRoomOwner, false);
    assert.equal(get().enteredRoom, undefined);
});

await test('leaving drops the info and owner flag and keeps the room id', () => {
    const get = createSlice();

    get().setCurrentRoom(7, true);
    get().setEnteredRoom(entered(7));
    get().exitCurrentRoom();

    assert.equal(get().currentRoomId, 7);
    assert.equal(get().currentRoomOwner, false);
    assert.equal(get().enteredRoom, undefined);
});

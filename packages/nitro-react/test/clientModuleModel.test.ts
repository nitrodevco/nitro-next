import assert from 'node:assert/strict';
import { test } from 'node:test';

import { clientModuleChatCommandEntry, diffRoomUsers, hasClientModulePermission, keepPart, matchClientModuleChatCommand, toClientModuleAvatar } from '../src/context/client-modules/clientModuleModel';
import { completeChatCommand, mergeChatCommands } from '../src/utils/chatCommandCompletion';

// `api.state.use(x => x.user)` is a zustand selector: a part rebuilt as a new object on every store
// change would draw the module's component again for nothing (and a selector of a fresh object loops).
void test('a state part keeps its identity until one of its fields changes', () => {
    const user = keepPart(undefined, { id: 1, name: 'a' });

    assert.equal(keepPart(user, { id: 1, name: 'a' }), user);
    assert.notEqual(keepPart(user, { id: 1, name: 'b' }), user);
    assert.ok(Object.isFrozen(user));
});

// The rule the client's own gates use (`passesClientGate`): a server's nodes decide, else the level.
void test('a permission is the node when the server sent nodes, else the named security level', () => {
    const nodes = new Set([ 'hello.wave' ]);

    assert.equal(hasClientModulePermission({ securityLevel: 7, permissionNodes: nodes }, 'room.kick', 1), false);
    assert.equal(hasClientModulePermission({ securityLevel: 0, permissionNodes: nodes }, 'hello.wave'), true);
    assert.equal(hasClientModulePermission({ securityLevel: 5, permissionNodes: null }, 'room.kick', 5), true);
    assert.equal(hasClientModulePermission({ securityLevel: 5, permissionNodes: null }, 'room.kick'), false);
});

// `room.avatar.added` / `removed` are this diff of the room's user list between two store updates.
void test('the room user list diff names who came and who went', () => {
    const a = { objectId: 1, webID: 10, userType: 1, name: 'a', figure: '' };
    const b = { objectId: 2, webID: 11, userType: 2, name: 'b', figure: '' };
    const c = { objectId: 3, webID: 12, userType: 1, name: 'c', figure: '' };
    const { added, removed } = diffRoomUsers({ 1: a, 2: b }, { 2: b, 3: c });

    assert.deepEqual(added, [ c ]);
    assert.deepEqual(removed, [ a ]);
    assert.deepEqual(toClientModuleAvatar(b, 11), { roomIndex: 2, userId: 11, kind: 'pet', name: 'b', figure: '', isOwnUser: false });
    assert.equal(toClientModuleAvatar(a, 10).isOwnUser, true);
});

void test('a chat line runs the module command its first word names, by name or alias in any case', () => {
    const hug = { name: 'hug', aliases: [ 'cuddle' ] };
    const commands = [ { name: 'wave' }, hug ];

    assert.deepEqual(matchClientModuleChatCommand(commands, ':CUDDLE  bob   now'), { command: hug, args: [ 'bob', 'now' ] });
    assert.equal(matchClientModuleChatCommand(commands, 'hug bob'), undefined);
    assert.equal(matchClientModuleChatCommand(commands, ':hugs'), undefined);
});

// The entry's parameter kinds are the wire numbers the completion reads: a `user` parameter is offered the room's users.
void test('a module command is offered by the chat completion with its usage, and its user parameter from the room', () => {
    const entry = clientModuleChatCommandEntry('hello', { name: 'hug', description: 'Hug someone', parameters: [ { name: 'who', type: 'user' } ], run: () => undefined });
    const commands = mergeChatCommands([], [ entry ]);

    assert.equal(entry.usage, ':hug <who>');

    const byName = completeChatCommand({ text: ':hu', commands, controllerLevel: 0, roomUserNames: [], serverValues: null });

    assert.ok(byName.suggestions.some(row => row.label.startsWith(':hug') && (row.detail === 'Hug someone')), JSON.stringify(byName.suggestions));

    const byUser = completeChatCommand({ text: ':hug bo', commands, controllerLevel: 0, roomUserNames: [ 'bob', 'alice' ], serverValues: null });

    assert.deepEqual(byUser.suggestions.map(row => row.label), [ 'bob' ]);
});

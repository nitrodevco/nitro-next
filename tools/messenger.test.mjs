/** `MainView.shouldCombineWithPreviousEntry` / `addToConversationAndCombine`, as the messenger groups a conversation into bubbles. */
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

const OWN = 1;
const OTHER = 2;
const NOTIFICATION = 3;
const MINUTE = 60000;
const { groupMessengerEntries, shouldCombineMessengerEntries } = load('nitro-react/src/context/messenger/store/messengerEntries', {
    './MessengerStore': { MESSENGER_COMBINE_THRESHOLD_MS: 10 * MINUTE, MESSENGER_ENTRY_OWN: OWN, MESSENGER_ENTRY_OTHER: OTHER },
});

const entry = (type, sentAt, senderId = 3, messageId = '') => ({ type, chatId: 3, message: { text: 'x', habbiconId: 0 }, sentAt, senderId, senderName: '', senderFigure: '', messageId, awaitConfirmationId: 0 });

await test('a friend chat combines same-side messages within ten minutes, never notices', () => {
    assert.equal(shouldCombineMessengerEntries(3, entry(OTHER, 5 * MINUTE), entry(OTHER, 0)), true);
    assert.equal(shouldCombineMessengerEntries(3, entry(OTHER, 11 * MINUTE), entry(OTHER, 0)), false);
    assert.equal(shouldCombineMessengerEntries(3, entry(OWN, MINUTE), entry(OTHER, 0)), false);
    assert.equal(shouldCombineMessengerEntries(3, entry(NOTIFICATION, MINUTE), entry(NOTIFICATION, 0)), false);
    assert.equal(shouldCombineMessengerEntries(3, entry(OTHER, 0), undefined), false);
});

await test('a group chat only combines another member\'s messages from the same sender', () => {
    assert.equal(shouldCombineMessengerEntries(-7, entry(OTHER, MINUTE, 4), entry(OTHER, 0, 4)), true);
    assert.equal(shouldCombineMessengerEntries(-7, entry(OTHER, MINUTE, 5), entry(OTHER, 0, 4)), false);
    assert.equal(shouldCombineMessengerEntries(-7, entry(OWN, MINUTE, 1), entry(OWN, 0, 1)), true);
});

await test('grouping yields one item per bubble run and per notice, in order', () => {
    const items = groupMessengerEntries(3, [
        entry(NOTIFICATION, 0),
        entry(OTHER, 0, 3, 'a'),
        entry(OTHER, MINUTE, 3, 'b'),
        entry(OWN, 2 * MINUTE, 1, 'c'),
        entry(OTHER, 3 * MINUTE, 3, 'd'),
    ]);

    assert.deepEqual([ ...items ].map(item => [ ...item.entries ].map(e => e.messageId || `type${e.type}`)), [ [ 'type3' ], [ 'a', 'b' ], [ 'c' ], [ 'd' ] ]);
});

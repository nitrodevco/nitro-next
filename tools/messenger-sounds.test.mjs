/**
 * `HabboMessenger`'s sounds: `HBST_message_received` for a message or a room invite that arrives
 * while the messenger window is closed, `HBST_message_sent` for the first message sent into a
 * conversation that holds nothing but notices. Runs the real messenger commands over a plain store.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const load = (path, dependencies = {}) => {
    const source = readFileSync(new URL(`../packages/${path}.ts`, import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};

    runInNewContext(outputText, { exports, performance: { now: () => 0 }, Object, Array, Number, String, require: (name) => {
        assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);

        return dependencies[name];
    } });

    return exports;
};

const RECEIVED = 'HBST_message_received';
const SENT = 'HBST_message_sent';
const FRIEND = 5;

const messenger = () => {
    const sounds = [];
    const sent = [];
    const state = {
        conversations: [], entries: {}, historyFetches: {}, seenMessageIds: {}, selectedChatId: -1, moderationInfoShown: false, confirmationId: 0,
        setConversations: (value) => { state.conversations = value; },
        setEntries: (chatId, list) => { state.entries = { ...state.entries, [chatId]: list }; },
        setHistoryFetch: (chatId, at) => { state.historyFetches = { ...state.historyFetches, [chatId]: at }; },
        markMessageSeen: (id) => { state.seenMessageIds = { ...state.seenMessageIds, [id]: true }; },
        setSelectedChatId: (value) => { state.selectedChatId = value; },
        setModerationInfoShown: () => { state.moderationInfoShown = true; },
        takeConfirmationId: () => ++state.confirmationId,
    };
    const windows = {
        visibleWindows: {},
        showWindow: (name) => {
            windows.visibleWindows = { ...windows.visibleWindows, [name]: true };
        },
        hideWindow: (name) => {
            windows.visibleWindows = { ...windows.visibleWindows, [name]: false };
        },
        getLocalizationValue: key => key,
    };
    const user = { userId: 1, name: 'me', figure: 'hd-1', friends: { [FRIEND]: { playerId: FRIEND, name: 'Friend', figure: 'hd-2', gender: 0, isOnline: true, persistedUser: false, pocketHabboUser: false } } };
    const commands = load('nitro-react/src/commands/user/messengerCommands', {
        '@nitrodevco/nitro-api': { AvatarGenderType: { Male: 0 } },
        '@nitrodevco/nitro-packets': {
            EventLogComposer: class {}, FollowFriendComposer: class {}, GetExtendedProfileComposer: class {}, GetHabboGroupDetailsComposer: class {},
            GetMessengerHistoryComposer: class { constructor(data) { this.data = data; } },
            SendHabbiconComposer: class { constructor(data) { this.data = data; } },
            SendMsgComposer: class { constructor(data) { this.data = data; } },
        },
        '#base/context/communication': {},
        '#base/context/messenger': {
            MESSENGER_ENTRY_OWN: 1, MESSENGER_ENTRY_OTHER: 2, MESSENGER_ENTRY_NOTIFICATION: 3, MESSENGER_ENTRY_INFO: 4, MESSENGER_ENTRY_INVITATION: 5,
            MESSENGER_NO_CONVERSATION: -1, MESSENGER_ERROR_MESSAGES: {}, MESSENGER_HISTORY_REFETCH_MS: 60000,
            messengerStore: { getState: () => state },
        },
        '#base/context/system': { systemStore: { getState: () => windows } },
        '#base/context/user': { userStore: { getState: () => user } },
        '#base/sound': {
            GetSoundManager: () => ({ playSound: id => sounds.push(id) }),
            HabboSoundTypesEnum: { SOUND_MESSAGE_RECEIVED: RECEIVED, SOUND_MESSAGE_SENT: SENT },
        },
        '../habbicons/habbiconCommands': { noteHabbiconUsed: () => {} },
    });
    const incoming = (extra = {}) => ({ chatId: FRIEND, message: 'hello', habbiconId: 0, secondsSinceSent: 0, messageId: `m${Math.random()}`, confirmationId: 0, senderId: FRIEND, senderName: 'Friend', senderFigure: 'hd-2', ...extra });

    return { commands, sounds, sent, state, windows, send: message => sent.push(message), incoming };
};

await test('a message that arrives while the messenger is closed is heard', () => {
    const m = messenger();

    m.commands.addMessengerConsoleMessage(m.send, m.incoming());

    assert.deepEqual(m.sounds, [ RECEIVED ]);
});

await test('a message that arrives while the messenger is open is not', () => {
    const m = messenger();

    m.commands.openMessengerConversation(m.send, FRIEND);
    assert.equal(m.commands.isMessengerOpen(), true);

    m.commands.addMessengerConsoleMessage(m.send, m.incoming());

    assert.deepEqual(m.sounds, []);
});

await test('every message heard while closed makes the sound, and closing the window brings it back', () => {
    const m = messenger();

    m.commands.addMessengerConsoleMessage(m.send, m.incoming());
    m.commands.addMessengerConsoleMessage(m.send, m.incoming());
    m.commands.openMessengerConversation(m.send, FRIEND);
    m.commands.addMessengerConsoleMessage(m.send, m.incoming());
    m.commands.hideMessenger();
    m.commands.addMessengerConsoleMessage(m.send, m.incoming());

    assert.deepEqual(m.sounds, [ RECEIVED, RECEIVED, RECEIVED ]);
});

await test('a room invite is heard while the messenger is closed, and not while it is open', () => {
    const closed = messenger();

    closed.commands.addMessengerRoomInvite(closed.send, FRIEND, 'come in');
    assert.deepEqual(closed.sounds, [ RECEIVED ]);

    const open = messenger();

    open.commands.openMessengerConversation(open.send, FRIEND);
    open.commands.addMessengerRoomInvite(open.send, FRIEND, 'come in');
    assert.deepEqual(open.sounds, []);
});

await test('the first message sent into a conversation makes the sent sound, the next ones do not', () => {
    const m = messenger();

    m.commands.openMessengerConversation(m.send, FRIEND);
    // The conversation holds only the moderation notice every conversation starts with.
    assert.equal(m.state.entries[FRIEND].length, 1);

    m.commands.sendMessengerMessage(m.send, 'hi');
    assert.deepEqual(m.sounds, [ SENT ]);

    m.commands.sendMessengerMessage(m.send, 'hi again');
    m.commands.sendMessengerMessage(m.send, 'and again');
    assert.deepEqual(m.sounds, [ SENT ], 'only the first');
});

await test('a conversation that already has a message from the friend does not make the sent sound', () => {
    const m = messenger();

    m.commands.addMessengerConsoleMessage(m.send, m.incoming());
    m.sounds.length = 0;
    m.commands.openMessengerConversation(m.send, FRIEND);

    m.commands.sendMessengerMessage(m.send, 'reply');

    assert.deepEqual(m.sounds, []);
});

await test('an empty conversation makes the sent sound too', () => {
    const m = messenger();

    m.commands.openMessengerConversation(m.send, FRIEND);
    m.state.entries = { ...m.state.entries, [FRIEND]: [] };

    m.commands.sendMessengerMessage(m.send, 'hi');

    assert.deepEqual(m.sounds, [ SENT ]);
});

await test('nothing is sent, and nothing heard, when there is no conversation or no text', () => {
    const m = messenger();

    m.commands.sendMessengerMessage(m.send, 'hi');
    m.commands.openMessengerConversation(m.send, FRIEND);
    m.commands.sendMessengerMessage(m.send, '');

    assert.deepEqual(m.sounds, []);
});

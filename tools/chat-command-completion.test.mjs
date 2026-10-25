/**
 * The chat input's command completion (`nitro-react/src/utils/chatCommandCompletion.ts`) against
 * Turbo's `chat.commands` tree and the gift window's suggestion rules it borrows
 * (`PurchaseConfirmationDialog.onNameInputChange` / `updateSuggestions`: ten at most, the typed
 * part in bold).
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

const { completeChatCommand, chatCommandSuggestKey, findInvalidArguments, mergeChatCommands, MAX_CHAT_COMMAND_SUGGESTIONS } = await import('../packages/nitro-react/src/utils/chatCommandCompletion.ts');

const WORD = 0;
const INTEGER = 1;
const BOOLEAN = 3;
const ENUMERATION = 4;
const ROOM_PLAYER = 5;
const PLAYER = 6;
const DURATION = 7;
const REST = 8;
const NONE = 0;
const CLIENT = 1;
const SERVER = 2;

const parameter = (name, kind, suggest, extra = {}) => ({ name, kind, optional: false, suggest, selectors: false, members: [], ...extra });

const command = (name, parameters, extra = {}) => ({
    name,
    aliases: [],
    category: 'General',
    description: '',
    usage: [ `:${name}`, ...parameters.map(x => (x.optional ? `[${x.name}]` : `<${x.name}>`)) ].join(' '),
    roomLevel: -1,
    operator: true,
    parameters,
    ...extra,
});

const BAN = command('ban', [ parameter('who', PLAYER, SERVER), parameter('duration', DURATION, CLIENT), parameter('reason', REST, NONE, { optional: true }) ]);
const BOOT = command('boot', [ parameter('target', ROOM_PLAYER, CLIENT), parameter('count', INTEGER, NONE), parameter('size', ENUMERATION, CLIENT, { members: [ 'small', 'large' ] }), parameter('loud', BOOLEAN, CLIENT, { optional: true }) ], { roomLevel: 1, operator: false, aliases: [ 'eject' ] });
const GIVE = command('give', [ parameter('who', PLAYER, SERVER, { selectors: true }), parameter('currency', WORD, SERVER), parameter('amount', INTEGER, NONE) ]);
const COMMANDS = command('commands', []);
const TREE = [ BAN, BOOT, COMMANDS, GIVE ];

const complete = (text, extra = {}) => completeChatCommand({ text, commands: TREE, controllerLevel: 1, roomUserNames: [ 'Alice', 'Bob' ], serverValues: null, ...extra });
const labels = completion => completion.suggestions.map(x => x.label);

await test('a line that is not a command offers nothing', () => {
    assert.deepEqual(complete('hello').suggestions, []);
    assert.deepEqual(complete(':').suggestions, []);
});

await test('the name offers every command it may be the start of, as its usage, the typed part bold', () => {
    const completion = complete(':b');

    assert.deepEqual(labels(completion), [ ':ban <who> <duration> [reason]', ':boot <target> <count> <size> [loud]' ]);
    assert.deepEqual([ completion.suggestions[0].boldStart, completion.suggestions[0].boldEnd ], [ 0, 2 ]);
    assert.equal(completion.suggestions[0].replacement, ':ban ');
    assert.equal(complete(':comm').suggestions[0].replacement, ':commands');
});

await test('an alias completes to itself', () => {
    const completion = complete(':ej');

    assert.deepEqual(labels(completion), [ ':eject <target> <count> <size> [loud]' ]);
    assert.equal(completion.suggestions[0].replacement, ':eject ');
});

await test('a command whose room level the user lacks is not offered there', () => {
    assert.deepEqual(labels(complete(':bo', { controllerLevel: 0 })), []);
});

await test('a name typed out in full with nothing longer offers nothing more', () => {
    assert.deepEqual(complete(':commands').suggestions, []);
});

await test('at most ten', () => {
    const many = Array.from({ length: 15 }, (_, i) => command(`cmd${i}`, []));

    assert.equal(completeChatCommand({ text: ':cmd', commands: many, controllerLevel: 0, roomUserNames: [], serverValues: null }).suggestions.length, MAX_CHAT_COMMAND_SUGGESTIONS);
});

await test('what the client knows is offered at once: members, durations, the room', () => {
    assert.deepEqual(labels(complete(':boot ')), [ 'Alice', 'Bob' ]);
    assert.deepEqual(labels(complete(':boot al')), [ 'Alice' ]);
    assert.equal(complete(':boot al').suggestions[0].replacement, ':boot Alice ');
    assert.deepEqual(labels(complete(':boot alice 3 l')), [ 'large', 'small' ], 'starting with it first, then containing it');
    assert.deepEqual(labels(complete(':ban alice ')), [ '30m', '1h', '1d', '7d', 'perm' ]);
    assert.equal(complete(':boot alice 3 small t').suggestions[0].replacement, ':boot alice 3 small true', 'the last parameter takes no trailing space');
});

await test('a player is asked of the server once two letters are typed', () => {
    assert.equal(complete(':ban a').request, null);
    assert.deepEqual(complete(':ban al').request, { command: 'ban', parameter: 0, prefix: 'al', syntax: '', argumentText: '' });
});

await test('the server answer is shown, narrowed to what is typed since', () => {
    const serverValues = { key: chatCommandSuggestKey('ban', 0, 'al'), values: [ 'Albert', 'Alfred', 'Alice' ] };

    assert.deepEqual(labels(complete(':ban alf', { serverValues })), [ 'Alfred' ]);
    assert.deepEqual(labels(complete(':ban al', { serverValues })), [ 'Albert', 'Alfred', 'Alice' ]);
    // An answer about another parameter is not this one's.
    assert.deepEqual(labels(complete(':give al', { serverValues })), [ ':give <who> <currency> <amount>' ]);
});

await test('a named source is asked of the server whatever is typed', () => {
    assert.deepEqual(complete(':give alice ').request, { command: 'give', parameter: 1, prefix: '', syntax: '', argumentText: 'alice' });
});

await test('selectors are offered only where the tree allows them', () => {
    assert.deepEqual(labels(complete(':give @')), [ '@online', '@room' ]);
    assert.equal(complete(':give @').request, null);
    assert.deepEqual(labels(complete(':ban @')), [ ':ban <who> <duration> [reason]' ]);
});

await test('with nothing to offer, the usage line says what comes next, the parameter bold and not to be taken', () => {
    const hint = complete(':boot alice ').suggestions[0];

    assert.equal(hint.label, ':boot <target> <count> <size> [loud]');
    assert.equal(hint.label.slice(hint.boldStart, hint.boldEnd), '<count>');
    assert.equal(hint.replacement, null);
});

await test('the usage hint says what the parameter being typed is, as the server describes it', () => {
    const GIFT = command('gift', [ parameter('who', PLAYER, SERVER), parameter('furni', WORD, SERVER), parameter('note', WORD, NONE, { description: 'The note on the tag, in double quotes: "Enjoy!"' }), parameter('badge', WORD, NONE, { optional: true }), parameter('trusted', BOOLEAN, CLIENT, { optional: true }) ]);
    const hint = complete(':gift alice throne ', { commands: [ GIFT ] }).suggestions[0];

    assert.equal(hint.label, ':gift <who> <furni> <note> [badge] [trusted]');
    assert.equal(hint.label.slice(hint.boldStart, hint.boldEnd), '<note>');
    assert.equal(hint.detail, 'The note on the tag, in double quotes: "Enjoy!"');
    assert.equal(complete(':boot alice ').suggestions[0].detail, '', 'a parameter the server did not describe adds nothing');
});

await test('the rest of the line, and past the last parameter, offer nothing', () => {
    assert.deepEqual(complete(':ban alice 7d spamming the lobby').suggestions, []);
    assert.deepEqual(complete(':commands extra').suggestions, []);
    assert.deepEqual(complete(':nosuch thing').suggestions, []);
});

await test('a name matches anywhere in it, as the gift list does, those starting with it first, the match bold', () => {
    const completion = complete(':ve');

    assert.deepEqual(labels(completion), [ ':give <who> <currency> <amount>' ]);
    assert.equal(completion.suggestions[0].label.slice(completion.suggestions[0].boldStart, completion.suggestions[0].boldEnd), 've');

    const tree = [ command('alert', []), command('hotelalert', []), command('roomalert', []) ];

    assert.deepEqual(labels(completeChatCommand({ text: ':al', commands: tree, controllerLevel: 0, roomUserNames: [], serverValues: null })), [ ':alert', ':hotelalert', ':roomalert' ]);
    assert.deepEqual(labels(completeChatCommand({ text: ':ale', commands: tree, controllerLevel: 0, roomUserNames: [], serverValues: null })), [ ':alert', ':hotelalert', ':roomalert' ]);
});

await test('a command row carries what the command does', () => {
    const tree = [ command('give', [], { description: 'Add to a balance' }) ];

    assert.equal(completeChatCommand({ text: ':gi', commands: tree, controllerLevel: 0, roomUserNames: [], serverValues: null }).suggestions[0].detail, 'Add to a balance');
    assert.equal(complete(':boot ').suggestions[0].detail, '', 'a value has none');
});

await test('runs of spaces separate words once, as the binder splits them', () => {
    assert.deepEqual(labels(complete(':boot   al')), [ 'Alice' ]);
    assert.deepEqual(labels(complete(':boot  alice   3  la')), [ 'large' ]);
});

await test('arguments the server would refuse are found; a word still being typed only has to start right', () => {
    const invalid = text => findInvalidArguments({ text, commands: TREE, controllerLevel: 1, roomUserNames: [ 'Alice', 'Bob' ] }).map(x => text.slice(x.start, x.end));

    assert.deepEqual(invalid(':boot alice 3 small'), []);
    assert.deepEqual(invalid(':boot carol 3x medium '), [ 'carol', '3x', 'medium' ]);
    assert.deepEqual(invalid(':boot al'), [], 'the start of a name in the room');
    assert.deepEqual(invalid(':boot zz'), [ 'zz' ]);
    assert.deepEqual(invalid(':ban anyone 7'), [], 'a number is the start of a duration');
    assert.deepEqual(invalid(':ban anyone 7 '), [ '7' ], 'but not one');
    assert.deepEqual(invalid(':ban anyone 7x'), [ '7x' ]);
    assert.deepEqual(invalid(':ban anyone perm because of spam'), [], 'the rest of the line is free');
    assert.deepEqual(invalid(':boot alice 3 small yes too many words'), [ 'too many words' ]);
    assert.deepEqual(invalid(':commands extra'), [ 'extra' ]);
    assert.deepEqual(invalid(':nosuch thing'), [], 'an unknown command is chat');
    assert.deepEqual(invalid('just talking 7x'), []);
});

await test('the client commands win a name the server also uses, and the rest are kept', () => {
    const whisper = command('whisper', [ parameter('who', ROOM_PLAYER, CLIENT), parameter('message', REST, NONE) ], { operator: false });
    const serverWhisper = command('whisper', []);
    const merged = mergeChatCommands([ whisper ], [ serverWhisper, BAN ]);

    assert.deepEqual(merged.map(x => x.name), [ 'ban', 'whisper' ]);
    assert.equal(merged[1], whisper);
});

await test('cursor completion replaces only the active token and preserves later text', () => {
    const text = ':boot al 3 small';
    const completion = complete(text, { cursor: 8 });
    assert.equal(completion.suggestions[0].replacement, ':boot Alice 3 small');

    const inside = ':boot Al|ice 3 small'.replace('|', '');
    assert.equal(complete(inside, { cursor: 8 }).suggestions[0].replacement, ':boot Alice 3 small');
    assert.equal(complete(inside, { cursor: 8 }).suggestions[0].replacementCursor, 11);
    const midTokenWithRemainder = ':boot AliceXYZ 3 small';
    const midTokenResult = complete(midTokenWithRemainder, { cursor: midTokenWithRemainder.indexOf('XYZ') });
    assert.equal(midTokenResult.suggestions[0].replacement, ':boot Alice 3 small');
    const atNextToken = ':boot alice 3 |small'.replace('|', '');
    assert.equal(complete(atNextToken, { cursor: atNextToken.indexOf('small') }).suggestions[0].replacement, ':boot alice 3 small ');
});

await test('command completion replaces its whole name and keeps suffix arguments', () => {
    const text = ':bo|ot alice 3'.replace('|', '');
    assert.equal(complete(text, { cursor: 3 }).suggestions[0].replacement, ':boot alice 3');
    assert.equal(complete(text, { cursor: 3 }).suggestions[0].replacementCursor, 6);
    assert.equal(complete(':group ', { commands: [ command('group', [], { syntax: [ { path: 'add', usage: ':group add <name>', parameters: [ parameter('name', WORD, NONE) ] } ] }) ] }).suggestions[0].replacement, ':group add ');
});

await test('quoted arguments and escaped quotes stay one argument', () => {
    const text = String.raw`:ban "Al\"ice" 7d`;
    assert.deepEqual(findInvalidArguments({ text, commands: TREE, controllerLevel: 1, roomUserNames: [] }), []);
});

await test('server suggestion context preserves the raw quoted prior arguments', () => {
    const suggestion = complete(':give "Alice Smith" go').request;
    assert.deepEqual(suggestion, { command: 'give', parameter: 1, prefix: 'go', syntax: '', argumentText: '"Alice Smith"' });
});

await test('server suggestions with spaces and escapes are encoded as one reader token', () => {
    const expected = [ '"Alice Smith" ', '"Al\\"ice" ', '"Al\\\\ice" ' ];
    for (const [ index, value ] of [ 'Alice Smith', 'Al"ice', 'Al\\ice' ].entries()) {
        const serverValues = { key: chatCommandSuggestKey('ban', 0, 'al'), values: [ value ] };
        assert.equal(complete(':ban al', { serverValues }).suggestions[0].replacement.slice(':ban '.length), expected[index]);
    }
});

await test('only the current token tolerates an unfinished quote; quote placement and escapes follow the reader', () => {
    const valueCommand = command('value', [ parameter('text', WORD, NONE), parameter('next', ENUMERATION, CLIENT, { members: [ 'yes' ] }) ]);
    const completeValue = (text, extra = {}) => completeChatCommand({ text, commands: [ valueCommand ], controllerLevel: 0, roomUserNames: [], serverValues: null, ...extra });
    assert.deepEqual(labels(completeValue(':value "unfinished')), [ ':value <text> <next>' ]);
    assert.deepEqual(completeValue(':value "closed"tail y').suggestions, []);
    assert.deepEqual(completeValue(':value pre"fix" y').suggestions, []);
    assert.deepEqual(completeValue(':value "bad\\q" y').suggestions, []);
    assert.deepEqual(completeValue(':value "unfinished y', { cursor: 6 }).suggestions, []);
});

await test('numeric limits, string lengths, and bounded durations are enforced', () => {
    const bounded = command('set', [ parameter('amount', INTEGER, NONE, { minimum: '1', maximum: '2147483647' }), parameter('word', WORD, NONE, { minLength: 2, maxLength: 4 }), parameter('duration', DURATION, NONE) ]);
    const invalid = text => findInvalidArguments({ text, commands: [ bounded ], controllerLevel: 0, roomUserNames: [] }).map(x => text.slice(x.start, x.end));
    assert.deepEqual(invalid(':set +2147483648 ab 3651d '), [ '+2147483648', '3651d' ]);
    assert.deepEqual(invalid(':set +1 a 0d '), [ 'a', '0d' ]);
    assert.deepEqual(invalid(':set alphabetic'), [ 'alphabetic' ], 'a malformed number is invalid while typing');
    assert.deepEqual(invalid(':set +1 abc 3650d '), []);
    const enumCommand = command('pick', [ parameter('choice', ENUMERATION, CLIENT, { members: [ 'yes' ] }) ]);
    const quoted = ':pick "no thanks"';
    assert.deepEqual(findInvalidArguments({ text: quoted, commands: [ enumCommand ], controllerLevel: 0, roomUserNames: [] }).map(x => quoted.slice(x.start, x.end)), [ '"no thanks"' ]);
    assert.deepEqual(findInvalidArguments({ text: ':ban anyone perm "unterminated', commands: TREE, controllerLevel: 1, roomUserNames: [] }), [], 'RestOfLine remains raw after its binder point');
});

await test('syntax branches complete literals and then bind branch parameters', () => {
    const branch = command('group', [], { syntax: [ { path: 'add', usage: ':group add <name>', parameters: [ parameter('name', ROOM_PLAYER, CLIENT) ] } ] });
    const completeBranch = text => completeChatCommand({ text, commands: [ branch ], controllerLevel: 0, roomUserNames: [], serverValues: null });
    assert.equal(completeBranch(':group a').suggestions[0].replacement, ':group add ');
    assert.deepEqual(completeBranch(':group add').suggestions.map(x => x.label), [ ':group add <name>' ]);
    assert.equal(completeBranch(':group add').suggestions[0].replacement, null);
    const roomValue = completeChatCommand({ text: ':group add', commands: [ branch ], controllerLevel: 0, roomUserNames: [ 'Alice' ], serverValues: null });
    assert.equal(roomValue.suggestions[0].replacement, ':group add Alice');
    const branchBeforeSpace = ':group add Alice';
    const branchValue = completeChatCommand({ text: branchBeforeSpace, cursor: branchBeforeSpace.indexOf('add') + 3, commands: [ branch ], controllerLevel: 0, roomUserNames: [ 'Alice' ], serverValues: null });
    assert.equal(branchValue.suggestions[0].replacement, ':group add Alice Alice');

    const nested = command('group', [], { syntax: [
        { path: 'add item', usage: ':group add item <name>', parameters: [ parameter('name', WORD, NONE) ] },
        { path: 'add member', usage: ':group add member <name>', parameters: [ parameter('name', WORD, NONE) ] },
        { path: 'remove', usage: ':group remove <name>', parameters: [ parameter('name', WORD, NONE) ] },
    ] });
    const completeNested = text => completeChatCommand({ text, commands: [ nested ], controllerLevel: 0, roomUserNames: [], serverValues: null });
    assert.deepEqual(completeNested(':group ').suggestions.map(x => x.label), [ 'add', 'remove' ]);
    assert.deepEqual(completeNested(':group add').suggestions.map(x => x.label), [ 'item', 'member' ]);
    assert.equal(completeNested(':group add').suggestions[0].replacement, ':group add item ');
    assert.deepEqual(completeNested(':group add m').suggestions.map(x => x.label), [ 'member' ]);
});

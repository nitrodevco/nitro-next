import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

// The WIN63-202610121624 message editor (`MessageEditor*Preset`, `TextAreaPreset.insertText` /
// `wrapSelection`) and the boxes that use it: Show Message (400 characters) and the bot talk
// boxes (400 characters, int param 2 = hide bot name).

const cache = new Map();

const loadFile = (url) => {
    if (cache.has(url.href)) return cache.get(url.href);

    const source = readFileSync(url, 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};

    cache.set(url.href, exports);

    runInNewContext(outputText, { exports, require: (name) => {
        assert.ok(name.startsWith('.'), `Unexpected dependency: ${name}`);

        const file = new URL(`${name}.ts`, url);

        return loadFile(existsSync(file) ? file : new URL(`${name}/index.ts`, url));
    } });

    return exports;
};

const wired = new URL('../packages/nitro-react/src/wired/', import.meta.url);
const editor = loadFile(new URL('common/messageEditor.ts', wired));
const { chatAction, CHAT_MESSAGE_MAX_LENGTH } = loadFile(new URL('elements/action/Chat.ts', wired));
const { botTalkAction, BOT_MESSAGE_MAX_LENGTH } = loadFile(new URL('elements/action/BotTalk.ts', wired));
const { botTalkDirectToAvatarAction } = loadFile(new URL('elements/action/BotTalkDirectToAvatar.ts', wired));

const plain = value => JSON.parse(JSON.stringify(value ?? null));

const triggerable = (stringParam, intParams, textPlaceholders) => ({ stringParam, intParams, wiredContext: { textPlaceholders } });

await test('B wraps the selection, and a second B unwraps it', () => {
    const wrapped = editor.applyMessageEditorTag('hello world', 6, 11, 'b', 400);

    assert.deepEqual(plain(wrapped), { text: 'hello [b]world[/b]', selectionStart: 9, selectionEnd: 14 });
    assert.deepEqual(plain(editor.applyMessageEditorTag(wrapped.text, 9, 14, 'b', 400)), { text: 'hello world', selectionStart: 6, selectionEnd: 11 });
});

await test('a tag that would pass the limit changes nothing; Align and placeholders insert at the caret', () => {
    assert.equal(editor.applyMessageEditorTag('x'.repeat(395), 0, 0, 'b', 400), null);
    assert.deepEqual(plain(editor.insertMessageEditorText('ab', 1, 1, editor.MESSAGE_EDITOR_ALIGN_MARKER, 400)), { text: 'a[a]b', selectionStart: 4, selectionEnd: 4 });
    assert.deepEqual(plain(editor.insertMessageEditorText('hi you', 3, 6, editor.messageEditorPlaceholderToken('trigger_text'), 400)), { text: 'hi $(trigger_text)', selectionStart: 18, selectionEnd: 18 });
    assert.equal(editor.insertMessageEditorText('x'.repeat(399), 0, 0, '[a]', 400), null);
});

await test('the palette has the eight colours, red first', () => {
    assert.deepEqual(plain(editor.MESSAGE_EDITOR_COLOR_OPTIONS.map(option => option.tag)), [ 'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'pink' ]);
    assert.equal(editor.MESSAGE_EDITOR_DEFAULT_COLOR, editor.MESSAGE_EDITOR_COLOR_OPTIONS[0].color);
});

await test('the preview scales a wide bubble down and grows the area for a tall one', () => {
    assert.deepEqual(plain(editor.messageEditorPreviewFit(200, 40, 672, 69)), { scale: 1, areaHeight: 69, bottomPadding: 0 });
    assert.deepEqual(plain(editor.messageEditorPreviewFit(1344, 100, 672, 69)), { scale: 0.5, areaHeight: 69, bottomPadding: 0 });
    assert.deepEqual(plain(editor.messageEditorPreviewFit(300, 120, 672, 69)), { scale: 1, areaHeight: 120, bottomPadding: 5 });
});

await test('Show Message and the bot boxes take 400 characters and list the context placeholders', () => {
    assert.equal(CHAT_MESSAGE_MAX_LENGTH, 400);
    assert.equal(BOT_MESSAGE_MAX_LENGTH, 400);

    const form = chatAction.createForm(triggerable('hi', [ 0, 202, -1 ], { placeholderNames: [ 'trigger_text' ], capturerNames: [] }));

    assert.deepEqual(plain(form.placeholderNames), [ 'trigger_text' ]);
    assert.deepEqual(plain(chatAction.readIntParams(form)), [ 0, 202, -1 ]);
});

await test('the bot boxes read and write hide bot name as int param 2', () => {
    for (const action of [ botTalkAction, botTalkDirectToAvatarAction ]) {
        const form = action.createForm(triggerable('Frank\thello', [ 1, 2, 1 ], undefined));

        assert.equal(form.hideBotName, true);
        assert.deepEqual(plain(form.placeholderNames), []);
        assert.deepEqual(plain(action.readIntParams(form)), [ 1, 2, 1 ]);
        assert.deepEqual(plain(action.readIntParams({ ...form, hideBotName: false })), [ 1, 2, 0 ]);
        assert.equal(action.readStringParam(form), 'Frank\thello');
    }
});

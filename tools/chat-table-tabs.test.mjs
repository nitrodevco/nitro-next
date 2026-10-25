import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

// WIN63-202610121624 chat markup: eight colours, and `[a]` table tabs in notification bubbles
// (`ChatMarkup.applyToElements` with tableTabs, then `ChatTabLayout` column stops).

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

const chat = new URL('../packages/nitro-theme/src/chat/', import.meta.url);
const markup = loadFile(new URL('ChatMarkup.ts', chat));
const { layoutChatTabs } = loadFile(new URL('ChatTabLayout.ts', chat));
const { layoutFlashTextLines } = loadFile(new URL('../packages/nitro-theme/src/font/flash-text/flashTextBlock.ts', import.meta.url));

const plain = value => JSON.parse(JSON.stringify(value ?? null));

await test('the palette has the eight colours of the new client, in its order', () => {
    assert.deepEqual(plain(markup.CHAT_COLOURS.map(([ name ]) => name)), [ 'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'pink' ]);
    assert.equal(markup.applyChatMarkupToElements('[pink]x[/pink]', 0), '<font color="#9C145B">x</font>');
    assert.equal(markup.applyChatMarkupToElements('[purple]x[/purple]', 0xFFFFFF), '<font color="#C19AFF">x</font>');
    assert.equal(markup.applyChatColourToChat('@orange@ hi', 0), '<font color="#9C3B00">hi</font>');
});

await test('[a] becomes the table tab marker only with table tabs on, trimming spaces around it', () => {
    const text = '[b]Inventory:[/b] [a] axe (x5)  [a] sword';

    assert.equal(markup.hasChatTableTabMarkup(text), true);
    assert.equal(markup.hasChatTableTabMarkup('[/a] no'), false);
    assert.equal(markup.applyChatMarkupToElements(text, 0, true), '<b>Inventory:</b><chat-table-tab/>axe (x5)<chat-table-tab/>sword');
    assert.equal(markup.applyChatMarkupToElements(text, 0, false), '<b>Inventory:</b> [a] axe (x5)  [a] sword');
    // A marker typed into the text is escaped first, so it stays text.
    assert.equal(markup.applyChatMarkupToElements('<chat-table-tab/>[a]', 0, true), '&lt;chat-table-tab/&gt;<chat-table-tab/>');
});

// Every character 6 px wide, `|` 2 px: what `getCellWidth` reads off the guard.
const format = { fontSize: 12 };
const measure = text => [ ...text ].reduce((width, char) => width + ((char === '|') ? 2 : 6), 0);
const measureLayout = (cells) => {
    const lines = layoutFlashTextLines([ { text: cells, format } ], {}, measure);

    return lines ? { lines, measure } : null;
};

await test('column stops are the widest cell of each column plus the gap', () => {
    const result = layoutChatTabs('ab<chat-table-tab/>c<chat-table-tab/>d\nabcd<chat-table-tab/>e<chat-table-tab/>', 1, measureLayout);

    // Column 0: max(2, 4) chars = 24 px + 8; column 1: 1 char = 6 px + 8.
    assert.deepEqual(plain(result.tabStops), [ 32, 46 ]);
    // The second row ends on a blank cell, so its last marker is dropped (`terminalRows`).
    assert.equal(result.markup, 'ab\tc\td\nabcd\te');
});

await test('the gap scales with the chat font, a typed tab is four spaces', () => {
    const result = layoutChatTabs('a\tb<chat-table-tab/>c', 1.5, measureLayout);

    assert.deepEqual(plain(result.tabStops), [ (6 * 6) + 12 ]);
    assert.equal(result.markup, 'a    b\tc');
});

await test('a tab advances the line to the next stop', () => {
    const [ line ] = layoutFlashTextLines([ { text: 'ab\tc\td', format } ], { tabStops: [ 32, 46 ] }, measure);

    assert.deepEqual(plain(line.segments.map(segment => [ segment.text, segment.x, segment.width ])), [ [ 'ab', 0, 12 ], [ '\t', 12, 20 ], [ 'c', 32, 6 ], [ '\t', 38, 8 ], [ 'd', 46, 6 ] ]);
});

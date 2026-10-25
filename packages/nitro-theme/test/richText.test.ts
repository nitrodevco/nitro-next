import assert from 'node:assert/strict';
import { test } from 'node:test';

import { parseRichText, safeRichTextLink } from '../src/utils/richText';

const BASE = 'https://hotel.example.com/client/';

test('an editor\'s article body becomes paragraphs of Flash markup, a heading and a list, never raw tags', () => {
    const blocks = parseRichText('<h2>Party</h2><p class="ql-align-center">Join the <strong>Anniversary</strong> <em>Party</em>, you <u>must</u> come &amp; <span style="color: rgb(255, 0, 0);">see</span>!</p><ol><li>One</li><li data-list="bullet">Two</li></ol><ul><li>Three</li></ul>', { baseUrl: BASE });

    assert.deepEqual(blocks, [
        { kind: 'text', role: 'h2', markup: 'Party', align: 'left', depth: 0 },
        { kind: 'text', role: 'p', markup: 'Join the <b>Anniversary</b> <i>Party</i>, you <u>must</u> come &amp; <font color="#ff0000">see</font>!', align: 'center', depth: 0 },
        { kind: 'text', role: 'li', markup: 'One', align: 'left', depth: 1, bullet: '1.' },
        { kind: 'text', role: 'li', markup: 'Two', align: 'left', depth: 1, bullet: '•' },
        { kind: 'text', role: 'li', markup: 'Three', align: 'left', depth: 1, bullet: '•' },
    ]);
});

test('scripts, styles and frames go with their text; event handlers, unknown tags and their attributes go, their text stays', () => {
    const blocks = parseRichText('<p onclick="steal()">Hi<script>alert(1)</script><style>p{}</style><iframe src="x">frame</iframe> <marquee>there</marquee> &lt;b&gt;</p>');

    assert.deepEqual(blocks, [ { kind: 'text', role: 'p', markup: 'Hi there &lt;b&gt;', align: 'left', depth: 0 } ]);
});

test('only http(s) and in-client links are kept; a javascript: link keeps its text and loses the link', () => {
    const blocks = parseRichText('<p><a href="javascript:alert(1)">bad</a> <a href="/news/2">good</a> <a href="event:navigator/goto/12">room</a></p>', { baseUrl: BASE });

    assert.equal(blocks[0].kind === 'text' && blocks[0].markup, 'bad <a href="https://hotel.example.com/news/2"><u>good</u></a> <a href="event:navigator/goto/12"><u>room</u></a>');
    assert.equal(safeRichTextLink('data:text/html,x'), undefined);
});

test('images only from the page\'s origin or the allowed hosts; others are dropped', () => {
    const blocks = parseRichText('<p>a</p><img src="/c_images/news/1.png" width="45"><img src="https://evil.example.org/x.png"><img src="https://cdn.example.net/y.png" alt="y"><img src="data:image/png;base64,AAAA">', { baseUrl: BASE, imageHosts: [ 'cdn.example.net' ] });

    assert.deepEqual(blocks.filter(block => block.kind === 'image'), [
        { kind: 'image', src: 'https://hotel.example.com/c_images/news/1.png', alt: '', width: 45, height: undefined, align: 'left' },
        { kind: 'image', src: 'https://cdn.example.net/y.png', alt: 'y', width: undefined, height: undefined, align: 'left' },
    ]);
});

test('a style open across a line break or a misnested end tag is closed in each block it reaches', () => {
    const blocks = parseRichText('<p><b>one<br>two</p><p>three</b> four</p><p><i><u>x</i> y</u></p>');

    assert.deepEqual(blocks.map(block => block.kind === 'text' && block.markup), [ '<b>one<br>two</b>', '<b>three</b> four', '<i><u>x</u></i> y' ]);
});

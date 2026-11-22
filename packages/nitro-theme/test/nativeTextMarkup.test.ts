import assert from 'node:assert/strict';
import { test } from 'node:test';

import { NATIVE_LINK, NATIVE_UNDERLINE, nativeMarkup } from '../src/utils/nativeTextMarkup';

// The case that went plain (a news module's body in `fontFamily: 'Ubuntu'`): the fallback joined the runs and dropped their formatting.
void test('bold, italic, underline and colour runs keep their style on the canvas fallback', () => {
    const { text, tagStyles } = nativeMarkup('Join the <b>Anniversary Party</b>, you <u>must</u> <i>see</i> <font color="#ff0000">this</font>!');

    assert.equal(text, 'Join the <r0>Anniversary Party</r0>, you <r1>must</r1> <r2>see</r2> <r3>this</r3>!');
    assert.deepEqual(tagStyles, {
        r0: { fontWeight: 'bold' },
        r1: { [NATIVE_UNDERLINE]: true },
        r2: { fontStyle: 'italic' },
        r3: { fill: '#ff0000' },
    });
});

void test('plain markup gives no tag styles, so the canvas text parses no tags at all', () => {
    assert.deepEqual(nativeMarkup('a &lt;b&gt; c'), { text: 'a <b> c', tagStyles: {} });
});

void test('typed text that looks like a run tag is broken so it shows as typed', () => {
    const { text } = nativeMarkup('<b>x</b> &lt;r0&gt;');

    assert.equal(text, '<r0>x</r0> <​r0>');
});

// fwui's gap: a module's news body in Ubuntu (the browser's face) drew its links but took no click on them.
void test('a link\'s runs carry its index, split where the link starts and ends, so the fallback can take a click on them', () => {
    const { text, tagStyles, links } = nativeMarkup('Read <b>the <a href="event:habbopages/faq">guide</a> now</b> or <a href="https://example.com">here</a>.');

    assert.equal(text, 'Read <r0>the </r0><r1>guide</r1><r2> now</r2> or <r3>here</r3>.');
    assert.deepEqual(tagStyles, {
        r0: { fontWeight: 'bold' },
        r1: { fontWeight: 'bold', [NATIVE_LINK]: 0 },
        r2: { fontWeight: 'bold' },
        r3: { [NATIVE_LINK]: 1 },
    });
    assert.deepEqual(links, [ 'event:habbopages/faq', 'https://example.com' ]);
});

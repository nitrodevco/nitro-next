import assert from 'node:assert/strict';
import { test } from 'node:test';

import { chatBubbleStyleTheme, parseChatBubbleTheme, subtractChatBubbleTint, themedChatBubbleLine } from '../src/chat/chatBubbleTheme';

// The case: restyling a full theme, its bubbles could not be given: the original client stacked them 21 px apart (ours 24),
// coloured its strip by subtraction (ours multiplies, so no bitmap gave its darker strip) and drew a whisper's name bold
// and black with only the message italic in #595959 (ours: both italic at 60%).
void test('a theme as JSON text: art and reg points per style, a subtracting tint, a whisper\'s name and message', () => {
    const theme = parseChatBubbleTheme(JSON.stringify({
        styles: {
            '*': { regPoints: { overlapRect: { x: 0, y: 0, width: 0, height: 3 } } },
            0: { art: 'theme_normal', tint: 'subtract' },
        },
        lines: { whisper: { name: { bold: true, italic: false, color: '#000000' }, text: { italic: true, color: '#595959' }, alpha: 1 } },
    }));

    assert.deepEqual(theme, {
        styles: {
            '*': { regPoints: { overlapRect: { x: 0, y: 0, width: 0, height: 3 } } },
            0: { art: 'theme_normal', tint: 'subtract' },
        },
        lines: { whisper: { name: { bold: true, italic: false, color: '#000000' }, text: { italic: true, color: '#595959' }, alpha: 1 } },
    });
    // A style's own entry over `*`'s, reg points merged key by key.
    assert.deepEqual(chatBubbleStyleTheme(theme, 0), { art: 'theme_normal', tint: 'subtract', regPoints: { overlapRect: { x: 0, y: 0, width: 0, height: 3 } } });
    assert.deepEqual(chatBubbleStyleTheme(theme, 7), { regPoints: { overlapRect: { x: 0, y: 0, width: 0, height: 3 } } });
});

void test('none, or values of the wrong type, leave Habbo\'s bubbles', () => {
    assert.equal(parseChatBubbleTheme(undefined), undefined);
    assert.equal(parseChatBubbleTheme('{ not json'), undefined);
    assert.equal(parseChatBubbleTheme({ styles: { normal: { art: 'x' }, 3: { tint: 'screen', regPoints: { scale9: { x: 1 }, fontFace: 4 } } }, lines: { talk: { name: { color: 'black' }, alpha: '1' }, yell: { alpha: 1 } } }), undefined);
    assert.equal(chatBubbleStyleTheme(undefined, 0), undefined);
});

// Expected values: the original client's tint, each channel `colour - (255 - layer)` clamped at 0, alpha kept.
void test('the subtracting tint: white takes the colour, greys go darker than a multiply, black and transparent stay', () => {
    const pixels = new Uint8ClampedArray([
        255, 255, 255, 255,
        128, 128, 128, 255,
        200, 220, 240, 128,
        0, 0, 0, 255,
        90, 90, 90, 0,
    ]);

    subtractChatBubbleTint(pixels, 0x3366cc);

    assert.deepEqual([ ...pixels ], [
        0x33, 0x66, 0xcc, 255,
        0, 0, 77, 255,
        0, 67, 189, 128,
        0, 0, 0, 255,
        90, 90, 90, 0,
    ]);
});

void test('a whisper\'s name and message each as the theme styles them, Flash\'s weights where it leaves one out', () => {
    const theme = { name: { italic: false, color: '#000000' }, text: { color: '#595959' }, alpha: 1 };

    assert.deepEqual(themedChatBubbleLine('agent', 'psst', 'whisper', theme), {
        markup: '<font color="#000000"><b>agent: </b></font><font color="#595959"><i>psst</i></font>',
        alpha: 1,
    });
    // A shout keeps its bold message; a line that hides the name has none.
    assert.deepEqual(themedChatBubbleLine(undefined, 'HEY', 'shout', { alpha: 0.9 }), { markup: '<b>HEY</b>', alpha: 0.9 });
});

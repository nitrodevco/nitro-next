import assert from 'node:assert/strict';
import { test } from 'node:test';

import { capturedFontFace } from '../src/utils/capturedFontFace';

// The case: a theme's `font_face: 'Ubuntu Bold'` drew in the browser's default face, as only Flash's own spelling ('Ubuntu bold') was known.
void test('a face the client ships, whatever its case and spacing', () => {
    assert.equal(capturedFontFace('Ubuntu Bold'), 'UbuntuBold');
    assert.equal(capturedFontFace('Ubuntu bold'), 'UbuntuBold');
    assert.equal(capturedFontFace('ubuntu-bold-italic'), 'UbuntuBoldItalics');
    assert.equal(capturedFontFace('Ubuntu condensed'), 'UbuntuCondensed');
    assert.equal(capturedFontFace('Volter Bold'), 'VolterBold');
});

void test('a face the client does not ship is none of them', () => {
    assert.equal(capturedFontFace('Courier'), undefined);
    assert.equal(capturedFontFace('UbuntuThick'), undefined);
});

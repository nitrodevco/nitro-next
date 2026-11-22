import assert from 'node:assert/strict';
import { test } from 'node:test';

import { subtractTintPixels } from '../src/utils/subtractTint';

// The case: a theme's art drawn for this tint, its #e0e0e0 face under #6fa6e2, is #5087c3 where the art was made; multiply gives #6192c6.
void test('subtract: each channel the colour less the art\'s darkness; black stays black, a transparent pixel is left', () => {
    const pixels = new Uint8ClampedArray([ 224, 224, 224, 255, 255, 255, 255, 128, 0, 0, 0, 255, 50, 60, 70, 0 ]);

    subtractTintPixels(pixels, 0x6fa6e2);

    assert.deepEqual([ ...pixels ], [ 0x50, 0x87, 0xc3, 255, 0x6f, 0xa6, 0xe2, 128, 0, 0, 0, 255, 50, 60, 70, 0 ]);
});

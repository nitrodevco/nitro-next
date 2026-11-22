/**
 * `flashBlurPixels`: Flash's `BlurFilter` on the CPU - box passes of round(blur) pixels, from
 * floor(size / 2) before each pixel to the rest after, past the edge transparent, `quality` times,
 * each pass kept to 8 bits. The figures are worked out by hand from that kernel.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { flashBlurPixels } from '../src/utils/flash-filters/flashBlurPixels';

/** A width x height bitmap, transparent but for `opaque` pixels ([x, y]) at alpha 255 (black). */
const bitmap = (width: number, height: number, ...opaque: [ number, number ][]) => {
    const data = new Uint8ClampedArray(width * height * 4);

    for (const [ x, y ] of opaque) data[((y * width) + x) * 4 + 3] = 255;

    return data;
};

const alphaRow = (data: Uint8ClampedArray, width: number, y: number) => Array.from({ length: width }, (unused, x) => data[((y * width) + x) * 4 + 3]);
const alphaColumn = (data: Uint8ClampedArray, width: number, height: number, x: number) => Array.from({ length: height }, (unused, y) => data[((y * width) + x) * 4 + 3]);

void test('one pass of 6 spreads a pixel over the 3 before it and the 2 after, 255 / 6 each', () => {
    const data = bitmap(12, 1, [ 5, 0 ]);

    flashBlurPixels(data, 12, 1, 6, 0, 1);

    // round(255 / 6) = round(42.5) = 43 on x 3-8
    assert.deepEqual(alphaRow(data, 12, 0), [ 0, 0, 0, 43, 43, 43, 43, 43, 43, 0, 0, 0 ]);
});

void test('quality 2 is a second pass over the first, rounded to 8 bits in between', () => {
    const data = bitmap(12, 1, [ 5, 0 ]);

    flashBlurPixels(data, 12, 1, 6, 0, 2);

    // x: sum of the first pass's 43s over x-3..x+2, / 6, rounded: 43 * n / 6 for n = 0..6..1
    assert.deepEqual(alphaRow(data, 12, 0), [ 0, 7, 14, 22, 29, 36, 43, 36, 29, 22, 14, 7 ]);
});

void test('vertically the same kernel, along the column', () => {
    const data = bitmap(1, 12, [ 0, 5 ]);

    flashBlurPixels(data, 1, 12, 0, 6, 2);

    assert.deepEqual(alphaColumn(data, 1, 12, 0), [ 0, 7, 14, 22, 29, 36, 43, 36, 29, 22, 14, 7 ]);
});

void test('past the edge counts as transparent: an edge pixel loses what falls outside', () => {
    const data = bitmap(8, 1, [ 0, 0 ]);

    flashBlurPixels(data, 8, 1, 6, 0, 1);

    // x 0-3 reach back to x 0 (x - 3 <= 0); what x -3..-1 would hold is lost
    assert.deepEqual(alphaRow(data, 8, 0), [ 43, 43, 43, 43, 0, 0, 0, 0 ]);
});

void test('BlurFilter(6, 6, 2), the habbicon shadow: x then y each pass, the peak a pixel down and right of the source', () => {
    const data = bitmap(13, 13, [ 5, 5 ]);

    flashBlurPixels(data, 13, 13, 6, 6, 2);

    // pass 1: along x 43 on x 3-8, along y round(43 / 6) = 7 on the 6x6 block x/y 3-8. Pass 2
    // along x: each of its rows becomes Q = round(7 * n / 6), n the block pixels in x-3..x+2; along
    // y each column x is round(Q[x] * n / 6) - Q itself on row 6 (n = 6), half of it on row 3.
    const Q = [ 0, 1, 2, 4, 5, 6, 7, 6, 5, 4, 2, 1, 0 ];

    assert.deepEqual(alphaRow(data, 13, 6), Q);
    assert.deepEqual(alphaColumn(data, 13, 13, 6), Q);
    assert.deepEqual(alphaRow(data, 13, 3), Q.map(value => Math.round(value * 3 / 6)));
    assert.equal(data[((3 * 13) + 3) * 4 + 3], 2);
});

void test('every channel is blurred alike (premultiplied colour with its alpha)', () => {
    const data = new Uint8ClampedArray(12 * 4);

    data.set([ 120, 60, 30, 255 ], 5 * 4);
    flashBlurPixels(data, 12, 1, 6, 0, 1);

    assert.deepEqual(Array.from(data.subarray(3 * 4, 4 * 4)), [ 20, 10, 5, 43 ]);
});

void test('a blur of 1 or less is no blur; fractions round as Flash rounds the box', () => {
    const still = bitmap(6, 1, [ 2, 0 ]);

    flashBlurPixels(still, 6, 1, 1, 1, 3);
    assert.deepEqual(alphaRow(still, 6, 0), [ 0, 0, 255, 0, 0, 0 ]);

    const rounded = bitmap(12, 1, [ 5, 0 ]);

    flashBlurPixels(rounded, 12, 1, 5.6, 0, 1);
    assert.deepEqual(alphaRow(rounded, 12, 0), [ 0, 0, 0, 43, 43, 43, 43, 43, 43, 0, 0, 0 ]);
});

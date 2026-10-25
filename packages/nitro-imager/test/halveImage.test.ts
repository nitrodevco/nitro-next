import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { createCanvas } from '@napi-rs/canvas';

import { halveImage } from '../src/avatar/halveImage';

void describe('halveImage', () => {
    void it('averages each 2x2 block, weighting colour by coverage as the GPU filter does', () => {
        const source = createCanvas(4, 2);
        const context = source.getContext('2d');

        // Left block: one opaque red pixel and three transparent ones. Right block: all blue.
        context.fillStyle = '#ff0000';
        context.fillRect(0, 0, 1, 1);
        context.fillStyle = '#0000ff';
        context.fillRect(2, 0, 2, 2);

        const halved = halveImage(source);
        const data = halved.getContext('2d').getImageData(0, 0, 2, 1).data;

        assert.equal(halved.width, 2);
        assert.equal(halved.height, 1);
        // A quarter covered: red at a quarter opacity, not a dark red.
        assert.deepEqual([ ...data.subarray(0, 4) ], [ 255, 0, 0, 64 ]);
        assert.deepEqual([ ...data.subarray(4, 8) ], [ 0, 0, 255, 255 ]);
    });
});

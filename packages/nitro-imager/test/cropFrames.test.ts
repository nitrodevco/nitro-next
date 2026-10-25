import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { createCanvas } from '@napi-rs/canvas';

import { cropFrames } from '../src/output/cropFrames';

void describe('cropFrames', () => {
    void it('cuts every frame to what any of them shows, with the gap around it', () => {
        const first = createCanvas(20, 20);
        const second = createCanvas(20, 20);

        first.getContext('2d').fillStyle = '#ff0000';
        first.getContext('2d').fillRect(5, 6, 2, 2);
        second.getContext('2d').fillStyle = '#0000ff';
        second.getContext('2d').fillRect(9, 10, 1, 1);

        const cropped = cropFrames([ first, second ], 1);

        // Visible from (5, 6) to (10, 11): 5x5, and a pixel each side.
        for (const frame of cropped) {
            assert.equal(frame.width, 7);
            assert.equal(frame.height, 7);
        }

        const red = cropped[0].getContext('2d').getImageData(0, 0, 7, 7).data;
        const blue = cropped[1].getContext('2d').getImageData(0, 0, 7, 7).data;
        const at = (x: number, y: number) => ((y * 7) + x) * 4;

        assert.equal(red[at(0, 0) + 3], 0, 'the gap is transparent');
        assert.deepEqual([ ...red.subarray(at(1, 1), at(1, 1) + 4) ], [ 255, 0, 0, 255 ]);
        assert.deepEqual([ ...blue.subarray(at(5, 5), at(5, 5) + 4) ], [ 0, 0, 255, 255 ]);
        assert.equal(blue[at(6, 6) + 3], 0);
    });

    void it('pads past the canvas when the figure reaches its edge, and leaves an empty image be', () => {
        const full = createCanvas(3, 3);

        full.getContext('2d').fillRect(0, 0, 3, 3);

        assert.equal(cropFrames([ full ], 1)[0].width, 5);

        const empty = createCanvas(4, 4);

        assert.equal(cropFrames([ empty ], 1)[0], empty);
    });
});

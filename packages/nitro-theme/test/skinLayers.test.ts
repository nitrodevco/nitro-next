import assert from 'node:assert/strict';
import { test } from 'node:test';

import { SkinArt, SkinPiece, SkinScale, skinSlotLayer, SkinStateGeometry } from '../src/utils/skinLayers';

const piece = (name: string, [ x, y, width, height ]: number[], h: SkinScale, v: SkinScale): SkinPiece => ({ name, at: { x, y, width, height }, from: { x: 0, y: 0, width, height }, h, v });

/** Records what each layer asks to be drawn, and keys it by its kind and part. */
const recorder = () => {
    const asked: { art: SkinArt; part?: string }[] = [];

    return { asked, art: (art: SkinArt, part?: string) => (asked.push({ art, part }), `${art.kind}:${part ?? 'group'}`) };
};

void test('a lone untinted strip of a button face is placed as a nine-slice, not a sprite stretched over the button', () => {
    // `illumina_light_button_multi_middle`: the face colorizes, its 1px etch along the bottom does not.
    const etch = piece('button_etch_center', [ 0, 18, 11, 1 ], 'strech', 'move');
    const state: SkinStateGeometry = {
        width: 11,
        height: 19,
        pieces: [
            piece('button_top_center', [ 0, 0, 11, 4 ], 'strech', 'fixed'),
            piece('button_center_center', [ 0, 4, 11, 10 ], 'strech', 'strech'),
            piece('button_bottom_center', [ 0, 14, 11, 4 ], 'strech', 'move'),
            etch,
        ],
    };
    const { asked, art } = recorder();

    // A stateful component is sized by its art.
    assert.deepEqual(skinSlotLayer([ etch ], state, true, art), { kind: 'nineSlice', textureKey: 'sheet:group', leftWidth: 0, topHeight: 4, rightWidth: 0, bottomHeight: 5 });
    assert.deepEqual(asked, [ { art: { kind: 'sheet', pieces: [ etch ] }, part: undefined } ]);
});

void test('the one piece of a skin sized by its art is the bitmap at its own size, wherever the skin places it', () => {
    // A bubble's pointer: one entity, re-centred across and moved down.
    const pointer = piece('pointer', [ 2, 0, 9, 6 ], 'center', 'move');
    const { asked, art } = recorder();

    assert.deepEqual(skinSlotLayer([ pointer ], { width: 11, height: 6, pieces: [ pointer ] }, true, art), { kind: 'sprite', textureKey: 'piece:group' });
    assert.deepEqual(asked, [ { art: { kind: 'piece', piece: pointer }, part: undefined } ]);
});

void test('one stretched piece over the whole skin is a sprite of it, whatever sizes the component', () => {
    const fill = piece('fill', [ 0, 0, 4, 4 ], 'strech', 'strech');
    const { art } = recorder();

    assert.deepEqual(skinSlotLayer([ fill ], { width: 4, height: 4, pieces: [ fill ] }, false, art), { kind: 'sprite', textureKey: 'piece:group' });
});

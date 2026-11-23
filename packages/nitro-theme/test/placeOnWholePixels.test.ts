import '@pixi/layout';

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { Sprite, Texture, TextureSource } from 'pixi.js';

import { placeOnWholePixels } from '../src/font/placeOnWholePixels';

type LayoutData = { offsetX: number; offsetY: number };

/**
 * A text sprite as `FlashText` lays it out, through `@pixi/layout`'s own `computeLayoutData`. Only
 * `layout.style` is read there, so a plain one stands in for the Yoga-backed `Layout`.
 */
const textSprite = (width: number, height: number, objectPosition: string) => {
    const sprite = new Sprite(new Texture({ source: new TextureSource({ width, height }) }));

    Object.defineProperty(sprite, 'layout', { value: { style: { objectFit: 'none', objectPosition } } });

    return sprite;
};

const layOut = (sprite: Sprite, width: number, height: number) => (sprite as unknown as { computeLayoutData: (computed: unknown) => LayoutData }).computeLayoutData({ left: 0, top: 0, width, height });

void test('a centred field an odd number of pixels narrower than its window sits at TextSkinRenderer.draw\'s floored offset', () => {
    // The trophy's `title`: "Trophy" 45 px wide in its 120 px window.
    const sprite = textSprite(45, 18, 'center top');

    assert.equal(layOut(sprite, 120, 18).offsetX, 37.5);

    placeOnWholePixels(sprite);

    // `Math.floor(120 / 2 - 45 / 2)`.
    assert.deepEqual([ layOut(sprite, 120, 18).offsetX, layOut(sprite, 120, 18).offsetY ], [ 37, 0 ]);
});

void test('whole offsets stay as they are, on both axes', () => {
    const sprite = textSprite(44, 14, 'right bottom');

    placeOnWholePixels(sprite);

    assert.deepEqual([ layOut(sprite, 120, 18).offsetX, layOut(sprite, 120, 18).offsetY ], [ 76, 4 ]);

    const middle = textSprite(44, 13, 'left center');

    placeOnWholePixels(middle);

    assert.deepEqual([ layOut(middle, 120, 18).offsetX, layOut(middle, 120, 18).offsetY ], [ 0, 2 ]);
});

void test('placing a sprite again wraps it once', () => {
    const sprite = textSprite(45, 18, 'center top');

    placeOnWholePixels(sprite);

    const wrapped = (sprite as unknown as { computeLayoutData: unknown }).computeLayoutData;

    placeOnWholePixels(sprite);

    assert.equal((sprite as unknown as { computeLayoutData: unknown }).computeLayoutData, wrapped);
});

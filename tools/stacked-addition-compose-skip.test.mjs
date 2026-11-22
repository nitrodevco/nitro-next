/**
 * `StackedAdditionStack` composes its entries into one bitmap and uploads it as the host sprite's
 * texture. An update that would draw the same picture - the same entry bitmaps, not drawn into since
 * (`getBitmapVersion`), placed and blended the same - leaves the bitmap and the upload as they were.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { createLoader } from './load-source.mjs';

/** A canvas whose context counts the draws into it. */
class FakeCanvas {
    width = 0;
    height = 0;
    draws = 0;
    clears = 0;

    getContext() {
        return {
            imageSmoothingEnabled: true,
            globalAlpha: 1,
            globalCompositeOperation: 'source-over',
            save: () => {},
            restore: () => {},
            clearRect: () => this.clears++,
            drawImage: () => this.draws++,
            fillRect: () => this.draws++,
        };
    }
}

class FakeTexture {
    static EMPTY = new FakeTexture();

    uploads = 0;

    static from(resource) {
        const texture = new FakeTexture();

        texture.source = { resource, update: () => texture.uploads++ };

        return texture;
    }
}

const external = {
    '@nitrodevco/nitro-api': { ToInt32: value => value | 0 },
    'pixi.js': { Texture: FakeTexture },
    '#renderer/utils': { GetTickerTime: () => 1000, TextureUtils: { destroyTexture() {} } },
};

const loader = createLoader();
const loadFile = url => loader(url, external, { document: { createElement: () => new FakeCanvas() } });

const root = new URL('../packages/nitro-renderer/src/room/object/visualization/', import.meta.url);
const { StackedAdditionStack } = loadFile(new URL('stacked/StackedAdditionStack.ts', root));
const { createTransparentBitmap, getBitmapContext } = loadFile(new URL('variablefx/rendering/VariableFxBitmap.ts', root));

/** The host's room sprite: a property set to a new value moves its update counter, as `RoomObjectSprite`'s setters do. */
const createHostSprite = () => {
    const values = { texture: undefined, offsetX: 0, offsetY: 0, relativeDepth: 0, alpha: 255, visible: false };
    const sprite = {
        updateCounter: 0,
        increaseUpdateCounter() {
            this.updateCounter++;
        },
    };

    for (const key of Object.keys(values)) {
        Object.defineProperty(sprite, key, {
            get: () => values[key],
            set: (value) => {
                if (values[key] === value) return;

                values[key] = value;
                sprite.updateCounter++;
            },
        });
    }

    return sprite;
};

/** An addition showing `bitmap` at `alpha`; it never animates on its own. */
const createAddition = (id, bitmap) => ({
    id,
    disposed: false,
    isPartOfStack: false,
    contributesToStackLayout: true,
    invisible: false,
    isFinished: false,
    requiresAnimationTick: false,
    alpha: 255,
    update(sprite) {
        sprite.bitmap = bitmap;
        sprite.offsetX = -Math.trunc(bitmap.width / 2);
        sprite.offsetY = 0;
        sprite.alpha = this.alpha;
        sprite.visible = true;
    },
    animate() { return false; },
    dispose() {},
});

const setup = () => {
    const stack = new StackedAdditionStack();
    const sprite = createHostSprite();
    const bitmaps = [ createTransparentBitmap(20, 10), createTransparentBitmap(30, 12) ];
    const additions = bitmaps.map((bitmap, index) => createAddition(index + 1, bitmap));

    additions.forEach((addition, index) => stack.add(addition, 0, index));

    stack.update(sprite, 64, 0);

    const composed = stack._bitmap;

    return { stack, sprite, bitmaps, additions, composed, draws: () => composed.draws, uploads: () => stack.texture.uploads };
};

await test('the first update composes every entry onto the host sprite', () => {
    const { stack, sprite, composed } = setup();

    assert.equal(composed.draws, 2);
    assert.equal(sprite.texture, stack.texture);
    assert.equal(sprite.visible, true);
});

await test('an update that would draw the same picture redraws and uploads nothing', () => {
    const { stack, sprite, draws, uploads } = setup();
    const before = { draws: draws(), uploads: uploads(), counter: sprite.updateCounter };

    for (let i = 0; i < 10; i++) stack.update(sprite, 64, 0);

    assert.equal(draws(), before.draws);
    assert.equal(uploads(), before.uploads);
    assert.equal(sprite.updateCounter, before.counter, 'the host sprite is left as it was');
});

await test('an entry drawn into again is composed again', () => {
    const { stack, sprite, bitmaps, draws, uploads } = setup();
    const before = { draws: draws(), uploads: uploads(), counter: sprite.updateCounter };

    getBitmapContext(bitmaps[1]).fillRect(0, 0, 1, 1);

    stack.update(sprite, 64, 0);

    assert.equal(draws(), before.draws + 2);
    assert.equal(uploads(), before.uploads + 1);
    assert.notEqual(sprite.updateCounter, before.counter);
});

await test('an entry whose alpha changed is composed again', () => {
    const { stack, sprite, additions, draws, uploads } = setup();
    const before = { draws: draws(), uploads: uploads() };

    additions[0].alpha = 128;

    stack.update(sprite, 64, 0);

    assert.equal(draws(), before.draws + 2);
    assert.equal(uploads(), before.uploads + 1);
});

await test('the texture goes back on a sprite the host emptied, without a redraw', () => {
    const { stack, sprite, draws, uploads } = setup();
    const before = { draws: draws(), uploads: uploads() };

    sprite.texture = FakeTexture.EMPTY;

    stack.update(sprite, 64, 0);

    assert.equal(sprite.texture, stack.texture);
    assert.equal(draws(), before.draws);
    assert.equal(uploads(), before.uploads);
});

await test('a removed entry is composed away', () => {
    const { stack, sprite, composed } = setup();
    const before = composed.draws;

    stack.remove(1);
    stack.update(sprite, 64, 0);

    // The bitmap is now one entry's size, so it is a new one with the remaining entry drawn once.
    assert.notEqual(stack._bitmap, composed);
    assert.equal(stack._bitmap.draws, 1);
    assert.equal(composed.draws, before);
});

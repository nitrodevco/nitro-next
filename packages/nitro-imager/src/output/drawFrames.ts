import { Canvas, createCanvas } from '@napi-rs/canvas';
import { GetRenderer } from '@nitrodevco/nitro-renderer';
import { BLEND_MODES, Container, Rectangle, Sprite, Texture } from 'pixi.js';

import { halveImage } from '../avatar/halveImage';

/** How large an image is drawn: `n` as the room draws it, `l` doubled, `s` halved afterwards. */
export type ImageSize = 's' | 'n' | 'l';

/** One sprite of a frame, where the room would draw it relative to the object's tile. */
export interface PlacedSprite {
    texture: Texture;
    x: number;
    y: number;
    flipH: boolean;
    flipV?: boolean;
    /** 0-1; opaque when left out. */
    alpha?: number;
    /** A tint, `0xffffff` (none) when left out. */
    tint?: number;
    blendMode?: BLEND_MODES;
}

/**
 * The frames, back to front each, on one canvas size - the union of every sprite of every frame -
 * at `size`: `n` as drawn, `l` doubled, `s` halved. An animation keeps one size throughout, and an
 * avatar with no effect is its geometry's canvas exactly (90x130 large). Only for `s` are the
 * bounds rounded out to even pixels about the object's tile, so the halving averages the same 2x2
 * blocks the client's zoomed-out room does (`RoomDownsampleFilter`).
 */
export const drawFrames = (frames: PlacedSprite[][], size: ImageSize): Canvas[] => {
    let left = Infinity, top = Infinity, right = -Infinity, bottom = -Infinity;

    for (const sprite of frames.flat()) {
        const x = sprite.flipH ? (sprite.x - sprite.texture.width) : sprite.x;
        const y = sprite.flipV ? (sprite.y - sprite.texture.height) : sprite.y;

        left = Math.min(left, x);
        top = Math.min(top, y);
        right = Math.max(right, x + sprite.texture.width);
        bottom = Math.max(bottom, y + sprite.texture.height);
    }

    if (!Number.isFinite(left)) throw new Error('Nothing was drawn');

    if (size === 's') {
        left = Math.floor(left / 2) * 2;
        top = Math.floor(top / 2) * 2;
        right = left + Math.ceil((right - left) / 2) * 2;
        bottom = top + Math.ceil((bottom - top) / 2) * 2;
    }

    const bounds = new Rectangle(left, top, right - left, bottom - top);
    const zoom = (size === 'l') ? 2 : 1;

    return frames.map((sprites) => {
        const container = new Container();

        // Fills the bounds, so a frame whose sprites cover less of them is still the full size.
        const frame = new Sprite(Texture.EMPTY);

        frame.position.set(bounds.x, bounds.y);
        frame.setSize(bounds.width, bounds.height);
        container.addChild(frame);

        for (const placed of sprites) {
            const sprite = new Sprite(placed.texture);

            sprite.position.set(placed.x, placed.y);

            if (placed.flipH) sprite.scale.x = -1;
            if (placed.flipV) sprite.scale.y = -1;
            if (placed.alpha !== undefined) sprite.alpha = placed.alpha;
            if (placed.tint !== undefined) sprite.tint = placed.tint;
            if (placed.blendMode) sprite.blendMode = placed.blendMode;
            if (placed.blendMode === 'add') sprite.texture = additiveTexture(placed.texture);

            container.addChild(sprite);
        }

        // Extract draws its target without the target's own transform: the zoom goes on a child.
        const root = new Container();

        if (zoom !== 1) container.scale.set(zoom);

        root.addChild(container);

        const canvas = GetRenderer().extract.canvas({
            target: root,
            frame: new Rectangle(bounds.x * zoom, bounds.y * zoom, bounds.width * zoom, bounds.height * zoom),
            antialias: false,
        }) as unknown as Canvas;

        root.destroy({ children: true });

        return (size === 's') ? halveImage(canvas) : canvas;
    });
};

/** Each additive texture's copy with its brightness as alpha, kept while the texture is. */
const additiveTextures = new WeakMap<Texture, Texture>();

/**
 * An additive sprite (ink 33, a lamp's glow, an effect's light) as an image with no room behind it
 * can show: the art is drawn on black, and `lighter` adds its alpha with its colour, so over the
 * image's transparent pixels it would be a black box. The copy keeps the colour the art adds -
 * each pixel's colour times its alpha is the same - but takes its alpha from its brightness, so
 * black adds nothing, the glow is translucent over nothing, and over the object it still adds what
 * the room adds.
 */
const additiveTexture = (texture: Texture): Texture => {
    let copy = additiveTextures.get(texture);

    if (copy) return copy;

    const sprite = new Sprite(texture);
    const { pixels, width, height } = GetRenderer().extract.pixels({ target: sprite, resolution: 1, antialias: false });

    sprite.destroy();

    const canvas = createCanvas(width, height);
    const image = canvas.getContext('2d').createImageData(width, height);

    for (let i = 0; i < pixels.length; i += 4) {
        const brightest = Math.max(pixels[i], pixels[i + 1], pixels[i + 2]);

        if (!brightest) continue;

        image.data[i] = (pixels[i] * 255) / brightest;
        image.data[i + 1] = (pixels[i + 1] * 255) / brightest;
        image.data[i + 2] = (pixels[i + 2] * 255) / brightest;
        image.data[i + 3] = (brightest * pixels[i + 3]) / 255;
    }

    canvas.getContext('2d').putImageData(image, 0, 0);
    copy = Texture.from(canvas as never, true);
    additiveTextures.set(texture, copy);

    return copy;
};

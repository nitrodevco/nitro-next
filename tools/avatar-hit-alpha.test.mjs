/**
 * `AvatarHitAlpha`: an avatar frame's alpha built on the CPU from the parts it was drawn from -
 * each part's own alpha placed by its transform (mirrored, scaled, offset by its containers), the
 * most opaque part winning - so the hit test never reads the composed render texture back.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

// Pixi's own matrix maths, by file: the package's exports do not reach it.
const { Matrix } = await import(new URL('../node_modules/pixi.js/lib/maths/matrix/Matrix.mjs', import.meta.url).href);

class Container {
    constructor(transform = new Matrix(), children = []) {
        this.visible = true;
        this.alpha = 1;
        this.localTransform = transform;
        this.children = children;
    }

    updateLocalTransform() {}
}

class Sprite extends Container {
    constructor(texture, transform, alpha = 1) {
        super(transform);
        this.texture = texture;
        this.alpha = alpha;
        this.anchor = { x: 0, y: 0 };
    }
}

const EMPTY = { frame: { width: 0, height: 0 }, orig: { width: 0, height: 0 } };

const load = (partAlphas) => {
    const source = readFileSync(new URL('../packages/nitro-renderer/src/avatar/AvatarHitAlpha.ts', import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};
    const ExtendedSprite = { getFrameAlpha: texture => partAlphas.get(texture) };

    runInNewContext(outputText, {
        exports,
        require: (name) => {
            if (name === 'pixi.js') return { Container, Matrix, Sprite, Texture: { EMPTY } };
            if (name === '#renderer/utils') return { ExtendedSprite };
            throw new Error(`Unexpected dependency: ${name}`);
        },
    });

    return exports.AvatarHitAlpha;
};

/** A 2x2 part texture and its alpha, opaque where `opaque` lists `[x, y]`. */
const part = (...opaque) => {
    const texture = { frame: { x: 0, y: 0, width: 2, height: 2 }, orig: { width: 2, height: 2 } };
    const alpha = new Uint8Array(4);

    for (const [ x, y ] of opaque) alpha[(y * 2) + x] = 255;

    return { texture, alpha: { alpha, width: 2, height: 2 } };
};

const opaquePixels = ({ alpha, width }) => [ ...alpha ].flatMap((value, index) => (value ? [ [ index % width, Math.trunc(index / width), value ] ] : []));

/*
 * A set like `AvatarImage` draws: a part container placed at (4, 1) holding a part image whose
 * sprite is mirrored (`a = -1`, `tx = 2`), and a part drawn at half size at the origin.
 */
const scene = () => {
    const corner = part([ 0, 0 ]);
    const solid = part([ 0, 0 ], [ 1, 0 ], [ 0, 1 ], [ 1, 1 ]);
    const mirrored = new Sprite(corner.texture, new Matrix(-1, 0, 0, 1, 2, 0));
    const halved = new Sprite(solid.texture, new Matrix(0.5, 0, 0, 0.5, 0, 0));
    const root = new Container(new Matrix(1, 0, 0, 1, 50, 50), [
        new Container(new Matrix(1, 0, 0, 1, 4, 1), [ new Container(new Matrix(), [ mirrored ]) ]),
        halved,
        new Sprite(EMPTY, new Matrix()),
    ]);

    return { root, mirrored, partAlphas: new Map([ [ corner.texture, corner.alpha ], [ solid.texture, solid.alpha ] ]) };
};

await test('parts land where they were drawn: mirrored, offset by their containers, scaled', () => {
    const { root, partAlphas } = scene();
    const AvatarHitAlpha = load(partAlphas);
    const hitAlpha = new AvatarHitAlpha();

    hitAlpha.capture(root);

    // The corner texel, mirrored, is the part's right column; the root's own position is ignored.
    assert.deepEqual(opaquePixels(hitAlpha.compose(8, 4, 1)), [ [ 0, 0, 255 ], [ 5, 1, 255 ] ]);
});

await test('composed at twice the size for a source at resolution 2', () => {
    const { root, partAlphas } = scene();
    const AvatarHitAlpha = load(partAlphas);
    const hitAlpha = new AvatarHitAlpha();

    hitAlpha.capture(root);

    assert.deepEqual(opaquePixels(hitAlpha.compose(16, 8, 2)).map(([ x, y ]) => [ x, y ]), [ [ 0, 0 ], [ 1, 0 ], [ 0, 1 ], [ 1, 1 ], [ 10, 2 ], [ 11, 2 ], [ 10, 3 ], [ 11, 3 ] ]);
});

await test('a part\'s alpha scales its pixels, and a copy keeps the frame the source was drawn with', () => {
    const { root, mirrored, partAlphas } = scene();
    const AvatarHitAlpha = load(partAlphas);
    const hitAlpha = new AvatarHitAlpha();

    mirrored.alpha = 0.5;
    hitAlpha.capture(root);

    const kept = hitAlpha.clone();

    // The next frame moves the mirrored part; the copy is a cached frame and must not follow.
    mirrored.alpha = 1;
    root.children[0].localTransform = new Matrix(1, 0, 0, 1, 6, 1);
    hitAlpha.capture(root);

    assert.deepEqual(opaquePixels(kept.compose(8, 4, 1)), [ [ 0, 0, 255 ], [ 5, 1, 127 ] ]);
    assert.deepEqual(opaquePixels(hitAlpha.compose(8, 4, 1)), [ [ 0, 0, 255 ], [ 7, 1, 255 ] ]);
});

await test('a part whose alpha cannot be read leaves the frame to the GPU readback', () => {
    const { root } = scene();
    const AvatarHitAlpha = load(new Map());
    const hitAlpha = new AvatarHitAlpha();

    hitAlpha.capture(root);

    assert.equal(hitAlpha.compose(8, 4, 1), undefined);
});

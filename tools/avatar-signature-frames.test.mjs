/**
 * `AvatarImage`'s key-less frames: a frame the full image cache has no key for (talking, dancing,
 * a turned head) is drawn once into its own texture and shown from there whenever the same parts
 * come back in the same places, a bounded number per image, each texture going back to the pool
 * exactly once - with a hit alpha that describes the texture shown, not the frame drawn last.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import { transpile } from './load-source.mjs';

// Pixi's own matrix maths, by file: the package's exports do not reach it.
const { Matrix } = await import(new URL('../node_modules/pixi.js/lib/maths/matrix/Matrix.mjs', import.meta.url).href);

class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    constructor(x = 0, y = 0, width = 0, height = 0) {
        Object.assign(this, { x, y, width, height });
    }
}

class Container {
    constructor() {
        this.children = [];
        this.parent = null;
        this.visible = true;
        this.alpha = 1;
        this.x = 0;
        this.y = 0;
        this.scale = { x: 1, y: 1 };
        this.filters = [];
        this.localTransform = new Matrix();
        this.position = { set: (x, y) => Object.assign(this, { x, y }) };
    }

    addChild(child) {
        child.parent?.removeChild(child);
        child.parent = this;
        this.children.push(child);

        return child;
    }

    removeChild(child) {
        this.children.splice(this.children.indexOf(child), 1);
        child.parent = null;
    }

    removeChildren() {
        for (const child of this.children) child.parent = null;

        this.children = [];
    }

    updateLocalTransform() {
        this.localTransform = new Matrix(this.scale.x, 0, 0, this.scale.y, this.x, this.y);
    }

    destroy() {}
}

class Sprite extends Container {
    constructor(texture) {
        super();
        this.texture = texture;
        this.tint = 0xFFFFFF;
        this.blendMode = 'normal';
        this.anchor = { x: 0, y: 0 };
    }
}

class Texture {
    static EMPTY = { frame: { x: 0, y: 0, width: 0, height: 0 }, orig: { width: 0, height: 0 } };

    constructor({ source, frame }) {
        this.source = source;
        this.frame = frame;
        this.width = frame.width;
        this.height = frame.height;
    }

    destroy() {}
}

class ActiveActionData {
    constructor(type, parameter = '', startFrame = 0) {
        Object.assign(this, { type, actionParameter: parameter, startFrame, definition: undefined, overridingAction: undefined });
    }
}

const transpileFile = file => transpile(readFileSync(new URL(file, import.meta.url), 'utf8'));

const run = (file, dependencies) => {
    const exports = {};

    runInNewContext(transpileFile(file), {
        exports,
        require: (name) => {
            assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);

            return dependencies[name];
        },
    });

    return exports;
};

/** What the room sees: every render, every pooled texture, what each was drawn with and the alpha providers. */
const load = () => {
    const created = [];
    const released = new Map();
    const renders = [];
    const drawn = new Map();
    const providers = new Map();
    const partAlphas = new Map();
    /** The part each body part shows this frame: `{ image, x, y, isCacheable }`. */
    const frame = {};

    const ExtendedSprite = {
        setAlphaProvider: (source, provider) => (provider ? providers.set(source, provider) : providers.delete(source)),
        removeHitmap: () => {},
        getFrameAlpha: texture => partAlphas.get(texture),
    };

    const TexturePool = {
        createRenderTexture: (width, height) => {
            const texture = { width, height, destroyed: false, source: { pixelWidth: width, pixelHeight: height, resolution: 1 } };

            texture.source.texture = texture;
            created.push(texture);

            return texture;
        },
        releaseTexture: (texture) => {
            released.set(texture, (released.get(texture) ?? 0) + 1);
            ExtendedSprite.setAlphaProvider(texture.source, undefined);
        },
    };

    // A frame as drawn: each part image where it went, and the set's filter.
    const describe = container => `${container.children.map(part => `${part.children[0].name}@${part.x},${part.y}`).join('|')}#${container.filters[0]?.name ?? ''}`;

    const renderer = {
        render: ({ target, container }) => {
            renders.push(target);
            drawn.set(target, describe(container));
        },
    };

    const pixi = { Container, Matrix, Point, Rectangle, Sprite, Texture };
    const { AvatarHitAlpha } = run('../packages/nitro-renderer/src/avatar/AvatarHitAlpha.ts', { 'pixi.js': pixi, '#renderer/utils': { ExtendedSprite } });

    const definitions = {
        Stand: { state: 'std', isMain: true, isAnimation: false, assetPartDefinition: 'std', geometryType: 'vertical' },
        Talk: { state: 'spk', isMain: false, isAnimation: false, assetPartDefinition: 'spk', geometryType: 'vertical' },
    };

    const structure = {
        getDefaultActionDefinition: () => definitions.Stand,
        isMainAvatarSet: setType => (setType === 'full'),
        getCanvas: () => ({ width: 90, height: 130, offset: new Point(), regPoint: new Point() }),
        getBodyParts: () => [ 'head', 'body' ],
        removeDynamicItems: () => {},
        sortActions: actions => actions.map(action => Object.assign(action, { definition: definitions[action.type] })),
        maxFrames: () => 2,
        getCanvasOffsets: () => [ 0, 0, 0 ],
        getActionDefinitionWithState: () => undefined,
        getAnimation: () => undefined,
    };

    class AvatarImageCache {
        setDirection() {}
        setGeometryType() {}
        setAction() {}
        resetBodyPartCache() {}
        disposeInactiveActions() {}
        dispose() {}
        reset() {}

        getImageContainer(bodyPart) {
            const part = frame[bodyPart];

            return part && { image: part.image, regPoint: new Point(part.x, part.y), isCacheable: part.isCacheable ?? true };
        }
    }

    // Every member of the enum is its own name.
    const AvatarActionStateType = new Proxy({}, { get: (_, key) => key });

    const { AvatarImage } = run('../packages/nitro-renderer/src/avatar/AvatarImage.ts', {
        '@nitrodevco/nitro-api': {
            AvatarActionStateType,
            AvatarBodyPartType: { Head: 'head' },
            AvatarDirectionAngle: { MIN_DIRECTION: 0, MAX_DIRECTION: 7 },
            AvatarScaleType: { Large: 'h', LargeToSmall: 'h_50', Small: 'sh' },
            AvatarSetType: { Full: 'full', Head: 'head' },
        },
        'pixi.js': pixi,
        '#renderer/utils': { ExtendedSprite, GetTickerTime: () => 0, TexturePool, TextureUtils: { getRenderer: () => renderer, createReducedTexture: () => undefined } },
        './actions': { ActiveActionData },
        './AvatarFigureContainer': { AvatarFigureContainer: class {} },
        './AvatarHitAlpha': { AvatarHitAlpha },
        './cache': { AvatarImageCache },
    });

    const avatar = new AvatarImage(structure, {}, {}, 'h');

    /** Stands, talking or not: talking is two actions, which the full image cache has no key for. */
    const act = (talking) => {
        avatar.initActionAppends();
        avatar.appendAction('Posture', 'Stand');

        if (talking) avatar.appendAction('Talk');

        avatar.endActionAppends();
    };

    /** The next animation frame with these parts, as the room sprite asks for it. */
    const show = (parts) => {
        Object.assign(frame, parts);
        avatar.updateAnimationByFrames(1);

        const texture = avatar.getImageWithCroppedTop('full', false);

        // The cropped view's source is a pooled render texture.
        return texture.source.texture;
    };

    return { AvatarImage, avatar, act, show, created, released, renders, drawn, providers, partAlphas };
};

/** A part image: one sprite of `texture` at `(x, y)` inside it. */
const partImage = (name, texture = { frame: { x: 0, y: 0, width: 2, height: 2 }, orig: { width: 2, height: 2 } }, x = 0, y = 0) => {
    const image = new Container();
    const sprite = new Sprite(texture);

    image.name = name;
    sprite.position.set(x, y);
    image.addChild(sprite);

    return image;
};

const body = partImage('body');
const closed = partImage('closed');
const open = partImage('open');

const bodyAt = { image: body, x: 10, y: 40 };
const mouth = image => ({ head: { image, x: 10, y: 5 }, body: bodyAt });

const releaseCounts = (created, released) => created.map(texture => released.get(texture) ?? 0);

await test('a talking avatar draws each mouth frame once and shows it again from its texture', () => {
    const { avatar, act, show, created, released, renders, drawn } = load();

    act(true);

    const shown = [];

    for (let i = 0; i < 8; i++) shown.push(show(mouth((i % 2) ? open : closed)));

    assert.equal(renders.length, 2, 'one offscreen pass per distinct frame');
    assert.equal(created.length, 2);
    assert.equal(released.size, 0, 'nothing goes back to the pool under the bound');

    for (let i = 0; i < 8; i++) {
        assert.equal(shown[i], shown[i % 2], 'the same parts show the same texture');
        assert.equal(drawn.get(shown[i]), `body@10,40|${(i % 2) ? 'open' : 'closed'}@10,5#`, 'the texture shown holds the frame asked for');
    }

    assert.equal(avatar._topCropY, 5, 'the crop is the frame\'s own');

    avatar.dispose();

    assert.deepEqual(releaseCounts(created, released), [ 1, 1 ]);
});

await test('a part not ready yet is drawn in place every time, never kept', () => {
    const { avatar, act, show, created, released, renders } = load();

    act(true);

    for (let i = 0; i < 4; i++) show({ head: { image: closed, x: 10, y: 5, isCacheable: false }, body: bodyAt });

    assert.equal(renders.length, 4);
    assert.equal(created.length, 1, 'drawn over in one texture');
    assert.equal(avatar._signatureFrames.size, 0);

    avatar.dispose();

    assert.deepEqual(releaseCounts(created, released), [ 1 ]);
});

await test('past the bound the least recently shown frame goes back to the pool, each texture exactly once', () => {
    const { AvatarImage, avatar, act, show, created, released, renders } = load();
    const max = AvatarImage.MAX_SIGNATURE_FRAMES;
    const heads = Array.from({ length: max + 6 }, (_, i) => partImage(`head${i}`));
    const textureOf = new Map();
    const showHead = (i) => {
        const texture = show(mouth(heads[i]));

        if (!textureOf.has(i)) textureOf.set(i, texture);

        assert.equal(texture, textureOf.get(i), `frame ${i} shows its own texture`);

        return texture;
    };

    act(true);

    for (let i = 0; i < max; i++) showHead(i);

    assert.equal(renders.length, max);
    assert.equal(released.size, 0);

    // Shown again: the most recently used, so the next evictions pass it by.
    showHead(0);

    assert.equal(renders.length, max);

    for (let i = max; i < max + 6; i++) {
        const shown = showHead(i);

        assert.equal(released.get(shown), undefined, 'the frame shown is never let go');
    }

    assert.equal(renders.length, max + 6);
    assert.equal(avatar._signatureFrames.size, max);
    assert.deepEqual([ ...released.values() ], [ 1, 1, 1, 1, 1, 1 ]);

    for (let i = 1; i <= 6; i++) assert.equal(released.get(textureOf.get(i)), 1, `frame ${i}, the oldest, went back`);

    assert.equal(released.get(textureOf.get(0)), undefined, 'the frame shown again stayed');

    showHead(0);

    assert.equal(renders.length, max + 6, 'and is still shown without a render');

    avatar.dispose();

    assert.ok(releaseCounts(created, released).every(count => count === 1), 'every texture back in the pool exactly once');
});

await test('a reset gives every kept frame back once and draws again from scratch', () => {
    const { avatar, act, show, created, released, renders } = load();

    act(true);
    show(mouth(closed));
    show(mouth(open));
    avatar.resetCache();

    assert.deepEqual(releaseCounts(created, released), [ 1, 1 ], 'the frame shown included, once');

    act(true);
    show(mouth(closed));

    assert.equal(renders.length, 3);

    avatar.dispose();

    assert.deepEqual(releaseCounts(created, released), [ 1, 1, 1 ]);
});

await test('an image drawn in place goes back to the pool when a kept frame replaces it, and the other way round', () => {
    const { avatar, act, show, created, released, providers } = load();
    const notReady = { head: { image: closed, x: 10, y: 5, isCacheable: false }, body: bodyAt };

    act(true);

    const inPlace = show(notReady);
    const kept = show(mouth(open));

    assert.equal(released.get(inPlace), 1, 'the image drawn in place went back');
    assert.equal(released.get(kept), undefined);

    const inPlaceAgain = show(notReady);

    assert.notEqual(inPlaceAgain, kept, 'a kept texture is never drawn over');
    assert.ok(providers.has(kept.source), 'and keeps its alpha');

    assert.equal(show(mouth(open)), kept);
    assert.equal(released.get(inPlaceAgain), 1);

    // Stopping talking for a frame the full image cache has a key for, shown from there.
    show(notReady);
    act(false);
    show(mouth(closed));

    const keyed = created[created.length - 1];

    assert.equal(show(mouth(closed)), keyed, 'the keyed frame is shown again');

    avatar.dispose();

    assert.ok(releaseCounts(created, released).every(count => count === 1), 'every texture back in the pool exactly once');
});

await test('a keyed frame takes over a key-less frame of the same parts, and the other way round, without drawing', () => {
    const { avatar, act, show, created, released, renders } = load();

    act(true);

    const talking = show(mouth(closed));

    act(false);

    const standing = show(mouth(closed));

    assert.equal(standing, talking, 'the same parts, the same texture');
    assert.equal(renders.length, 1);
    assert.equal(avatar._signatureFrames.size, 0, 'the key owns it now');
    assert.equal(avatar.getFullImage(avatar.getFullImageCacheKey()).texture, talking);

    // A keyed frame first: talking with the same parts shows it and keeps no copy.
    const keyedOpen = show(mouth(open));

    act(true);

    assert.equal(show(mouth(open)), keyedOpen);
    assert.equal(renders.length, 2);
    assert.equal(avatar._signatureFrames.size, 0);

    avatar.dispose();

    assert.deepEqual(releaseCounts(created, released), [ 1, 1 ]);
});

await test('an effect\'s image filter makes a frame of its own', () => {
    const { avatar, act, show, renders, drawn } = load();
    const filter = { name: 'palette' };

    act(true);

    const plain = show(mouth(closed));

    avatar._avatarSpriteData = { imageFilter: filter };

    const filtered = show(mouth(closed));

    assert.notEqual(filtered, plain);
    assert.equal(drawn.get(filtered), 'body@10,40|closed@10,5#palette');

    avatar._avatarSpriteData = undefined;

    assert.equal(show(mouth(closed)), plain);

    avatar._avatarSpriteData = { imageFilter: filter };

    assert.equal(show(mouth(closed)), filtered);
    assert.equal(renders.length, 2);
});

await test('the hit alpha of a frame shown again describes that frame, not the one drawn last', () => {
    const { avatar, act, show, providers, partAlphas } = load();
    const solid = { frame: { x: 0, y: 0, width: 2, height: 2 }, orig: { width: 2, height: 2 } };
    const corner = { frame: { x: 0, y: 0, width: 2, height: 2 }, orig: { width: 2, height: 2 } };
    const opposite = { frame: { x: 0, y: 0, width: 2, height: 2 }, orig: { width: 2, height: 2 } };

    partAlphas.set(solid, { alpha: new Uint8Array([ 255, 255, 255, 255 ]), width: 2, height: 2 });
    partAlphas.set(corner, { alpha: new Uint8Array([ 255, 0, 0, 0 ]), width: 2, height: 2 });
    partAlphas.set(opposite, { alpha: new Uint8Array([ 0, 0, 0, 255 ]), width: 2, height: 2 });

    const frameOf = head => ({ head: { image: head, x: 10, y: 5 }, body: { image: partImage('torso', solid), x: 10, y: 40 } });
    const closedFrame = frameOf(partImage('closed', corner));
    const openFrame = frameOf(partImage('open', opposite));
    const opaque = (texture) => {
        const { alpha, width } = providers.get(texture.source)();

        return [ ...alpha ].flatMap((value, index) => (value ? [ `${index % width},${Math.trunc(index / width)}` ] : [])).join(' ');
    };
    const torso = '10,40 11,40 10,41 11,41';

    act(true);

    const openTexture = show(openFrame);
    const closedTexture = show(closedFrame);

    // Shown again after the closed mouth was drawn: its alpha is still the open mouth's.
    assert.equal(show(openFrame), openTexture);
    assert.equal(opaque(openTexture), `11,6 ${torso}`);
    assert.equal(opaque(closedTexture), `10,5 ${torso}`);

    assert.equal(show(closedFrame), closedTexture);
    assert.equal(opaque(closedTexture), `10,5 ${torso}`);

    avatar.dispose();

    assert.equal(providers.size, 0, 'a texture back in the pool has no alpha left');
});

/**
 * `AvatarImageDirectionCache` keys a frame by every part's `getCacheableKey`, which reads only the
 * frame within the part's own cycle. The key cache is kept by the frame within the parts' common
 * cycle, so the avatar's ever-growing frame counter neither changes a key nor grows the cache.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const avatarRoot = new URL('../packages/nitro-renderer/src/avatar/', import.meta.url);
const cache = new Map();

const loadFile = (url, stubs) => {
    if (cache.has(url.href)) return cache.get(url.href);

    const source = readFileSync(url, 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};

    cache.set(url.href, exports);

    runInNewContext(outputText, { exports, require: (name) => {
        if (Object.hasOwn(stubs, name)) return stubs[name]();

        assert.ok(name.startsWith('.'), `Unexpected dependency: ${name}`);

        const file = new URL(`${name}.ts`, url);

        return loadFile(existsSync(file) ? file : new URL(`${name}/index.ts`, url), stubs);
    } });

    return exports;
};

const stubs = {
    '@nitrodevco/nitro-api': () => ({ AvatarFigurePartType: { Eyes: 'ey' } }),
    './structure': () => loadFile(new URL('structure/animation/AvatarAnimationFrame.ts', avatarRoot), stubs),
    '../AvatarImageBodyPartContainer': () => ({ AvatarImageBodyPartContainer: class {} }),
};

const { AvatarImageDirectionCache } = loadFile(new URL('cache/AvatarImageDirectionCache.ts', avatarRoot), stubs);
const { AvatarImagePartContainer } = loadFile(new URL('AvatarImagePartContainer.ts', avatarRoot), stubs);
const { AvatarAnimationFrame } = loadFile(new URL('structure/animation/AvatarAnimationFrame.ts', avatarRoot), stubs);

/** A part cycling through `count` frames; every other one an animation frame with its own asset part. */
const part = (id, count) => {
    const frames = [];

    for (let i = 0; i < count; i++) frames.push((i % 2) ? new AvatarAnimationFrame({ number: (i * 3) % 5, assetPartDefinition: `ap${i % 3}` }) : i);

    return new AvatarImagePartContainer('bd', 'bd', id, undefined, frames, {}, false, -1);
};

/** Flash's key: every part's key at the frame itself, joined. */
const flashKey = (parts, frame) => parts.map(p => p.getCacheableKey(frame)).join('/');

const lists = {
    'one 8-frame part': [ part('1', 8) ],
    'parts of 1, 3 and 8 frames': [ part('1', 1), part('2', 3), part('3', 8) ],
    'parts without frames': [ part('1', 0), part('2', 4) ],
    'parts of 5 and 7 frames': [ part('1', 5), part('2', 7) ],
    'a cycle past the limit (11, 13, 17)': [ part('1', 11), part('2', 13), part('3', 17) ],
};

for (const [ name, parts ] of Object.entries(lists)) {
    await test(`keys match Flash's for ${name}, negative frames included`, () => {
        const directionCache = new AvatarImageDirectionCache(parts);

        for (let frame = -60; frame < 6000; frame++) assert.equal(directionCache.getCacheKey(frame), flashKey(parts, frame), `frame ${frame}`);
    });
}

await test('the key cache stays within the cycle as the frame counter grows', () => {
    const parts = lists['parts of 1, 3 and 8 frames'];
    const directionCache = new AvatarImageDirectionCache(parts);

    for (let frame = 0; frame < 100000; frame++) directionCache.getCacheKey(frame);

    assert.equal(directionCache._keyCache.size, 24);
});

await test('a cycle past the limit still keeps the key cache bounded', () => {
    const directionCache = new AvatarImageDirectionCache(lists['a cycle past the limit (11, 13, 17)']);

    for (let frame = 0; frame < 100000; frame++) directionCache.getCacheKey(frame);

    assert.ok(directionCache._keyCache.size <= 1024, `size ${directionCache._keyCache.size}`);
});

await test('an image stored at a frame is found a whole cycle later', () => {
    const directionCache = new AvatarImageDirectionCache(lists['parts of 5 and 7 frames']);
    const image = { dispose() {} };

    directionCache.updateImageContainer(image, 3);

    assert.equal(directionCache.getImageContainer(3 + 35 * 1000), image);
    assert.equal(directionCache.getImageContainer(4), undefined);
});

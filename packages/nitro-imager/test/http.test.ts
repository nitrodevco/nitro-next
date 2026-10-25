import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { createCanvas, loadImage } from '@napi-rs/canvas';
import { AvatarActionStateType, AvatarGenderType } from '@nitrodevco/nitro-api';

import { AVATAR_REQUEST_TOKENS, AvatarRenderRequest, AvatarRequestError, parseAvatarRequest } from '../src/avatar/avatarRequest';
import { createApp } from '../src/http/createApp';
import { ImageCache } from '../src/http/ImageCache';
import { encodeImage } from '../src/output/encodeImage';

void describe('parseAvatarRequest', () => {
    void it('reads Habbo imaging parameters', () => {
        const request = parseAvatarRequest({
            figure: 'hd-180-1.ch-210-66', gender: 'f', size: 'l', direction: '4', head_direction: '3',
            action: 'sit,wav,crr=6', gesture: 'sml', headonly: '1', img_format: 'gif',
        });

        assert.equal(request.gender, AvatarGenderType.Female);
        assert.equal(request.size, 'l');
        assert.equal(request.direction, 4);
        assert.equal(request.headDirection, 3);
        assert.equal(request.headOnly, true);
        assert.equal(request.posture, AvatarActionStateType.Sit);
        assert.equal(request.format, 'gif');
        assert.deepEqual(request.actions, [
            { action: AvatarActionStateType.Wave },
            { action: AvatarActionStateType.CarryObject, parameter: 6 },
            { action: AvatarActionStateType.Gesture, parameter: AvatarActionStateType.Smile },
        ]);
    });

    void it('defaults to a standing male facing direction 2, head along with the body', () => {
        const request = parseAvatarRequest({ figure: 'hd-180-1', direction: '5' });

        assert.equal(request.gender, AvatarGenderType.Male);
        assert.equal(request.posture, AvatarActionStateType.Stand);
        assert.equal(request.headDirection, 5);
        assert.equal(request.format, 'png');
        assert.equal(parseAvatarRequest({ figure: 'hd-180-1' }).direction, 2);
    });

    void it('takes spk and eyb as talking and eyes shut, and the room’s dance and effect', () => {
        const request = parseAvatarRequest({ figure: 'hd-180-1', gesture: 'eyb', dance: '2', effect: '4', animate: '1' });

        assert.deepEqual(request.actions, [ { action: AvatarActionStateType.Sleep }, { action: AvatarActionStateType.Dance, parameter: 2 } ]);
        assert.equal(request.effect, 4);
        assert.equal(request.format, 'gif');
        assert.equal(request.crop, false);
        assert.equal(parseAvatarRequest({ figure: 'hd-180-1', crop: '1' }).crop, true);
        assert.deepEqual(parseAvatarRequest({ figure: 'hd-180-1', gesture: 'spk' }).actions, [ { action: AvatarActionStateType.Talk } ]);
    });

    void it('refuses what it cannot draw rather than guessing', () => {
        for (const query of [
            {},
            { figure: 'hd-180-1;drop' },
            { figure: 'hd-180-1', direction: '8' },
            { figure: 'hd-180-1', action: 'fly' },
            { figure: 'hd-180-1', gesture: 'xyz' },
            { figure: 'hd-180-1', size: 'xl' },
            { figure: 'hd-180-1', animate: '1', img_format: 'png' },
            { figure: 'hd-180-1', dance: '9' },
        ]) assert.throws(() => parseAvatarRequest(query), AvatarRequestError, JSON.stringify(query));
    });
});

void describe('encodeImage', () => {
    void it('writes a gif with the frame’s exact colours and one-bit transparency', async () => {
        const canvas = createCanvas(4, 4);
        const context = canvas.getContext('2d');

        context.fillStyle = '#123456';
        context.fillRect(0, 0, 2, 2);
        context.fillStyle = 'rgba(250, 10, 20, 0.6)';
        context.fillRect(2, 2, 2, 2);

        const gif = await encodeImage([ canvas ], 'gif');
        const decoded = await loadImage(gif);
        const check = createCanvas(4, 4);

        check.getContext('2d').drawImage(decoded, 0, 0);

        const data = check.getContext('2d').getImageData(0, 0, 4, 4).data;

        assert.equal(gif.subarray(0, 6).toString(), 'GIF89a');
        assert.deepEqual([ ...data.subarray(0, 4) ], [ 0x12, 0x34, 0x56, 255 ]);
        assert.equal(data[(2 * 4) + 3], 0);
        // 60% opaque reads as drawn, at full opacity, in its colour unpremultiplied.
        assert.equal(data[(((3 * 4) + 3) * 4) + 3], 255);
    });
});

void describe('ImageCache', () => {
    void it('drops the least recently used past its size, and shares a drawing in progress', async () => {
        const cache = new ImageCache(10);
        let draws = 0;
        const draw = (size: number) => () => {
            draws++;

            return Promise.resolve({ image: Buffer.alloc(size), complete: true });
        };

        await Promise.all([ cache.get('a', draw(4)), cache.get('a', draw(4)) ]);
        assert.equal(draws, 1);

        await cache.get('b', draw(4));
        await cache.get('a', draw(4));
        await cache.get('c', draw(4));

        assert.equal(cache.size, 2);
        assert.equal(cache.bytes, 8);

        await cache.get('b', draw(4));
        assert.equal(draws, 4, 'b was the least recently used, so it was dropped');
    });

    void it('hands an incomplete image over without keeping it', async () => {
        const cache = new ImageCache(100);
        let draws = 0;
        const draw = () => {
            draws++;

            return Promise.resolve({ image: Buffer.alloc(4), complete: false });
        };

        assert.equal((await cache.get('a', draw))?.complete, false);
        await cache.get('a', draw);

        assert.equal(draws, 2);
        assert.equal(cache.size, 0);
    });
});

void describe('createApp', () => {
    const rendered: AvatarRenderRequest[] = [];
    const app = createApp({
        avatars: {
            render: (request: AvatarRenderRequest) => {
                rendered.push(request);

                // A figure with a set the figure data does not have draws, without it.
                return Promise.resolve({ frames: [ createCanvas(3, 5) ], missing: request.figure.includes('hr-99999') ? [ 'hr-99999' ] : [] });
            },
            loadedLibraries: 7,
        },
        badges: {
            render: (code: string) => Promise.resolve({
                canvas: code.startsWith('b01010') ? createCanvas(39, 39) : undefined,
                missing: (code === 'b01010') ? [] : [ 'symbol 99 colour 1' ],
            }),
            table: { version: 'v1' },
        },
        cache: new ImageCache(1024 * 1024),
        avatarFrameDelay: 80,
        roomObjectFrameDelay: 41,
    });

    void it('serves an avatar at /avatar and /avatarimage, here and under /habbo-imaging, drawing it once', async () => {
        const responses = await Promise.all([ '/avatar', '/avatarimage', '/habbo-imaging/avatar', '/habbo-imaging/avatarimage' ]
            .map(path => Promise.resolve(app.request(`${path}?figure=hd-180-1&direction=3`))));

        for (const response of responses) assert.equal(response.status, 200);

        assert.equal(responses[0].headers.get('content-type'), 'image/png');
        assert.equal(responses[0].headers.get('access-control-allow-origin'), '*');
        assert.equal(rendered.length, 1);
    });

    void it('serves an avatar missing a part uncached and marked so, and draws it again next time', async () => {
        const before = rendered.length;
        const first = await app.request('/avatarimage?figure=hd-180-1.hr-99999');
        const second = await app.request('/avatarimage?figure=hd-180-1.hr-99999');

        assert.equal(first.status, 200);
        assert.equal(first.headers.get('cache-control'), 'no-store');
        assert.equal(second.headers.get('cache-control'), 'no-store');
        assert.equal(rendered.length - before, 2);
    });

    void it('reports what it holds and how much memory it uses', async () => {
        const health = await (await app.request('/health')).json() as { avatarLibraries: number; memory: { rss: number } };

        assert.equal(health.avatarLibraries, 7);
        assert.ok(health.memory.rss > 0);
    });

    void it('answers a bad avatar request with 400 and why', async () => {
        const response = await app.request('/avatarimage?figure=hd-180-1&direction=9');

        assert.equal(response.status, 400);
        assert.match(await response.text(), /direction/);
    });

    void it('serves a badge as gif or png, and 404s one with nothing to draw', async () => {
        const gif = await app.request('/habbo-imaging/badge/b01010.gif');
        const png = await app.request('/badge/b01010.png');

        assert.equal(gif.status, 200);
        assert.equal(gif.headers.get('content-type'), 'image/gif');
        assert.equal(png.headers.get('content-type'), 'image/png');
        assert.match(gif.headers.get('cache-control') ?? '', /max-age/);
        assert.equal((await app.request('/badge/b01010s99010.gif')).headers.get('cache-control'), 'no-store');
        assert.equal((await app.request('/badge/s99990.gif')).status, 404);
        assert.equal((await app.request('/badge/b01010.jpg')).status, 400);
    });

    void it('lists every request, parameter and accepted name on its index page, here and under /habbo-imaging', async () => {
        for (const path of [ '/', '/habbo-imaging/' ]) {
            const response = await app.request(path);
            const page = await response.text();

            assert.equal(response.status, 200);
            assert.match(response.headers.get('content-type') ?? '', /text\/html/);

            for (const name of [ 'figure', 'gender', 'size', 'direction', 'head_direction', 'headonly', 'action', 'gesture', 'dance', 'effect', 'frame_num', 'animate', 'img_format', '/badge/', '/health' ]) {
                assert.ok(page.includes(name), `${path} names ${name}`);
            }

            for (const token of Object.values(AVATAR_REQUEST_TOKENS).flat()) assert.ok(page.includes(`<code>${token}</code>`), `${path} lists ${token}`);
        }
    });
});

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { createCanvas } from '@napi-rs/canvas';

import { parseFurnitureRequest } from '../src/furniture/furnitureRequest';
import { createApp } from '../src/http/createApp';
import { ImageCache } from '../src/http/ImageCache';
import { RequestError } from '../src/http/RequestError';
import { parsePetRequest, PetRenderRequest } from '../src/pet/petRequest';
import { loopLength } from '../src/room/drawRoomObject';

void describe('parsePetRequest', () => {
    void it('reads a pet figure string, custom parts and all', () => {
        const request = parsePetRequest({ figure: '15 2 ffffff 2 2 -1 0 3 -1 0', direction: '4' });

        assert.equal(request.type, 15);
        assert.equal(request.paletteId, 2);
        assert.equal(request.color, 0xffffff);
        assert.deepEqual(request.parts, [ { layerId: 2, partId: -1, paletteId: 0 }, { layerId: 3, partId: -1, paletteId: 0 } ]);
        assert.equal(request.direction, 4);
        assert.equal(request.headDirection, 4);
        assert.equal(request.format, 'png');
    });

    void it('takes a type by number or name, with palette, colour, posture and gesture', () => {
        const request = parsePetRequest({ type: 'Dog', palette: '3', color: '#ff0000', posture: 'SIT', gesture: 'sml', animate: '1' });

        assert.equal(request.type, 'dog');
        assert.equal(request.paletteId, 3);
        assert.equal(request.color, 0xff0000);
        assert.equal(request.posture, 'sit');
        assert.equal(request.gesture, 'sml');
        assert.equal(request.format, 'gif');
        assert.equal(parsePetRequest({ type: '0' }).type, 0);
        assert.equal(parsePetRequest({ type: 'dog' }).posture, '', 'the pet\'s own default posture');
    });

    void it('refuses what it cannot read rather than guessing', () => {
        for (const query of [
            {},
            { figure: '0 0' },
            { figure: '0 0 ffffff 2 1 2 3' },
            { type: 'dog;drop' },
            { type: 'dog', color: 'red' },
            { type: 'dog', direction: '8' },
            { type: 'dog', posture: 'not a posture' },
            { type: 'dog', animate: '1', img_format: 'png' },
        ]) {
            assert.throws(() => parsePetRequest(query), RequestError, JSON.stringify(query));
        }
    });
});

void describe('parseFurnitureRequest', () => {
    void it('reads a class name with its colour, or a floor or wall id', () => {
        const request = parseFurnitureRequest({ name: 'Rare_DragonLamp*4', state: '1', size: 'l' });

        assert.equal(request.name, 'rare_dragonlamp*4');
        assert.equal(request.id, -1);
        assert.equal(request.state, 1);
        assert.equal(request.size, 'l');
        assert.deepEqual([ parseFurnitureRequest({ id: '4011', wall: '1' }).id, parseFurnitureRequest({ id: '4011', wall: '1' }).wall ], [ 4011, true ]);
    });

    void it('refuses a request with no item, or one it cannot read', () => {
        for (const query of [ {}, { name: 'throne;drop' }, { name: 'lamp*x' }, { id: '-1' }, { name: 'throne', state: '-2' } ]) {
            assert.throws(() => parseFurnitureRequest(query), RequestError, JSON.stringify(query));
        }
    });
});

void describe('loopLength', () => {
    void it('finds the shortest loop the frames repeat in', () => {
        assert.equal(loopLength([ 'a', 'a', 'a', 'a' ]), 1);
        assert.equal(loopLength([ 'a', 'b', 'c', 'a', 'b', 'c', 'a' ]), 3);
        // A frame shown for two steps is two frames of the loop, not its end.
        assert.equal(loopLength([ 'a', 'a', 'b', 'a', 'a', 'b', 'a', 'a' ]), 3);
    });

    void it('cuts an animation that never comes round at the most frames', () => {
        assert.equal(loopLength(Array.from({ length: 128 }, (_, i) => `${i}`)), 64);
    });
});

void describe('createApp pets and furniture', () => {
    const drawn: PetRenderRequest[] = [];
    const services = {
        avatars: { render: () => Promise.resolve({ frames: [ createCanvas(2, 2) ], missing: [] }), loadedLibraries: 0 },
        badges: { render: () => Promise.resolve({ canvas: undefined, missing: [] }), table: { version: 'v1' } },
        cache: new ImageCache(1024 * 1024),
        avatarFrameDelay: 80,
        roomObjectFrameDelay: 41,
    };
    const app = createApp({
        ...services,
        pets: {
            render: (request: PetRenderRequest) => {
                drawn.push(request);

                if (request.posture === 'fly') throw new RequestError('posture fly is not one the dog has: std, sit');
                if (request.type === 'unicorn') throw new RequestError('unicorn is not a pet type', 404);

                return Promise.resolve({ frames: [ createCanvas(40, 36), createCanvas(40, 36) ], missing: [] });
            },
            types: [ 'dog', 'cat' ],
        },
        furniture: {
            render: request => (request.name === 'throne') ? Promise.resolve({ frames: [ createCanvas(48, 80) ], missing: [] }) : Promise.reject(new RequestError(`${request.name} is not in the furnidata`, 404)),
            itemCount: { floor: 2, wall: 1 },
        },
    });

    void it('serves a pet at /pet and under /habbo-imaging, drawing it once, cacheable for a day', async () => {
        const [ first, second ] = await Promise.all([ app.request('/pet?type=dog&animate=1'), app.request('/habbo-imaging/pet?type=dog&animate=1') ]);

        assert.equal(first.status, 200);
        assert.equal(first.headers.get('content-type'), 'image/gif');
        assert.equal(first.headers.get('cache-control'), 'public, max-age=86400');
        assert.equal(second.status, 200);
        assert.equal(drawn.length, 1);
    });

    void it('answers a pet it cannot draw with why: 400 for a posture it has not, 404 for a type there is not', async () => {
        const posture = await app.request('/pet?type=dog&posture=fly');
        const type = await app.request('/pet?type=unicorn');

        assert.equal(posture.status, 400);
        assert.match(await posture.text(), /std, sit/);
        assert.equal(type.status, 404);
        assert.equal((await app.request('/pet?type=dog&direction=9')).status, 400);
    });

    void it('serves a furniture, and 404s one the furnidata has not', async () => {
        const throne = await app.request('/furni?name=throne');

        assert.equal(throne.status, 200);
        assert.equal(throne.headers.get('content-type'), 'image/png');
        assert.equal((await app.request('/furni?name=not_a_thing')).status, 404);
        assert.equal((await app.request('/furni')).status, 400);
    });

    void it('says so when pets or furniture are not set up, and counts them in /health', async () => {
        const bare = createApp(services);
        const pet = await bare.request('/pet?type=dog');
        const health = await (await app.request('/health')).json() as { petTypes: number; furniture: { floor: number; wall: number } };

        assert.equal(pet.status, 404);
        assert.match(await pet.text(), /no pet bundles/);
        assert.equal((await bare.request('/furni?name=throne')).status, 404);
        assert.equal(health.petTypes, 2);
        assert.deepEqual(health.furniture, { floor: 2, wall: 1 });
    });

    void it('lists the pet types and both sections on the index page, and says when they are off', async () => {
        const page = await (await app.request('/')).text();
        const barePage = await (await createApp(services).request('/')).text();

        for (const name of [ 'id="pet"', 'id="furni"', '0&nbsp;dog', '1&nbsp;cat', 'pet-form', 'furni-form', 'state', 'posture' ]) assert.ok(page.includes(name), name);

        assert.ok(barePage.includes('This imager draws no pets'));
        assert.ok(barePage.includes('This imager draws no furniture'));
        assert.ok(!barePage.includes('pet-form'));
    });
});

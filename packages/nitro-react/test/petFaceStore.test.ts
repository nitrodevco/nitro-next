import assert from 'node:assert/strict';
import { test } from 'node:test';

import { createPetFaceStore, PetFaceListener } from '../src/hooks/room/chat/petFaceStore';

interface Face {
    name: string;
}

const KEY = '0 0 FFFFFF 0|std|32|2|head';

/** A store whose `store` / `free` calls are recorded, and a render that answers the way the room engine does. */
const setup = () => {
    const stored: string[] = [];
    const freed: string[] = [];
    const store = createPetFaceStore<Face>(64, (_key, face) => stored.push(face.name), (_key, face) => freed.push(face.name));
    let listener: PetFaceListener<Face> | undefined = undefined;
    let renders = 0;

    /** `getGenericRoomObjectTexture`: draws `face` now, and keeps the listener for a pet still downloading. */
    const render = (face: Face | undefined) => (next: PetFaceListener<Face>) => {
        renders++;
        listener = next;

        return Promise.resolve(face);
    };

    return { store, stored, freed, render, listener: () => listener, renders: () => renders };
};

const settle = () => new Promise(resolve => setTimeout(resolve, 0));

// The case: a pet that barked as its owner walked in was drawn while its library downloaded, and the
// chat bubble kept the engine's placeholder - a white, uncoloured 49x38 shape - for the whole session.
void test('a pet drawn while it downloads is replaced by the finished render, and watchers are told', async () => {
    const { store, stored, freed, render, listener } = setup();
    let changes = 0;

    store.watch(KEY, () => changes++);
    store.request(KEY, render({ name: 'placeholder' }));
    await settle();

    assert.equal(store.get(KEY)?.name, 'placeholder');
    assert.equal(changes, 1);

    listener()?.textureReady({ name: 'head' });

    assert.equal(store.get(KEY)?.name, 'head');
    assert.equal(changes, 2);
    assert.deepEqual(stored, [ 'placeholder', 'head' ]);
    // Nothing showed the placeholder, so it goes at once.
    assert.deepEqual(freed, [ 'placeholder' ]);
});

void test('a placeholder still on screen is freed only once its bubble lets it go', async () => {
    const { store, freed, render, listener } = setup();

    store.request(KEY, render({ name: 'placeholder' }));
    await settle();

    const shown = store.get(KEY)!;

    store.retain(shown);
    listener()?.textureReady({ name: 'head' });

    assert.equal(store.get(KEY)?.name, 'head');
    assert.deepEqual(freed, []);

    store.release(shown);

    assert.deepEqual(freed, [ 'placeholder' ]);
});

void test('a pet already loaded is cached as drawn and not drawn again', async () => {
    const { store, render, renders } = setup();

    store.request(KEY, render({ name: 'head' }));
    store.request(KEY, render({ name: 'head' }));
    await settle();
    store.request(KEY, render({ name: 'head' }));

    assert.equal(store.get(KEY)?.name, 'head');
    assert.equal(renders(), 1);
});

void test('a finished render that arrives before the first one settles is kept, and the placeholder freed', async () => {
    const { store, freed, render, listener } = setup();

    store.request(KEY, render({ name: 'placeholder' }));
    listener()?.textureReady({ name: 'head' });
    await settle();

    assert.equal(store.get(KEY)?.name, 'head');
    assert.deepEqual(freed, [ 'placeholder' ]);
});

void test('a finished pet that draws nothing drops the placeholder, so the next to ask draws it again', async () => {
    const { store, freed, render, listener, renders } = setup();
    let changes = 0;

    store.watch(KEY, () => changes++);
    store.request(KEY, render({ name: 'placeholder' }));
    await settle();
    listener()?.imageFailed();

    assert.equal(store.get(KEY), undefined);
    assert.equal(changes, 2);
    assert.deepEqual(freed, [ 'placeholder' ]);

    store.request(KEY, render(undefined));

    assert.equal(renders(), 2);
});

void test('an unwatched key is not told of later changes', async () => {
    const { store, render, listener } = setup();
    let changes = 0;

    const unwatch = store.watch(KEY, () => changes++);

    store.request(KEY, render({ name: 'placeholder' }));
    await settle();
    unwatch();
    listener()?.textureReady({ name: 'head' });

    assert.equal(changes, 1);
});

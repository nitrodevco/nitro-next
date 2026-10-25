import assert from 'node:assert/strict';
import { test } from 'node:test';

import { createClientModuleChannels } from '../src/commands/client-modules/clientModuleChannels';

const quiet = () => undefined;

// The case that needed it: one module hands another the promo articles; they went as `<prefix>/promo/<url-encoded json>` links.
void test('a module that subscribes after the publisher is handed the kept value at once, then each new one, with who sent it', () => {
    const channels = createClientModuleChannels(quiet);
    const seen: unknown[] = [];

    channels.publish('community', 'promo.articles', [ { id: 1 } ]);
    channels.subscribe('view', 'promo.articles', (value, from) => seen.push([ value, from ]));
    channels.publish('community', 'promo.articles', [ { id: 2 } ]);

    assert.deepEqual(seen, [ [ [ { id: 1 } ], 'community' ], [ [ { id: 2 } ], 'community' ] ]);
});

void test('a stopped module\'s values are cleared for their subscribers and its own subscriptions go', () => {
    const channels = createClientModuleChannels(quiet);
    const seen: unknown[] = [];
    let publisherSaw = 0;

    channels.subscribe('community', 'other', () => publisherSaw++);
    channels.publish('community', 'promo.articles', [ 1 ]);
    channels.subscribe('view', 'promo.articles', value => seen.push(value));
    channels.removeOwner('community');
    channels.publish('extras', 'other', 1);

    assert.deepEqual(seen, [ [ 1 ], undefined ]);
    assert.equal(channels.get('promo.articles'), undefined);
    assert.equal(publisherSaw, 0);
});

void test('a subscriber that throws is reported and the others are still handed the value', () => {
    const errors: string[] = [];
    const channels = createClientModuleChannels(owner => errors.push(owner));
    let handed = 0;

    channels.subscribe('broken', 'k', () => {
        throw new Error('x');
    });
    channels.subscribe('fine', 'k', () => handed++);
    channels.publish('a', 'k', 1);

    assert.deepEqual([ errors, handed ], [ [ 'broken' ], 1 ]);
});

import assert from 'node:assert/strict';
import { test } from 'node:test';

import type { ITurboCapability } from '@nitrodevco/nitro-packets';

import { createClientModuleCapabilities } from '../src/commands/client-modules/clientModuleCapabilities';

const CORE: ITurboCapability[] = [ { name: 'permission.nodes', version: 1 }, { name: 'client.modules', version: 1 } ];
const CORE_SENT = 'permission.nodes@1,client.modules@1';

/** The capabilities started on a fake connection: each request as text, the scheduled asks run by hand. */
const setup = () => {
    const pending: (() => void)[] = [];
    const sent: string[] = [];
    const capabilities = createClientModuleCapabilities(flush => pending.push(flush));
    const runScheduled = () => pending.splice(0).forEach(flush => flush());

    capabilities.start(list => sent.push(list.map(capability => `${capability.name}@${capability.version}`).join(',')), CORE);

    return { capabilities, sent, runScheduled };
};

// The case that needed it: the client asked once, before any module ran, so a module's own extension never reached the server.
void test('the capabilities modules name while they start are asked for once, with the client\'s own, after all of them ran', () => {
    const { capabilities, sent, runScheduled } = setup();
    const release = capabilities.hold();

    capabilities.declare('portals', 'portals.view', 1);
    capabilities.declare('radio', 'radio.stream', 2);
    runScheduled();

    assert.deepEqual(sent, [ CORE_SENT ]);

    release();

    assert.deepEqual(sent, [ CORE_SENT, `${CORE_SENT},portals.view@1,radio.stream@2` ]);
});

void test('a stopped module\'s names leave the next request; a list that did not change is never sent again', () => {
    const { capabilities, sent, runScheduled } = setup();

    capabilities.declare('portals', 'portals.view', 1);
    capabilities.declare('radio', 'portals.view', 1);
    runScheduled();
    // The server answers a request with the modules again: they start nothing new, so nothing is asked.
    capabilities.hold()();
    // Another module still names it.
    capabilities.removeOwner('portals');
    runScheduled();

    assert.deepEqual(sent, [ CORE_SENT, `${CORE_SENT},portals.view@1` ]);

    capabilities.removeOwner('radio');
    runScheduled();

    assert.deepEqual(sent, [ CORE_SENT, `${CORE_SENT},portals.view@1`, CORE_SENT ]);
});

void test('a module cannot name one of the client\'s own capabilities, and nothing is asked of a connection that is gone', () => {
    const { capabilities, sent, runScheduled } = setup();

    assert.equal(capabilities.declare('portals', 'client.modules', 2), false);

    capabilities.stop();
    capabilities.declare('portals', 'portals.view', 1);
    runScheduled();

    assert.deepEqual(sent, [ CORE_SENT ]);
});

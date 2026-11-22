import assert from 'node:assert/strict';
import { test } from 'node:test';

import { createClientModuleRoomPointer } from '../src/commands/client-modules/clientModuleRoomPointer';
import type { ClientModuleRoomPointerEvent } from '../src/context/client-modules/clientModuleModel';

const click: ClientModuleRoomPointerEvent = { type: 'click', x: 10, y: 20, altKey: false, ctrlKey: false, shiftKey: false, tile: { x: -3, y: 4 } };

void test('without listeners the room is told nothing was taken, so it does what it always did', () => {
    const pointer = createClientModuleRoomPointer(() => undefined);

    assert.equal(pointer.has(), false);
    assert.equal(pointer.offer(click), false);
});

void test('the listener added last is asked first and one that takes the event stops it; one that throws is reported and does not take it', () => {
    const errors: string[] = [];
    const asked: string[] = [];
    const pointer = createClientModuleRoomPointer(owner => errors.push(owner));

    pointer.add('first', () => {
        asked.push('first');

        return true;
    });
    pointer.add('second', () => {
        asked.push('second');
    });

    const remove = pointer.add('broken', () => {
        asked.push('broken');

        throw new Error('broken');
    });

    assert.equal(pointer.offer(click), true);
    assert.deepEqual(asked, [ 'broken', 'second', 'first' ]);
    assert.deepEqual(errors, [ 'broken' ]);

    remove();
    asked.length = 0;
    pointer.offer(click);

    assert.deepEqual(asked, [ 'second', 'first' ]);
});

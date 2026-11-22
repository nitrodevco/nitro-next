import assert from 'node:assert/strict';
import { test } from 'node:test';

import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ItemRemoveMessage } from '../src/incoming/Room/Engine/ItemRemoveMessage';
import { ObjectRemoveMessage } from '../src/incoming/Room/Engine/ObjectRemoveMessage';
import { ObjectRemoveMultipleMessage } from '../src/incoming/Room/Engine/ObjectRemoveMultipleMessage';

/** A wrapper over typed values, as the client's `IMessageDataWrapper` reads them. */
const wrapperOf = (values: unknown[]): IMessageDataWrapper => {
    const queue = [ ...values ];

    return ({
        readInt: () => queue.shift(),
        readString: () => queue.shift(),
        readBoolean: () => queue.shift(),
        get bytesAvailable() { return queue.length > 0; },
        get remaining() { return queue.length; },
    }) as unknown as IMessageDataWrapper;
};

void test('the remove messages read the trailing area-hide flag, and default it for an older server', () => {
    assert.equal(new ObjectRemoveMessage().parse(wrapperOf([ '7', false, 3, 0, true ])).byInvisibleFurniManager, true);
    assert.equal(new ObjectRemoveMessage().parse(wrapperOf([ '7', false, 3, 0 ])).byInvisibleFurniManager, false);
    assert.equal(new ItemRemoveMessage().parse(wrapperOf([ '8', 3, true ])).byInvisibleFurniManager, true);
    assert.equal(new ItemRemoveMessage().parse(wrapperOf([ '8', 3 ])).byInvisibleFurniManager, false);

    const several = wrapperOf([ 2, 7, 9, 3, true ]);

    assert.deepEqual(new ObjectRemoveMultipleMessage().parse(several), { objectIds: [ 7, 9 ], pickerId: 3, byInvisibleFurniManager: true });
    assert.equal(several.remaining, 0);
});
